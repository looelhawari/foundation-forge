/**
 * Async handler wrapper to catch errors in async route handlers
 * @param {Function} fn - Async function to wrap
 * @returns {Function} - Wrapped function with error handling
 */
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

/**
 * Custom API Error class
 */
class ApiError extends Error {
  constructor(statusCode, message, isOperational = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Create slug from string
 * @param {string} text - Text to convert to slug
 * @returns {string} - URL-friendly slug
 */
const createSlug = (text) => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
};

/**
 * Sanitize user input to prevent XSS
 * @param {string} input - Input string to sanitize
 * @returns {string} - Sanitized string
 */
const sanitizeInput = (input) => {
  if (typeof input !== "string") return input;
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .replace(/\//g, "&#x2F;");
};

/**
 * Paginate results
 * @param {number} page - Current page
 * @param {number} limit - Items per page
 * @param {number} total - Total items
 * @returns {Object} - Pagination info
 */
const paginate = (page, limit, total) => {
  const currentPage = Math.max(1, parseInt(page, 10) || 1);
  const itemsPerPage = Math.min(100, Math.max(1, parseInt(limit, 10) || 10));
  const totalPages = Math.ceil(total / itemsPerPage);
  const offset = (currentPage - 1) * itemsPerPage;

  return {
    currentPage,
    itemsPerPage,
    totalPages,
    totalItems: total,
    offset,
    hasNextPage: currentPage < totalPages,
    hasPrevPage: currentPage > 1,
  };
};

/**
 * Format success response
 * @param {Object} data - Response data
 * @param {string} message - Success message
 * @returns {Object} - Formatted response
 */
const successResponse = (data, message = "Success") => {
  return {
    success: true,
    message,
    data,
  };
};

/**
 * Format error response
 * @param {string} message - Error message
 * @param {Object} errors - Validation errors (optional)
 * @returns {Object} - Formatted response
 */
const errorResponse = (message, errors = null) => {
  const response = {
    success: false,
    message,
  };
  if (errors) response.errors = errors;
  return response;
};

module.exports = {
  asyncHandler,
  ApiError,
  createSlug,
  sanitizeInput,
  paginate,
  successResponse,
  errorResponse,
};
