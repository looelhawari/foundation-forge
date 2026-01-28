const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { authenticate } = require("../middleware/auth");
const { authLimiter } = require("../middleware/rateLimiter");
const { authValidation } = require("../utils/validators");
const { logActivity } = require("../middleware/activityLogger");

/**
 * @route   POST /api/auth/login
 * @desc    Admin login
 * @access  Public
 */
router.post("/login", authLimiter, authValidation.login, authController.login);

/**
 * @route   GET /api/auth/me
 * @desc    Get current admin profile
 * @access  Private
 */
router.get("/me", authenticate, authController.getProfile);

/**
 * @route   PUT /api/auth/profile
 * @desc    Update admin profile
 * @access  Private
 */
router.put(
  "/profile",
  authenticate,
  logActivity("UPDATE_PROFILE", "admin"),
  authController.updateProfile,
);

/**
 * @route   PUT /api/auth/password
 * @desc    Change admin password
 * @access  Private
 */
router.put(
  "/password",
  authenticate,
  authValidation.changePassword,
  logActivity("CHANGE_PASSWORD", "admin"),
  authController.changePassword,
);

/**
 * @route   POST /api/auth/logout
 * @desc    Logout (logs the action)
 * @access  Private
 */
router.post("/logout", authenticate, authController.logout);

/**
 * @route   GET /api/auth/verify
 * @desc    Verify token validity
 * @access  Private
 */
router.get("/verify", authenticate, authController.verifyToken);

module.exports = router;
