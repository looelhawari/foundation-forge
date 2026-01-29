const { pool } = require("../config/database");
const {
  asyncHandler,
  ApiError,
  successResponse,
  paginate,
} = require("../utils/helpers");
const logger = require("../utils/logger");

// Testimonial expiry time in hours (72 hours = 3 days)
const PENDING_EXPIRY_HOURS = 72;

/**
 * Get approved testimonials (Public)
 * GET /api/testimonials
 */
const getApprovedTestimonials = asyncHandler(async (req, res) => {
  const { featured, limit } = req.query;

  let query = `SELECT id, client_name, company_name, company_logo, position, content, rating, is_featured, submitted_at 
               FROM testimonials 
               WHERE status = 'approved'`;
  const values = [];

  if (featured === "true") {
    query += " AND is_featured = true";
  }

  query += " ORDER BY is_featured DESC, submitted_at DESC";

  if (limit) {
    query += " LIMIT ?";
    values.push(limit.toString());
  }

  const [testimonials] = await pool.execute(query, values);

  res.json(
    successResponse(testimonials, "Testimonials retrieved successfully"),
  );
});

/**
 * Submit a testimonial (Public - no auth required)
 * POST /api/testimonials
 */
const submitTestimonial = asyncHandler(async (req, res) => {
  const {
    client_name,
    company_name,
    company_logo,
    position,
    content,
    rating,
    email,
    phone,
  } = req.body;

  // Calculate expiry time (72 hours from now)
  const expiresAt = new Date();
  expiresAt.setHours(expiresAt.getHours() + PENDING_EXPIRY_HOURS);

  const [result] = await pool.execute(
    `INSERT INTO testimonials (client_name, company_name, company_logo, position, content, rating, email, phone, status, expires_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'pending', ?)`,
    [
      client_name,
      company_name || null,
      company_logo || null,
      position || null,
      content,
      rating || 5,
      email || null,
      phone || null,
      expiresAt,
    ],
  );

  logger.info(
    `New testimonial submitted by: ${client_name} (${email || "no email"})`,
  );

  res
    .status(201)
    .json(
      successResponse(
        { id: result.insertId },
        "Thank you for your testimonial! It will be reviewed and published within 72 hours if approved.",
      ),
    );
});

/**
 * Get all testimonials with filters (Admin only)
 * GET /api/testimonials/admin
 */
const getAllTestimonials = asyncHandler(async (req, res) => {
  const { page = 1, limit = 20, status } = req.query;

  let whereConditions = [];
  let whereValues = [];

  if (status && status !== "all") {
    whereConditions.push("status = ?");
    whereValues.push(status);
  }

  const whereClause =
    whereConditions.length > 0 ? `WHERE ${whereConditions.join(" AND ")}` : "";

  // Get total count
  const [countResult] = await pool.execute(
    `SELECT COUNT(*) as total FROM testimonials ${whereClause}`,
    whereValues,
  );
  const total = countResult[0].total;

  // Calculate pagination
  const pagination = paginate(page, limit, total);

  // Get testimonials
  const [testimonials] = await pool.execute(
    `SELECT t.*, a.name as reviewer_name
     FROM testimonials t
     LEFT JOIN admins a ON t.reviewed_by = a.id
     ${whereClause}
     ORDER BY 
       CASE WHEN t.status = 'pending' THEN 0 ELSE 1 END,
       t.submitted_at DESC
     LIMIT ? OFFSET ?`,
    [
      ...whereValues,
      pagination.itemsPerPage.toString(),
      pagination.offset.toString(),
    ],
  );

  res.json(
    successResponse(
      { testimonials, pagination },
      "Testimonials retrieved successfully",
    ),
  );
});

/**
 * Get single testimonial (Admin only)
 * GET /api/testimonials/admin/:id
 */
const getTestimonialById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const [testimonials] = await pool.execute(
    `SELECT t.*, a.name as reviewer_name
     FROM testimonials t
     LEFT JOIN admins a ON t.reviewed_by = a.id
     WHERE t.id = ?`,
    [id],
  );

  if (testimonials.length === 0) {
    throw new ApiError(404, "Testimonial not found");
  }

  res.json(
    successResponse(testimonials[0], "Testimonial retrieved successfully"),
  );
});

/**
 * Approve testimonial (Admin only)
 * PATCH /api/testimonials/:id/approve
 */
const approveTestimonial = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { is_featured } = req.body;

  const [existing] = await pool.execute(
    "SELECT id, client_name FROM testimonials WHERE id = ?",
    [id],
  );

  if (existing.length === 0) {
    throw new ApiError(404, "Testimonial not found");
  }

  await pool.execute(
    `UPDATE testimonials SET 
      status = 'approved', 
      reviewed_at = NOW(), 
      reviewed_by = ?,
      is_featured = COALESCE(?, is_featured),
      expires_at = NULL
     WHERE id = ?`,
    [req.admin.id, is_featured !== undefined ? is_featured : null, id],
  );

  const [updated] = await pool.execute(
    "SELECT * FROM testimonials WHERE id = ?",
    [id],
  );

  logger.info(`Testimonial ${id} approved by admin ${req.admin.id}`);

  res.json(successResponse(updated[0], "Testimonial approved successfully"));
});

