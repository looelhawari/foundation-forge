const express = require("express");
const router = express.Router();

const authRoutes = require("./authRoutes");
const projectRoutes = require("./projectRoutes");
const contactRoutes = require("./contactRoutes");
const dashboardRoutes = require("./dashboardRoutes");

// Mount routes
router.use("/auth", authRoutes);
router.use("/projects", projectRoutes);
router.use("/contact", contactRoutes);
router.use("/dashboard", dashboardRoutes);

// Health check
router.get("/health", (req, res) => {
  res.json({
    success: true,
    message: "CPC Qatar API is running",
    timestamp: new Date().toISOString(),
  });
});

module.exports = router;
