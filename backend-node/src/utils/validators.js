const { body, param, query, validationResult } = require("express-validator");
const { errorResponse } = require("./helpers");

/**
 * Validation result handler middleware
 */
const handleValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json(errorResponse("Validation failed", errors.array()));
  }
  next();
};

/**
 * Auth validation rules
 */
const authValidation = {
  login: [
    body("email")
      .trim()
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Invalid email format")
      .normalizeEmail(),
    body("password")
      .notEmpty()
      .withMessage("Password is required")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
    handleValidation,
  ],

  changePassword: [
    body("currentPassword")
      .notEmpty()
      .withMessage("Current password is required"),
    body("newPassword")
      .notEmpty()
      .withMessage("New password is required")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      )
      .withMessage(
        "Password must contain uppercase, lowercase, number and special character",
      ),
    body("confirmPassword")
      .notEmpty()
      .withMessage("Confirm password is required")
      .custom((value, { req }) => {
        if (value !== req.body.newPassword) {
          throw new Error("Passwords do not match");
        }
        return true;
      }),
    handleValidation,
  ],
};

/**
 * Project validation rules
 */
const projectValidation = {
  create: [
    body("title")
      .trim()
      .notEmpty()
      .withMessage("Title is required")
      .isLength({ min: 3, max: 500 })
      .withMessage("Title must be between 3 and 500 characters"),
    body("description")
      .optional()
      .trim()
      .isLength({ max: 5000 })
      .withMessage("Description cannot exceed 5000 characters"),
    body("category")
      .optional()
      .trim()
      .isLength({ max: 100 })
      .withMessage("Category cannot exceed 100 characters"),
    body("location")
      .optional()
      .trim()
      .isLength({ max: 255 })
      .withMessage("Location cannot exceed 255 characters"),
    body("client")
      .optional()
      .trim()
      .isLength({ max: 255 })
      .withMessage("Client cannot exceed 255 characters"),
    body("mainContractor")
      .optional()
      .trim()
      .isLength({ max: 255 })
      .withMessage("Main contractor cannot exceed 255 characters"),
    body("consultant")
      .optional()
      .trim()
      .isLength({ max: 255 })
      .withMessage("Consultant cannot exceed 255 characters"),
    body("area")
      .optional()
      .trim()
      .isLength({ max: 100 })
      .withMessage("Area cannot exceed 100 characters"),
    body("value")
      .optional()
      .trim()
      .isLength({ max: 100 })
      .withMessage("Value cannot exceed 100 characters"),
    body("year")
      .optional()
      .trim()
      .isLength({ max: 20 })
      .withMessage("Year cannot exceed 20 characters"),
    body("status")
      .optional()
      .isIn(["active", "completed", "in_progress", "archived"])
      .withMessage("Invalid status"),
    body("featured")
      .optional()
      .isBoolean()
      .withMessage("Featured must be a boolean"),
    body("images").optional().isArray().withMessage("Images must be an array"),
    handleValidation,
  ],

  update: [
    param("id").isInt({ min: 1 }).withMessage("Invalid project ID"),
    body("title")
      .optional()
      .trim()
      .isLength({ min: 3, max: 500 })
      .withMessage("Title must be between 3 and 500 characters"),
    body("description")
      .optional()
      .trim()
      .isLength({ max: 5000 })
      .withMessage("Description cannot exceed 5000 characters"),
    body("category").optional().trim(),
    body("location")
      .optional()
      .trim()
      .isLength({ max: 255 })
      .withMessage("Location cannot exceed 255 characters"),
    body("client")
      .optional()
      .trim()
      .isLength({ max: 255 })
      .withMessage("Client cannot exceed 255 characters"),
    body("status")
      .optional()
      .isIn(["active", "completed", "in_progress", "archived"])
      .withMessage("Invalid status"),
    body("featured")
      .optional()
      .isBoolean()
      .withMessage("Featured must be a boolean"),
    handleValidation,
  ],

  getById: [
    param("id").isInt({ min: 1 }).withMessage("Invalid project ID"),
    handleValidation,
  ],

  list: [
    query("page")
      .optional()
      .isInt({ min: 1 })
      .withMessage("Page must be a positive integer"),
    query("limit")
      .optional()
      .isInt({ min: 1, max: 100 })
      .withMessage("Limit must be between 1 and 100"),
    query("category").optional().trim(),
    query("status")
      .optional()
      .isIn(["active", "completed", "in_progress", "archived"])
      .withMessage("Invalid status"),
    query("search")
      .optional()
      .trim()
      .isLength({ max: 100 })
      .withMessage("Search term cannot exceed 100 characters"),
    handleValidation,
  ],
};

/**
 * Contact validation rules
 */
const contactValidation = {
  submit: [
    body("name")
      .trim()
      .notEmpty()
      .withMessage("Name is required")
      .isLength({ min: 2, max: 255 })
      .withMessage("Name must be between 2 and 255 characters"),
    body("email")
      .trim()
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Invalid email format")
      .normalizeEmail(),
    body("phone")
      .optional()
      .trim()
      .isLength({ max: 50 })
      .withMessage("Phone cannot exceed 50 characters"),
    body("company")
      .optional()
      .trim()
      .isLength({ max: 255 })
      .withMessage("Company cannot exceed 255 characters"),
    body("subject")
      .optional()
      .trim()
      .isLength({ max: 500 })
      .withMessage("Subject cannot exceed 500 characters"),
    body("message")
      .trim()
      .notEmpty()
      .withMessage("Message is required")
      .isLength({ min: 10, max: 5000 })
      .withMessage("Message must be between 10 and 5000 characters"),
    handleValidation,
  ],

  updateStatus: [
    param("id").isInt({ min: 1 }).withMessage("Invalid submission ID"),
    body("status")
      .notEmpty()
      .withMessage("Status is required")
      .isIn(["new", "read", "responded", "archived"])
      .withMessage("Invalid status"),
    handleValidation,
  ],
};

module.exports = {
  handleValidation,
  authValidation,
  projectValidation,
  contactValidation,
};
