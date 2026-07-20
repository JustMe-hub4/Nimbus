"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.healthRouter = void 0;
const express_1 = require("express");
const router = (0, express_1.Router)();
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
exports.healthRouter = router;
//# sourceMappingURL=health.controller.js.map