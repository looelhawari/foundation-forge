require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const config = require("./config");
const { testConnection } = require("./config/database");
const routes = require("./routes");
const { errorHandler, notFoundHandler } = require("./middleware/errorHandler");
const { apiLimiter } = require("./middleware/rateLimiter");
const logger = require("./utils/logger");
const { initializeTransporter } = require("./utils/emailService");

// Initialize express app
const app = express();

// Initialize email service
initializeTransporter();

// Trust proxy (for rate limiting behind reverse proxy)
app.set("trust proxy", 1);

// Security middleware
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
    contentSecurityPolicy: false, // Disable for API
  }),
);

// CORS configuration - Allow all localhost ports in development
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps, curl, Postman)
    if (!origin) {
      return callback(null, true);
    }
    // Allow all localhost origins in development
    if (
      origin.startsWith("http://localhost:") ||
      origin.startsWith("http://127.0.0.1:")
    ) {
      return callback(null, true);
    }
    // Check against configured allowed origins
    const allowedOrigins = Array.isArray(config.cors.frontendUrl)
      ? config.cors.frontendUrl
      : [config.cors.frontendUrl];
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));

// Body parsing middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Apply rate limiting to all API routes
app.use("/api", apiLimiter);

// API routes
app.use("/api", routes);

// 404 handler
app.use(notFoundHandler);

// Global error handler
app.use(errorHandler);

// Start server
const startServer = async () => {
  try {
    // Test database connection
    const dbConnected = await testConnection();

    if (!dbConnected) {
      logger.error(
        "Failed to connect to database. Please check your configuration.",
      );
      logger.info("Make sure MySQL is running and run: npm run db:init");
      process.exit(1);
    }

    // Start listening
    app.listen(config.port, () => {
      logger.info(`
╔════════════════════════════════════════════════════════╗
║                   CPC Qatar API                        ║
╠════════════════════════════════════════════════════════╣
║  Server running on port: ${config.port}                        ║
║  Environment: ${config.nodeEnv.padEnd(39)}║
║  API URL: http://localhost:${config.port}/api                  ║
╚════════════════════════════════════════════════════════╝
      `);
    });
  } catch (error) {
    logger.error("Failed to start server:", error);
    process.exit(1);
  }
};

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  logger.error("Unhandled Rejection:", err);
  process.exit(1);
});

// Handle uncaught exceptions
process.on("uncaughtException", (err) => {
  logger.error("Uncaught Exception:", err);
  process.exit(1);
});

// Graceful shutdown
process.on("SIGTERM", () => {
  logger.info("SIGTERM received. Shutting down gracefully...");
  process.exit(0);
});

process.on("SIGINT", () => {
  logger.info("SIGINT received. Shutting down gracefully...");
  process.exit(0);
});

// Start the server
startServer();

module.exports = app;
