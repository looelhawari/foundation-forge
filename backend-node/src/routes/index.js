const express = require("express");
const router = express.Router();

const authRoutes = require("./authRoutes");
const projectRoutes = require("./projectRoutes");
const contactRoutes = require("./contactRoutes");
const dashboardRoutes = require("./dashboardRoutes");
const uploadRoutes = require("./uploadRoutes");
const clientRoutes = require("./clientRoutes");
const testimonialRoutes = require("./testimonialRoutes");

// Mount routes
router.use("/auth", authRoutes);
router.use("/projects", projectRoutes);
router.use("/contact", contactRoutes);
router.use("/dashboard", dashboardRoutes);
router.use("/upload", uploadRoutes);
router.use("/clients", clientRoutes);
router.use("/testimonials", testimonialRoutes);

// Health check
router.get("/health", (req, res) => {
  res.json({
    success: true,
    message: "CPC Qatar API is running",
    timestamp: new Date().toISOString(),
  });
});

module.exports = router;
