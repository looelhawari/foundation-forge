const express = require("express");
const router = express.Router();
const settingsController = require("../controllers/settingsController");
const { authenticate } = require("../middleware/auth");
const { logActivity } = require("../middleware/activityLogger");

/**
 * @route   GET /api/settings
 * @desc    Get public site settings (no auth required)
 * @access  Public
 */
router.get("/", settingsController.getPublicSettings);

/**
 * @route   PUT /api/admin/settings
 * @desc    Update site settings
 * @access  Private (Admin only)
 */
router.put(
    "/",
    authenticate,
    logActivity("UPDATE_SITE_SETTINGS", "site_settings"),
    settingsController.updateSiteSettings,
);

module.exports = router;
