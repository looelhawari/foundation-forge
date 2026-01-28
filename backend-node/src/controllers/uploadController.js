const {
  upload,
  deleteImage,
  deleteImages,
  getPublicIdFromUrl,
} = require("../config/cloudinary");
const { asyncHandler, ApiError, successResponse } = require("../utils/helpers");
const logger = require("../utils/logger");

/**
 * Upload multiple images to Cloudinary
 * POST /api/upload/images
 */
const uploadImages = asyncHandler(async (req, res) => {
  if (!req.files || req.files.length === 0) {
    throw new ApiError(400, "No images uploaded");
  }

  const uploadedImages = req.files.map((file, index) => ({
    url: file.path,
    publicId: file.filename,
    originalName: file.originalname,
    size: file.size,
    format: file.path.split(".").pop(),
    isPoster: index === 0, // First image is poster by default
  }));

  logger.info(
    `${uploadedImages.length} images uploaded by admin ${req.admin.id}`,
  );

  res.status(201).json(
    successResponse(
      {
        images: uploadedImages,
        count: uploadedImages.length,
      },
      "Images uploaded successfully",
    ),
  );
});

/**
 * Delete a single image from Cloudinary
 * DELETE /api/upload/images/:publicId
 */
const deleteSingleImage = asyncHandler(async (req, res) => {
  const { publicId } = req.params;

  if (!publicId) {
    throw new ApiError(400, "Public ID is required");
  }

  // Decode the public ID (it may be URL encoded)
  const decodedPublicId = decodeURIComponent(publicId);

  await deleteImage(decodedPublicId);

  logger.info(`Image deleted: ${decodedPublicId} by admin ${req.admin.id}`);

  res.json(successResponse(null, "Image deleted successfully"));
});

/**
 * Delete multiple images from Cloudinary
 * POST /api/upload/images/delete-bulk
 */
const deleteMultipleImages = asyncHandler(async (req, res) => {
  const { publicIds } = req.body;

  if (!publicIds || !Array.isArray(publicIds) || publicIds.length === 0) {
    throw new ApiError(400, "Array of public IDs is required");
  }

  await deleteImages(publicIds);

  logger.info(`${publicIds.length} images deleted by admin ${req.admin.id}`);

  res.json(
    successResponse(null, `${publicIds.length} images deleted successfully`),
  );
});

/**
 * Set poster image for a project
 * This is just for frontend reference - the actual poster is stored in project images array
 */
const setPosterImage = asyncHandler(async (req, res) => {
  const { images, posterIndex } = req.body;

  if (!images || !Array.isArray(images)) {
    throw new ApiError(400, "Images array is required");
  }

  if (
    posterIndex === undefined ||
    posterIndex < 0 ||
    posterIndex >= images.length
  ) {
    throw new ApiError(400, "Valid poster index is required");
  }

  // Update the isPoster flag for all images
  const updatedImages = images.map((img, index) => ({
    ...img,
    isPoster: index === posterIndex,
  }));

  res.json(
    successResponse({ images: updatedImages }, "Poster image set successfully"),
  );
});

// Multer middleware for handling multiple file uploads
const uploadMiddleware = upload.array("images", 20);

// Error handling wrapper for multer
const handleUpload = (req, res, next) => {
  uploadMiddleware(req, res, (err) => {
    if (err) {
      if (err.code === "LIMIT_FILE_SIZE") {
        return next(new ApiError(400, "File too large. Maximum size is 10MB"));
      }
      if (err.code === "LIMIT_FILE_COUNT") {
        return next(new ApiError(400, "Too many files. Maximum is 20 files"));
      }
      if (err.message) {
        return next(new ApiError(400, err.message));
      }
      return next(new ApiError(500, "Error uploading files"));
    }
    next();
  });
};

module.exports = {
  uploadImages,
  deleteSingleImage,
  deleteMultipleImages,
  setPosterImage,
  handleUpload,
  getPublicIdFromUrl,
};
