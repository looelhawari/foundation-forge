const express = require("express");
const router = express.Router();
const dashboardController = require("../controllers/dashboardController");
const { authenticate } = require("../middleware/auth");
const { logActivity } = require("../middleware/activityLogger");

/**
 * @route   GET /api/dashboard/stats
 * @desc    Get dashboard statistics
 * @access  Private (Admin only)
 */
router.get("/stats", authenticate, dashboardController.getDashboardStats);

/**
 * @route   GET /api/dashboard/activity
 * @desc    Get activity logs
 * @access  Private (Admin only)
 */
router.get("/activity", authenticate, dashboardController.getActivityLogs);

/**
 * @route   GET /api/dashboard/settings
 * @desc    Get settings
 * @access  Private (Admin only)
 */
router.get("/settings", authenticate, dashboardController.getSettings);

/**
 * @route   PUT /api/dashboard/settings
 * @desc    Update settings
 * @access  Private (Admin only)
 */
router.put(
  "/settings",
  authenticate,
  logActivity("UPDATE_SETTINGS", "settings"),
  dashboardController.updateSettings,
);

module.exports = router;
