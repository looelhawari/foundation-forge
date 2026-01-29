const express = require("express");
const router = express.Router();
const testimonialController = require("../controllers/testimonialController");
const { authenticate } = require("../middleware/auth");
const { logActivity } = require("../middleware/activityLogger");
const { body } = require("express-validator");
const { handleValidation } = require("../utils/validators");
const rateLimit = require("express-rate-limit");

// Rate limiter for testimonial submissions (prevent spam)
const testimonialLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 3, // Max 3 submissions per hour per IP
  message: {
    success: false,
    message: "Too many testimonial submissions. Please try again later.",
  },
});

// Validation rules
const testimonialValidation = {
  submit: [
    body("client_name")
      .trim()
      .notEmpty()
      .withMessage("Your name is required")
      .isLength({ max: 255 })
      .withMessage("Name must be less than 255 characters"),
    body("company_name")
      .optional()
      .trim()
      .isLength({ max: 255 })
      .withMessage("Company name must be less than 255 characters"),
    body("position")
      .optional()
      .trim()
      .isLength({ max: 255 })
      .withMessage("Position must be less than 255 characters"),
    body("content")
      .trim()
      .notEmpty()
      .withMessage("Testimonial content is required")
      .isLength({ min: 20, max: 2000 })
      .withMessage("Testimonial must be between 20 and 2000 characters"),
    body("rating")
      .optional()
      .isInt({ min: 1, max: 5 })
      .withMessage("Rating must be between 1 and 5"),
    body("email")
      .optional()
      .isEmail()
      .withMessage("Please provide a valid email address"),
    body("phone")
      .optional()
      .trim()
      .isLength({ max: 50 })
      .withMessage("Phone number must be less than 50 characters"),
    handleValidation,
  ],
};

/**
 * @route   GET /api/testimonials/stats
 * @desc    Get testimonial statistics
 * @access  Private (Admin only)
 */
router.get("/stats", authenticate, testimonialController.getTestimonialStats);

/**
 * @route   GET /api/testimonials/admin
 * @desc    Get all testimonials with filters (Admin)
 * @access  Private (Admin only)
 */
router.get("/admin", authenticate, testimonialController.getAllTestimonials);

/**
 * @route   GET /api/testimonials/admin/:id
 * @desc    Get single testimonial (Admin)
 * @access  Private (Admin only)
 */
router.get(
  "/admin/:id",
  authenticate,
  testimonialController.getTestimonialById,
);

/**
 * @route   GET /api/testimonials
 * @desc    Get approved testimonials
 * @access  Public
 */
router.get("/", testimonialController.getApprovedTestimonials);

/**
 * @route   POST /api/testimonials
 * @desc    Submit a new testimonial
 * @access  Public (rate limited)
 */
router.post(
  "/",
  testimonialLimiter,
  testimonialValidation.submit,
  testimonialController.submitTestimonial,
);

/**
 * @route   PATCH /api/testimonials/:id/approve
 * @desc    Approve a testimonial
 * @access  Private (Admin only)
 */
router.patch(
  "/:id/approve",
  authenticate,
  logActivity("APPROVE_TESTIMONIAL", "testimonial"),
  testimonialController.approveTestimonial,
);

/**
 * @route   PATCH /api/testimonials/:id/decline
 * @desc    Decline a testimonial
 * @access  Private (Admin only)
 */
router.patch(
  "/:id/decline",
  authenticate,
  logActivity("DECLINE_TESTIMONIAL", "testimonial"),
  testimonialController.declineTestimonial,
);

/**
 * @route   PUT /api/testimonials/:id
 * @desc    Update a testimonial
 * @access  Private (Admin only)
 */
router.put(
  "/:id",
  authenticate,
  logActivity("UPDATE_TESTIMONIAL", "testimonial"),
  testimonialController.updateTestimonial,
);

/**
 * @route   DELETE /api/testimonials/:id
 * @desc    Delete a testimonial
 * @access  Private (Admin only)
 */
router.delete(
  "/:id",
  authenticate,
  logActivity("DELETE_TESTIMONIAL", "testimonial"),
  testimonialController.deleteTestimonial,
);

module.exports = router;
