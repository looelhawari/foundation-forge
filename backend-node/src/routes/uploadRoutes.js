const express = require("express");
const router = express.Router();
const uploadController = require("../controllers/uploadController");
const { authenticate } = require("../middleware/auth");
const { logActivity } = require("../middleware/activityLogger");

/**
 * @route   POST /api/upload/images
 * @desc    Upload multiple images to Cloudinary
 * @access  Private (Admin only)
 */
router.post(
  "/images",
  authenticate,
  uploadController.handleUpload,
  logActivity("UPLOAD_IMAGES", "upload"),
  uploadController.uploadImages,
);

/**
 * @route   DELETE /api/upload/images/:publicId
 * @desc    Delete a single image from Cloudinary
 * @access  Private (Admin only)
 */
router.delete(
  "/images/:publicId",
  authenticate,
  logActivity("DELETE_IMAGE", "upload"),
  uploadController.deleteSingleImage,
);

/**
 * @route   POST /api/upload/images/delete-bulk
 * @desc    Delete multiple images from Cloudinary
 * @access  Private (Admin only)
 */
router.post(
  "/images/delete-bulk",
  authenticate,
  logActivity("DELETE_IMAGES_BULK", "upload"),
  uploadController.deleteMultipleImages,
);

/**
 * @route   POST /api/upload/set-poster
 * @desc    Set poster image for a project
 * @access  Private (Admin only)
 */
router.post("/set-poster", authenticate, uploadController.setPosterImage);

module.exports = router;
