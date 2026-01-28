const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { pool } = require("../config/database");
const config = require("../config");
const { asyncHandler, ApiError, successResponse } = require("../utils/helpers");
const logger = require("../utils/logger");

/**
 * Admin login
 * POST /api/auth/login
 */
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Find admin by email
  const [admins] = await pool.execute(
    "SELECT id, email, password, name, is_active FROM admins WHERE email = ?",
    [email],
  );

  if (admins.length === 0) {
    throw new ApiError(401, "Invalid email or password");
  }

  const admin = admins[0];

  // Check if admin is active
  if (!admin.is_active) {
    throw new ApiError(401, "Account has been deactivated");
  }

  // Verify password
  const isPasswordValid = await bcrypt.compare(password, admin.password);
  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid email or password");
  }

  // Generate JWT token
  const token = jwt.sign(
    { id: admin.id, email: admin.email },
    config.jwt.secret,
    { expiresIn: config.jwt.expiresIn },
  );

  // Update last login
  await pool.execute("UPDATE admins SET last_login = NOW() WHERE id = ?", [
    admin.id,
  ]);

  // Log successful login
  await pool.execute(
    `INSERT INTO activity_logs (admin_id, action, ip_address, user_agent) VALUES (?, ?, ?, ?)`,
    [admin.id, "LOGIN", req.ip, req.headers["user-agent"]],
  );

  logger.info(`Admin ${admin.email} logged in successfully`);

  res.json(
    successResponse(
      {
        token,
        admin: {
          id: admin.id,
          email: admin.email,
          name: admin.name,
        },
      },
      "Login successful",
    ),
  );
});

/**
 * Get current admin profile
 * GET /api/auth/me
 */
const getProfile = asyncHandler(async (req, res) => {
  const [admins] = await pool.execute(
    "SELECT id, email, name, created_at, last_login FROM admins WHERE id = ?",
    [req.admin.id],
  );

  if (admins.length === 0) {
    throw new ApiError(404, "Admin not found");
  }

  res.json(successResponse(admins[0], "Profile retrieved successfully"));
});

/**
 * Update admin profile
 * PUT /api/auth/profile
 */
const updateProfile = asyncHandler(async (req, res) => {
  const { name, email } = req.body;
  const adminId = req.admin.id;

  // Check if email is already taken by another admin
  if (email && email !== req.admin.email) {
    const [existing] = await pool.execute(
      "SELECT id FROM admins WHERE email = ? AND id != ?",
      [email, adminId],
    );
    if (existing.length > 0) {
      throw new ApiError(409, "Email is already in use");
    }
  }

  // Build update query dynamically
  const updates = [];
  const values = [];

  if (name) {
    updates.push("name = ?");
    values.push(name);
  }
  if (email) {
    updates.push("email = ?");
    values.push(email);
  }

  if (updates.length === 0) {
    throw new ApiError(400, "No fields to update");
  }

  values.push(adminId);

  await pool.execute(
    `UPDATE admins SET ${updates.join(", ")} WHERE id = ?`,
    values,
  );

  // Fetch updated profile
  const [admins] = await pool.execute(
    "SELECT id, email, name, created_at, last_login FROM admins WHERE id = ?",
    [adminId],
  );

  logger.info(`Admin ${adminId} updated profile`);

  res.json(successResponse(admins[0], "Profile updated successfully"));
});

/**
 * Change admin password
 * PUT /api/auth/password
 */
const changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const adminId = req.admin.id;

  // Get current password hash
  const [admins] = await pool.execute(
    "SELECT password FROM admins WHERE id = ?",
    [adminId],
  );

  if (admins.length === 0) {
    throw new ApiError(404, "Admin not found");
  }

  // Verify current password
  const isPasswordValid = await bcrypt.compare(
    currentPassword,
    admins[0].password,
  );
  if (!isPasswordValid) {
    throw new ApiError(401, "Current password is incorrect");
  }

  // Hash new password
  const hashedPassword = await bcrypt.hash(newPassword, 12);

  // Update password
  await pool.execute("UPDATE admins SET password = ? WHERE id = ?", [
    hashedPassword,
    adminId,
  ]);

  logger.info(`Admin ${adminId} changed password`);

  res.json(successResponse(null, "Password changed successfully"));
});

/**
 * Logout (client-side handled, but we log it)
 * POST /api/auth/logout
 */
const logout = asyncHandler(async (req, res) => {
  // Log logout action
  await pool.execute(
    `INSERT INTO activity_logs (admin_id, action, ip_address, user_agent) VALUES (?, ?, ?, ?)`,
    [req.admin.id, "LOGOUT", req.ip, req.headers["user-agent"]],
  );

  logger.info(`Admin ${req.admin.email} logged out`);

  res.json(successResponse(null, "Logged out successfully"));
});

/**
 * Verify token validity
 * GET /api/auth/verify
 */
const verifyToken = asyncHandler(async (req, res) => {
  // If middleware passed, token is valid
  res.json(
    successResponse(
      {
        valid: true,
        admin: req.admin,
      },
      "Token is valid",
    ),
  );
});

module.exports = {
  login,
  getProfile,
  updateProfile,
  changePassword,
  logout,
  verifyToken,
};
