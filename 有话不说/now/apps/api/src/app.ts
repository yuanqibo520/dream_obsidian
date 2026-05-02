import cors from "cors";
import express from "express";
import { API_V1_PREFIX } from "./config/constants.js";
import { env } from "./config/env.js";
import { plainHealthHandler } from "./modules/health/health.handlers.js";
import { v1Router } from "./routes/v1/index.js";

export function createApp() {
  const app = express();

  app.use(
    cors({
      origin: env.CORS_ORIGIN,
      credentials: true,
    })
  );
  app.use(express.json());

  app.get("/health", plainHealthHandler);
  app.use(API_V1_PREFIX, v1Router);

  return app;
}