/**
 * Decline testimonial (Admin only)
 * PATCH /api/testimonials/:id/decline
 */
const declineTestimonial = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const [existing] = await pool.execute(
    "SELECT id, client_name FROM testimonials WHERE id = ?",
    [id],
  );

  if (existing.length === 0) {
    throw new ApiError(404, "Testimonial not found");
  }

  // Delete declined testimonials immediately
  await pool.execute("DELETE FROM testimonials WHERE id = ?", [id]);

  logger.info(
    `Testimonial ${id} declined and deleted by admin ${req.admin.id}`,
  );

  res.json(successResponse(null, "Testimonial declined and removed"));
});

/**
 * Update testimonial (Admin only)
 * PUT /api/testimonials/:id
 */
const updateTestimonial = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { is_featured, status } = req.body;

  const [existing] = await pool.execute(
    "SELECT id FROM testimonials WHERE id = ?",
    [id],
  );

  if (existing.length === 0) {
    throw new ApiError(404, "Testimonial not found");
  }

  let updateFields = [];
  let updateValues = [];

  if (is_featured !== undefined) {
    updateFields.push("is_featured = ?");
    updateValues.push(is_featured);
  }

  if (status) {
    updateFields.push("status = ?");
    updateValues.push(status);

    if (status === "approved") {
      updateFields.push("reviewed_at = NOW()");
      updateFields.push("reviewed_by = ?");
      updateValues.push(req.admin.id);
      updateFields.push("expires_at = NULL");
    }
  }

  if (updateFields.length === 0) {
    throw new ApiError(400, "No fields to update");
  }

  updateValues.push(id);

  await pool.execute(
    `UPDATE testimonials SET ${updateFields.join(", ")} WHERE id = ?`,
    updateValues,
  );

  const [updated] = await pool.execute(
    "SELECT * FROM testimonials WHERE id = ?",
    [id],
  );

  logger.info(`Testimonial ${id} updated by admin ${req.admin.id}`);

  res.json(successResponse(updated[0], "Testimonial updated successfully"));
});

/**
 * Delete testimonial (Admin only)
 * DELETE /api/testimonials/:id
 */
const deleteTestimonial = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const [existing] = await pool.execute(
    "SELECT id FROM testimonials WHERE id = ?",
    [id],
  );

  if (existing.length === 0) {
    throw new ApiError(404, "Testimonial not found");
  }

  await pool.execute("DELETE FROM testimonials WHERE id = ?", [id]);

  logger.info(`Testimonial ${id} deleted by admin ${req.admin.id}`);

  res.json(successResponse(null, "Testimonial deleted successfully"));
});

/**
 * Get testimonial statistics (Admin only)
 * GET /api/testimonials/stats
 */
const getTestimonialStats = asyncHandler(async (req, res) => {
  const [totalCount] = await pool.execute(
    "SELECT COUNT(*) as total FROM testimonials",
  );

  const [byStatus] = await pool.execute(
    `SELECT status, COUNT(*) as count FROM testimonials GROUP BY status`,
  );

  const [pendingExpiringSoon] = await pool.execute(
    `SELECT COUNT(*) as count FROM testimonials 
     WHERE status = 'pending' AND expires_at <= DATE_ADD(NOW(), INTERVAL 24 HOUR)`,
  );

  const [featuredCount] = await pool.execute(
    `SELECT COUNT(*) as count FROM testimonials WHERE is_featured = true AND status = 'approved'`,
  );

  res.json(
    successResponse(
      {
        total: totalCount[0].total,
        byStatus,
        pendingExpiringSoon: pendingExpiringSoon[0].count,
        featured: featuredCount[0].count,
      },
      "Testimonial statistics retrieved successfully",
    ),
  );
});

/**
 * Cleanup expired pending testimonials
 * This should be called periodically (e.g., via cron job or on app start)
 */
const cleanupExpiredTestimonials = async () => {
  try {
    const [result] = await pool.execute(
      `DELETE FROM testimonials WHERE status = 'pending' AND expires_at < NOW()`,
    );

    if (result.affectedRows > 0) {
      logger.info(
        `Cleaned up ${result.affectedRows} expired pending testimonials`,
      );
    }

    return result.affectedRows;
  } catch (error) {
    logger.error(`Failed to cleanup expired testimonials: ${error.message}`);
    return 0;
  }
};

module.exports = {
  getApprovedTestimonials,
  submitTestimonial,
  getAllTestimonials,
  getTestimonialById,
  approveTestimonial,
  declineTestimonial,
  updateTestimonial,
  deleteTestimonial,
  getTestimonialStats,
  cleanupExpiredTestimonials,
};
