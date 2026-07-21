import * as express from "express";
import * as cors from "cors";
import * as helmet from "helmet";
import pino from "pino";
import path from "path";
import { healthRouter } from "./health/health.controller";
import { telemetryRouter } from "./telemetry/telemetry.controller";

const logger = pino({
  level: process.env.LOG_LEVEL || "info",
  transport: process.env.NODE_ENV === "development" ? { target: "pino-pretty" } : undefined,
});

const app = express();
app.use((helmet as any)({ contentSecurityPolicy: false }));
app.use((cors as any)());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/health", healthRouter);
app.use("/api/v1/telemetry", telemetryRouter);

app.get("/dashboard", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/dashboard.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  logger.info(`Nimbus API server listening on port ${PORT}`);
});

export { app, logger };
