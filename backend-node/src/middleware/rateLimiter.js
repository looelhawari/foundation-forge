const rateLimit = require("express-rate-limit");
const config = require("../config");
const { errorResponse } = require("../utils/helpers");

/**
 * General API rate limiter
 */
const apiLimiter = rateLimit({
  windowMs: config.rateLimit.windowMs, // 15 minutes
  max: config.rateLimit.maxRequests, // 100 requests per window
  message: errorResponse("Too many requests. Please try again later."),
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    res
      .status(429)
      .json(errorResponse("Too many requests. Please try again later."));
  },
});

/**
 * Strict rate limiter for auth endpoints
 */
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 attempts per window
  message: errorResponse("Too many login attempts. Please try again later."),
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: true, // Don't count successful logins
  handler: (req, res) => {
    res
      .status(429)
      .json(
        errorResponse(
          "Too many login attempts. Please try again after 15 minutes.",
        ),
      );
  },
});

/**
 * Rate limiter for contact form submissions
 */
const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5, // 5 submissions per hour
  message: errorResponse(
    "Too many contact submissions. Please try again later.",
  ),
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    res
      .status(429)
      .json(
        errorResponse(
          "Too many contact submissions. Please try again after an hour.",
        ),
      );
  },
});

module.exports = { apiLimiter, authLimiter, contactLimiter };
