"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const pino_1 = __importDefault(require("pino"));
const health_controller_1 = require("./health/health.controller");
const logger = (0, pino_1.default)({
    level: process.env.LOG_LEVEL || "info",
    transport: process.env.NODE_ENV === "development" ? { target: "pino-pretty" } : undefined,
});
exports.logger = logger;
const app = (0, express_1.default)();
exports.app = app;
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use("/api/v1/health", health_controller_1.healthRouter);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    logger.info(`Nimbus API server listening on port ${PORT}`);
});
//# sourceMappingURL=index.js.map