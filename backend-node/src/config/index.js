require("dotenv").config();

module.exports = {
  // Server configuration
  port: process.env.PORT || 3001,
  nodeEnv: process.env.NODE_ENV || "development",

  // Database configuration
  database: {
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT, 10) || 3306,
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    name: process.env.DB_NAME || "cpc_qatar",
    connectionLimit: 10,
  },

  // JWT configuration
  jwt: {
    secret: process.env.JWT_SECRET || "fallback_secret_change_me",
    expiresIn: process.env.JWT_EXPIRES_IN || "24h",
  },

  // Admin credentials for initial setup
  admin: {
    email: process.env.ADMIN_EMAIL || "admin@cpcqatar.com",
    password: process.env.ADMIN_PASSWORD || "Admin@123456",
  },

  // Rate limiting
  rateLimit: {
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS, 10) || 900000, // 15 minutes
    maxRequests: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS, 10) || 100,
  },

  // CORS
  cors: {
    frontendUrl: process.env.FRONTEND_URL || [
      "http://localhost:8080",
      "http://localhost:8081",
      "http://localhost:5173",
    ],
  },
};
