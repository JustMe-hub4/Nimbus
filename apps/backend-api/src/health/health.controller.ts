import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || "development",
  });
});

router.get("/ready", (req, res) => {
  // Add dependency checks here when we have them
  res.json({
    status: "ready",
    dependencies: {
      database: "not configured",
      redis: "not configured",
      mqtt: "not configured",
    },
  });
});

export const healthRouter = router;
