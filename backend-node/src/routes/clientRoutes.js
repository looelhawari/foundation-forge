const express = require("express");
const router = express.Router();
const clientController = require("../controllers/clientController");
const { authenticate } = require("../middleware/auth");
const { logActivity } = require("../middleware/activityLogger");
const { body } = require("express-validator");
const { handleValidation } = require("../utils/validators");

// Validation rules
const clientValidation = {
  create: [
    body("name").trim().notEmpty().withMessage("Client name is required"),
    body("category")
      .optional()
      .isIn([
        "government",
        "corporate",
        "industrial",
        "real_estate",
        "retail",
        "other",
      ])
      .withMessage("Invalid category"),
    body("projects_count")
      .optional()
      .isInt({ min: 0 })
      .withMessage("Projects count must be a positive number"),
    body("is_featured")
      .optional()
      .isBoolean()
      .withMessage("is_featured must be boolean"),
    handleValidation,
  ],
};

/**
 * @route   GET /api/clients/stats
 * @desc    Get client statistics
 * @access  Private (Admin only)
 */
router.get("/stats", authenticate, clientController.getClientStats);

/**
 * @route   GET /api/clients
 * @desc    Get all clients
 * @access  Public
 */
router.get("/", clientController.getAllClients);

/**
 * @route   GET /api/clients/:id
 * @desc    Get single client
 * @access  Public
 */
router.get("/:id", clientController.getClientById);

/**
 * @route   POST /api/clients
 * @desc    Create a new client
 * @access  Private (Admin only)
 */
router.post(
  "/",
  authenticate,
  clientValidation.create,
  logActivity("CREATE_CLIENT", "client"),
  clientController.createClient,
);

/**
 * @route   PUT /api/clients/:id
 * @desc    Update a client
 * @access  Private (Admin only)
 */
router.put(
  "/:id",
  authenticate,
  logActivity("UPDATE_CLIENT", "client"),
  clientController.updateClient,
);

/**
 * @route   DELETE /api/clients/:id
 * @desc    Delete a client
 * @access  Private (Admin only)
 */
router.delete(
  "/:id",
  authenticate,
  logActivity("DELETE_CLIENT", "client"),
  clientController.deleteClient,
);

module.exports = router;
