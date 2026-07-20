import express from "express";
import cors from "cors";
import helmet from "helmet";
import pino from "pino";
import { healthRouter } from "./health/health.controller";

const logger = pino({
  level: process.env.LOG_LEVEL || "info",
  transport: process.env.NODE_ENV === "development" ? { target: "pino-pretty" } : undefined,
});

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/health", healthRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  logger.info(`Nimbus API server listening on port ${PORT}`);
});

export { app, logger };
