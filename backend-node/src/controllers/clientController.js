const { pool } = require("../config/database");
const {
  asyncHandler,
  ApiError,
  successResponse,
  paginate,
} = require("../utils/helpers");
const logger = require("../utils/logger");

/**
 * Get all clients (Public)
 * GET /api/clients
 */
const getAllClients = asyncHandler(async (req, res) => {
  const { category, featured, active = "true" } = req.query;

  let whereConditions = [];
  let whereValues = [];

  if (active === "true") {
    whereConditions.push("is_active = true");
  }

  if (category && category !== "all") {
    whereConditions.push("category = ?");
    whereValues.push(category);
  }

  if (featured === "true") {
    whereConditions.push("is_featured = true");
  }

  const whereClause =
    whereConditions.length > 0 ? `WHERE ${whereConditions.join(" AND ")}` : "";

  const [clients] = await pool.execute(
    `SELECT * FROM clients ${whereClause} ORDER BY display_order ASC, name ASC`,
    whereValues,
  );

  res.json(successResponse(clients, "Clients retrieved successfully"));
});

/**
 * Get single client (Public)
 * GET /api/clients/:id
 */
const getClientById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const [clients] = await pool.execute("SELECT * FROM clients WHERE id = ?", [
    id,
  ]);

  if (clients.length === 0) {
    throw new ApiError(404, "Client not found");
  }

  res.json(successResponse(clients[0], "Client retrieved successfully"));
});

/**
 * Create client (Admin only)
 * POST /api/clients
 */
const createClient = asyncHandler(async (req, res) => {
  const {
    name,
    logo,
    category,
    description,
    projects_count,
    total_value,
    website,
    is_featured,
    display_order,
  } = req.body;

  const [result] = await pool.execute(
    `INSERT INTO clients (name, logo, category, description, projects_count, total_value, website, is_featured, display_order)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      name,
      logo || null,
      category || "other",
      description || null,
      projects_count || 0,
      total_value || null,
      website || null,
      is_featured || false,
      display_order || 0,
    ],
  );

  const [newClient] = await pool.execute("SELECT * FROM clients WHERE id = ?", [
    result.insertId,
  ]);

  logger.info(`Client created: ${name} by admin ${req.admin.id}`);

  res
    .status(201)
    .json(successResponse(newClient[0], "Client created successfully"));
});

/**
 * Update client (Admin only)
 * PUT /api/clients/:id
 */
const updateClient = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const {
    name,
    logo,
    category,
    description,
    projects_count,
    total_value,
    website,
    is_featured,
    display_order,
    is_active,
  } = req.body;

  // Check if client exists
  const [existing] = await pool.execute("SELECT id FROM clients WHERE id = ?", [
    id,
  ]);

  if (existing.length === 0) {
    throw new ApiError(404, "Client not found");
  }

  await pool.execute(
    `UPDATE clients SET 
      name = COALESCE(?, name),
      logo = COALESCE(?, logo),
      category = COALESCE(?, category),
      description = COALESCE(?, description),
      projects_count = COALESCE(?, projects_count),
      total_value = COALESCE(?, total_value),
      website = COALESCE(?, website),
      is_featured = COALESCE(?, is_featured),
      display_order = COALESCE(?, display_order),
      is_active = COALESCE(?, is_active)
    WHERE id = ?`,
    [
      name,
      logo,
      category,
      description,
      projects_count,
      total_value,
      website,
      is_featured,
      display_order,
      is_active,
      id,
    ],
  );

  const [updated] = await pool.execute("SELECT * FROM clients WHERE id = ?", [
    id,
  ]);

  logger.info(`Client ${id} updated by admin ${req.admin.id}`);

  res.json(successResponse(updated[0], "Client updated successfully"));
});

/**
 * Delete client (Admin only)
 * DELETE /api/clients/:id
 */
const deleteClient = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const [existing] = await pool.execute(
    "SELECT id, name FROM clients WHERE id = ?",
    [id],
  );

  if (existing.length === 0) {
    throw new ApiError(404, "Client not found");
  }

  await pool.execute("DELETE FROM clients WHERE id = ?", [id]);

  logger.info(`Client ${existing[0].name} deleted by admin ${req.admin.id}`);

  res.json(successResponse(null, "Client deleted successfully"));
});

/**
 * Get client statistics (Admin only)
 * GET /api/clients/stats
 */
const getClientStats = asyncHandler(async (req, res) => {
  const [totalCount] = await pool.execute(
    "SELECT COUNT(*) as total FROM clients",
  );

  const [activeCount] = await pool.execute(
    "SELECT COUNT(*) as count FROM clients WHERE is_active = true",
  );

  const [featuredCount] = await pool.execute(
    "SELECT COUNT(*) as count FROM clients WHERE is_featured = true",
  );

  const [byCategory] = await pool.execute(
    `SELECT category, COUNT(*) as count FROM clients GROUP BY category`,
  );

  res.json(
    successResponse(
      {
        total: totalCount[0].total,
        active: activeCount[0].count,
        featured: featuredCount[0].count,
        byCategory,
      },
      "Client statistics retrieved successfully",
    ),
  );
});

module.exports = {
  getAllClients,
  getClientById,
  createClient,
  updateClient,
  deleteClient,
  getClientStats,
};
