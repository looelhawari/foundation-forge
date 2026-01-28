const express = require("express");
const router = express.Router();
const contactController = require("../controllers/contactController");
const { authenticate } = require("../middleware/auth");
const { contactLimiter } = require("../middleware/rateLimiter");
const { contactValidation } = require("../utils/validators");
const { logActivity } = require("../middleware/activityLogger");

/**
 * @route   POST /api/contact
 * @desc    Submit contact form
 * @access  Public
 */
router.post(
  "/",
  contactLimiter,
  contactValidation.submit,
  contactController.submitContact,
);

/**
 * @route   GET /api/contact/stats
 * @desc    Get submission statistics
 * @access  Private (Admin only)
 */
router.get("/stats", authenticate, contactController.getSubmissionStats);

/**
 * @route   GET /api/contact
 * @desc    Get all contact submissions
 * @access  Private (Admin only)
 */
router.get("/", authenticate, contactController.getAllSubmissions);

/**
 * @route   GET /api/contact/:id
 * @desc    Get single contact submission
 * @access  Private (Admin only)
 */
router.get("/:id", authenticate, contactController.getSubmission);

/**
 * @route   PATCH /api/contact/:id/status
 * @desc    Update submission status
 * @access  Private (Admin only)
 */
router.patch(
  "/:id/status",
  authenticate,
  contactValidation.updateStatus,
  logActivity("UPDATE_CONTACT_STATUS", "contact"),
  contactController.updateSubmissionStatus,
);

/**
 * @route   DELETE /api/contact/:id
 * @desc    Delete contact submission
 * @access  Private (Admin only)
 */
router.delete(
  "/:id",
  authenticate,
  logActivity("DELETE_CONTACT", "contact"),
  contactController.deleteSubmission,
);

module.exports = router;
