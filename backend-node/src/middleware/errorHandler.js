const { ApiError, errorResponse } = require("../utils/helpers");
const logger = require("../utils/logger");
const config = require("../config");

/**
 * Global error handling middleware
 */
const errorHandler = (err, req, res, next) => {
  // Log error
  logger.error(`${err.message}`, {
    stack: err.stack,
    url: req.originalUrl,
    method: req.method,
    ip: req.ip,
  });

  // If it's an ApiError, use its properties
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json(errorResponse(err.message));
  }

  // MySQL errors
  if (err.code === "ER_DUP_ENTRY") {
    return res
      .status(409)
      .json(errorResponse("A record with this data already exists."));
  }

  if (err.code === "ER_NO_REFERENCED_ROW_2") {
    return res
      .status(400)
      .json(errorResponse("Referenced record does not exist."));
  }

  // JWT errors (if not caught by auth middleware)
  if (err.name === "JsonWebTokenError") {
    return res.status(401).json(errorResponse("Invalid token."));
  }

  if (err.name === "TokenExpiredError") {
    return res.status(401).json(errorResponse("Token has expired."));
  }

  // Multer errors (file upload)
  if (err.code === "LIMIT_FILE_SIZE") {
    return res.status(400).json(errorResponse("File size is too large."));
  }

  if (err.code === "LIMIT_UNEXPECTED_FILE") {
    return res.status(400).json(errorResponse("Unexpected file field."));
  }

  // Validation errors from express-validator are handled in validators.js
  // This catches any other validation errors
  if (err.name === "ValidationError") {
    return res
      .status(400)
      .json(errorResponse("Validation failed.", err.errors));
  }

  // Default server error
  const statusCode = err.statusCode || 500;
  const message =
    config.nodeEnv === "production" && statusCode === 500
      ? "Internal server error"
      : err.message || "Internal server error";

  res.status(statusCode).json(errorResponse(message));
};

/**
 * 404 Not Found handler
 */
const notFoundHandler = (req, res) => {
  res.status(404).json(errorResponse(`Route ${req.originalUrl} not found`));
};

module.exports = { errorHandler, notFoundHandler };
