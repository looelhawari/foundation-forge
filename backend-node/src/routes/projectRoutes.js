const express = require("express");
const router = express.Router();
const projectController = require("../controllers/projectController");
const { authenticate, optionalAuth } = require("../middleware/auth");
const { projectValidation } = require("../utils/validators");
const { logActivity } = require("../middleware/activityLogger");

/**
 * @route   GET /api/projects/categories
 * @desc    Get all categories
 * @access  Public
 */
router.get("/categories", projectController.getCategories);

/**
 * @route   GET /api/projects/stats
 * @desc    Get project statistics
 * @access  Public
 */
router.get("/stats", projectController.getStats);

/**
 * @route   GET /api/projects
 * @desc    Get all projects with pagination and filtering
 * @access  Public
 */
router.get("/", projectValidation.list, projectController.getAllProjects);

/**
 * @route   GET /api/projects/:identifier
 * @desc    Get single project by ID or slug
 * @access  Public
 */
router.get("/:identifier", projectController.getProject);

/**
 * @route   POST /api/projects
 * @desc    Create new project
 * @access  Private (Admin only)
 */
router.post(
  "/",
  authenticate,
  projectValidation.create,
  logActivity("CREATE_PROJECT", "project"),
  projectController.createProject,
);

/**
 * @route   PUT /api/projects/:id
 * @desc    Update project
 * @access  Private (Admin only)
 */
router.put(
  "/:id",
  authenticate,
  projectValidation.update,
  logActivity("UPDATE_PROJECT", "project"),
  projectController.updateProject,
);

/**
 * @route   DELETE /api/projects/:id
 * @desc    Delete project
 * @access  Private (Admin only)
 */
router.delete(
  "/:id",
  authenticate,
  projectValidation.getById,
  logActivity("DELETE_PROJECT", "project"),
  projectController.deleteProject,
);

module.exports = router;
