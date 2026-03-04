const express = require("express");
const router = express.Router();

const authRoutes = require("./authRoutes");
const projectRoutes = require("./projectRoutes");
const contactRoutes = require("./contactRoutes");
const dashboardRoutes = require("./dashboardRoutes");
const uploadRoutes = require("./uploadRoutes");
const clientRoutes = require("./clientRoutes");
const testimonialRoutes = require("./testimonialRoutes");
const settingsRoutes = require("./settingsRoutes");

// Mount routes
router.use("/auth", authRoutes);
router.use("/projects", projectRoutes);
router.use("/contact", contactRoutes);
router.use("/dashboard", dashboardRoutes);
router.use("/upload", uploadRoutes);
router.use("/clients", clientRoutes);
router.use("/testimonials", testimonialRoutes);

// Public settings (GET /api/settings)
router.use("/settings", settingsRoutes);

// Admin settings update (PUT /api/admin/settings)
router.use("/admin/settings", settingsRoutes);

// Health check
router.get("/health", (req, res) => {
  res.json({
    success: true,
    message: "CPC Qatar API is running",
    timestamp: new Date().toISOString(),
  });
});

module.exports = router;
