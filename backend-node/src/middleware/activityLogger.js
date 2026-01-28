const { pool } = require("../config/database");
const logger = require("../utils/logger");

/**
 * Activity logging middleware
 * Logs admin actions for audit trail
 */
const logActivity = (action, entityType = null) => {
  return async (req, res, next) => {
    // Store original json method
    const originalJson = res.json.bind(res);

    // Override json method to log after response
    res.json = (data) => {
      // Only log if admin is authenticated and request was successful
      if (req.admin && res.statusCode >= 200 && res.statusCode < 300) {
        const logEntry = {
          admin_id: req.admin.id,
          action: action,
          entity_type: entityType,
          entity_id: req.params.id || data?.data?.id || null,
          details: JSON.stringify({
            method: req.method,
            path: req.originalUrl,
            body: sanitizeLogData(req.body),
          }),
          ip_address: req.ip || req.connection.remoteAddress,
          user_agent: req.headers["user-agent"],
        };

        // Log asynchronously, don't wait for it
        pool
          .execute(
            `INSERT INTO activity_logs (admin_id, action, entity_type, entity_id, details, ip_address, user_agent) 
           VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [
              logEntry.admin_id,
              logEntry.action,
              logEntry.entity_type,
              logEntry.entity_id,
              logEntry.details,
              logEntry.ip_address,
              logEntry.user_agent,
            ],
          )
          .catch((err) => {
            logger.error("Failed to log activity:", err.message);
          });
      }

      return originalJson(data);
    };

    next();
  };
};

/**
 * Remove sensitive data from logs
 */
const sanitizeLogData = (data) => {
  if (!data) return null;

  const sanitized = { ...data };
  const sensitiveFields = [
    "password",
    "currentPassword",
    "newPassword",
    "confirmPassword",
    "token",
  ];

  sensitiveFields.forEach((field) => {
    if (sanitized[field]) {
      sanitized[field] = "[REDACTED]";
    }
  });

  return sanitized;
};

module.exports = { logActivity };
