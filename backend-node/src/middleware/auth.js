const jwt = require("jsonwebtoken");
const config = require("../config");
const { pool } = require("../config/database");
const { ApiError } = require("../utils/helpers");
const logger = require("../utils/logger");

/**
 * Authentication middleware
 * Verifies JWT token and attaches admin to request
 */
const authenticate = async (req, res, next) => {
  try {
    // Get token from header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new ApiError(401, "Access denied. No token provided.");
    }

    const token = authHeader.split(" ")[1];

    // Verify token
    let decoded;
    try {
      decoded = jwt.verify(token, config.jwt.secret);
    } catch (err) {
      if (err.name === "TokenExpiredError") {
        throw new ApiError(401, "Token has expired. Please login again.");
      }
      throw new ApiError(401, "Invalid token.");
    }

    // Check if admin exists and is active
    const [admins] = await pool.execute(
      "SELECT id, email, name, is_active FROM admins WHERE id = ?",
      [decoded.id],
    );

    if (admins.length === 0) {
      throw new ApiError(401, "Admin not found.");
    }

    const admin = admins[0];

    if (!admin.is_active) {
      throw new ApiError(401, "Account has been deactivated.");
    }

    // Attach admin to request
    req.admin = {
      id: admin.id,
      email: admin.email,
      name: admin.name,
    };

    next();
  } catch (error) {
    next(error);
  }
};

/**
 * Optional authentication middleware
 * Attaches admin to request if valid token provided, but doesn't require it
 */
const optionalAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return next();
    }

    const token = authHeader.split(" ")[1];

    try {
      const decoded = jwt.verify(token, config.jwt.secret);
      const [admins] = await pool.execute(
        "SELECT id, email, name, is_active FROM admins WHERE id = ? AND is_active = TRUE",
        [decoded.id],
      );

      if (admins.length > 0) {
        req.admin = {
          id: admins[0].id,
          email: admins[0].email,
          name: admins[0].name,
        };
      }
    } catch (err) {
      // Token invalid or expired, continue without auth
      logger.debug("Optional auth: Invalid or expired token");
    }

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { authenticate, optionalAuth };
