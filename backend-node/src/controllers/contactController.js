const { pool } = require("../config/database");
const {
  asyncHandler,
  ApiError,
  successResponse,
  paginate,
} = require("../utils/helpers");
const logger = require("../utils/logger");

/**
 * Submit contact form
 * POST /api/contact
 */
const submitContact = asyncHandler(async (req, res) => {
  const { name, email, phone, company, subject, message } = req.body;

  const [result] = await pool.execute(
    `INSERT INTO contact_submissions (name, email, phone, company, subject, message) 
     VALUES (?, ?, ?, ?, ?, ?)`,
    [name, email, phone || null, company || null, subject || null, message],
  );

  logger.info(`New contact submission from: ${email}`);

  res.status(201).json(
    successResponse(
      {
        id: result.insertId,
      },
      "Thank you for your message. We will get back to you soon.",
    ),
  );
});

/**
 * Get all contact submissions (Admin only)
 * GET /api/contact
 */
const getAllSubmissions = asyncHandler(async (req, res) => {
  const { page = 1, limit = 20, status, search } = req.query;

  // Build WHERE clause
  let whereConditions = [];
  let whereValues = [];

  if (status && status !== "all") {
    whereConditions.push("status = ?");
    whereValues.push(status);
  }

  if (search) {
    whereConditions.push(
      "(name LIKE ? OR email LIKE ? OR subject LIKE ? OR message LIKE ?)",
    );
    const searchTerm = `%${search}%`;
    whereValues.push(searchTerm, searchTerm, searchTerm, searchTerm);
  }

  const whereClause =
    whereConditions.length > 0 ? `WHERE ${whereConditions.join(" AND ")}` : "";

  // Get total count
  const [countResult] = await pool.execute(
    `SELECT COUNT(*) as total FROM contact_submissions ${whereClause}`,
    whereValues,
  );
  const total = countResult[0].total;

  // Calculate pagination
  const pagination = paginate(page, limit, total);

  // Get submissions
  const [submissions] = await pool.execute(
    `SELECT * FROM contact_submissions 
     ${whereClause}
     ORDER BY created_at DESC
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
        submissions,
        pagination,
      },
      "Submissions retrieved successfully",
    ),
  );
});

/**
 * Get single contact submission (Admin only)
 * GET /api/contact/:id
 */
const getSubmission = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const [submissions] = await pool.execute(
    "SELECT * FROM contact_submissions WHERE id = ?",
    [id],
  );

  if (submissions.length === 0) {
    throw new ApiError(404, "Submission not found");
  }

  // Mark as read if it's new
  if (submissions[0].status === "new") {
    await pool.execute(
      "UPDATE contact_submissions SET status = ? WHERE id = ?",
      ["read", id],
    );
    submissions[0].status = "read";
  }

  res.json(
    successResponse(submissions[0], "Submission retrieved successfully"),
  );
});

/**
 * Update contact submission status (Admin only)
 * PATCH /api/contact/:id/status
 */
const updateSubmissionStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  // Check if submission exists
  const [existing] = await pool.execute(
    "SELECT id FROM contact_submissions WHERE id = ?",
    [id],
  );

  if (existing.length === 0) {
    throw new ApiError(404, "Submission not found");
  }

  await pool.execute("UPDATE contact_submissions SET status = ? WHERE id = ?", [
    status,
    id,
  ]);

  const [updated] = await pool.execute(
    "SELECT * FROM contact_submissions WHERE id = ?",
    [id],
  );

  logger.info(
    `Contact submission ${id} status updated to ${status} by admin ${req.admin.id}`,
  );

  res.json(successResponse(updated[0], "Status updated successfully"));
});

/**
 * Delete contact submission (Admin only)
 * DELETE /api/contact/:id
 */
const deleteSubmission = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // Check if submission exists
  const [existing] = await pool.execute(
    "SELECT id FROM contact_submissions WHERE id = ?",
    [id],
  );

  if (existing.length === 0) {
    throw new ApiError(404, "Submission not found");
  }

  await pool.execute("DELETE FROM contact_submissions WHERE id = ?", [id]);

  logger.info(`Contact submission ${id} deleted by admin ${req.admin.id}`);

  res.json(successResponse(null, "Submission deleted successfully"));
});

/**
 * Get submission statistics (Admin only)
 * GET /api/contact/stats
 */
const getSubmissionStats = asyncHandler(async (req, res) => {
  // Get counts by status
  const [statusStats] = await pool.execute(
    `SELECT status, COUNT(*) as count 
     FROM contact_submissions 
     GROUP BY status`,
  );

  // Get total count
  const [totalCount] = await pool.execute(
    "SELECT COUNT(*) as total FROM contact_submissions",
  );

  // Get new submissions count (last 24 hours)
  const [recentCount] = await pool.execute(
    `SELECT COUNT(*) as count 
     FROM contact_submissions 
     WHERE created_at >= DATE_SUB(NOW(), INTERVAL 24 HOUR)`,
  );

  res.json(
    successResponse(
      {
        total: totalCount[0].total,
        recent24h: recentCount[0].count,
        byStatus: statusStats,
      },
      "Submission statistics retrieved successfully",
    ),
  );
});

module.exports = {
  submitContact,
  getAllSubmissions,
  getSubmission,
  updateSubmissionStatus,
  deleteSubmission,
  getSubmissionStats,
};
