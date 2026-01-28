const { pool } = require("../config/database");
const { asyncHandler, successResponse, paginate } = require("../utils/helpers");

/**
 * Get dashboard statistics
 * GET /api/dashboard/stats
 */
const getDashboardStats = asyncHandler(async (req, res) => {
  // Projects count
  const [projectsCount] = await pool.execute(
    `SELECT COUNT(*) as total FROM projects WHERE status != 'archived'`,
  );

  // Projects by category
  const [projectsByCategory] = await pool.execute(
    `SELECT category, COUNT(*) as count 
     FROM projects 
     WHERE status != 'archived'
     GROUP BY category`,
  );

  // Contact submissions - new
  const [newSubmissions] = await pool.execute(
    `SELECT COUNT(*) as count FROM contact_submissions WHERE status = 'new'`,
  );

  // Contact submissions - last 7 days
  const [recentSubmissions] = await pool.execute(
    `SELECT COUNT(*) as count 
     FROM contact_submissions 
     WHERE created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)`,
  );

  // Recent activity logs
  const [recentActivity] = await pool.execute(
    `SELECT al.*, a.name as admin_name 
     FROM activity_logs al
     LEFT JOIN admins a ON al.admin_id = a.id
     ORDER BY al.created_at DESC
     LIMIT 10`,
  );

  // Settings
  const [settings] = await pool.execute(
    "SELECT setting_key, setting_value, setting_type FROM settings",
  );

  // Convert settings to object
  const settingsObj = {};
  settings.forEach((s) => {
    let value = s.setting_value;
    if (s.setting_type === "number") value = parseInt(value, 10);
    else if (s.setting_type === "boolean") value = value === "true";
    else if (s.setting_type === "json") value = JSON.parse(value);
    settingsObj[s.setting_key] = value;
  });

  res.json(
    successResponse(
      {
        projects: {
          total: projectsCount[0].total,
          byCategory: projectsByCategory,
        },
        contacts: {
          new: newSubmissions[0].count,
          recent7days: recentSubmissions[0].count,
        },
        recentActivity: recentActivity.map((a) => ({
          ...a,
          details: a.details ? JSON.parse(a.details) : null,
        })),
        settings: settingsObj,
      },
      "Dashboard statistics retrieved successfully",
    ),
  );
});

/**
 * Get activity logs
 * GET /api/dashboard/activity
 */
const getActivityLogs = asyncHandler(async (req, res) => {
  const { page = 1, limit = 20, action, adminId } = req.query;

  // Build WHERE clause
  let whereConditions = [];
  let whereValues = [];

  if (action) {
    whereConditions.push("al.action = ?");
    whereValues.push(action);
  }

  if (adminId) {
    whereConditions.push("al.admin_id = ?");
    whereValues.push(adminId);
  }

  const whereClause =
    whereConditions.length > 0 ? `WHERE ${whereConditions.join(" AND ")}` : "";

  // Get total count
  const [countResult] = await pool.execute(
    `SELECT COUNT(*) as total FROM activity_logs al ${whereClause}`,
    whereValues,
  );
  const total = countResult[0].total;

  // Calculate pagination
  const pagination = paginate(page, limit, total);

  // Get logs
  const [logs] = await pool.execute(
    `SELECT al.*, a.name as admin_name, a.email as admin_email
     FROM activity_logs al
     LEFT JOIN admins a ON al.admin_id = a.id
     ${whereClause}
     ORDER BY al.created_at DESC
     LIMIT ? OFFSET ?`,
    [
      ...whereValues,
      pagination.itemsPerPage.toString(),
      pagination.offset.toString(),
    ],
  );

  res.json(
    successResponse(
      {
        logs: logs.map((l) => ({
          ...l,
          details: l.details ? JSON.parse(l.details) : null,
        })),
        pagination,
      },
      "Activity logs retrieved successfully",
    ),
  );
});

/**
 * Get/Update settings
 * GET /api/dashboard/settings
 */
const getSettings = asyncHandler(async (req, res) => {
  const [settings] = await pool.execute(
    "SELECT * FROM settings ORDER BY setting_key",
  );

  const settingsObj = {};
  settings.forEach((s) => {
    let value = s.setting_value;
    if (s.setting_type === "number") value = parseInt(value, 10);
    else if (s.setting_type === "boolean") value = value === "true";
    else if (s.setting_type === "json") value = JSON.parse(value);
    settingsObj[s.setting_key] = value;
  });

  res.json(successResponse(settingsObj, "Settings retrieved successfully"));
});

/**
 * Update settings
 * PUT /api/dashboard/settings
 */
const updateSettings = asyncHandler(async (req, res) => {
  const settings = req.body;

  for (const [key, value] of Object.entries(settings)) {
    const stringValue =
      typeof value === "object" ? JSON.stringify(value) : String(value);

    await pool.execute(
      `INSERT INTO settings (setting_key, setting_value) 
       VALUES (?, ?) 
       ON DUPLICATE KEY UPDATE setting_value = ?`,
      [key, stringValue, stringValue],
    );
  }

  // Fetch updated settings
  const [updatedSettings] = await pool.execute(
    "SELECT * FROM settings ORDER BY setting_key",
  );

  const settingsObj = {};
  updatedSettings.forEach((s) => {
    let value = s.setting_value;
    if (s.setting_type === "number") value = parseInt(value, 10);
    else if (s.setting_type === "boolean") value = value === "true";
    else if (s.setting_type === "json") value = JSON.parse(value);
    settingsObj[s.setting_key] = value;
  });

  res.json(successResponse(settingsObj, "Settings updated successfully"));
});

module.exports = {
  getDashboardStats,
  getActivityLogs,
  getSettings,
  updateSettings,
};
