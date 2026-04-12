import { Router } from "express";
import { v1HealthHandler } from "../../modules/health/health.handlers.js";

/** /api/v1 下所有子路由；后续在此挂载 auth、vocabulary、checkin 等模块 */
export const v1Router = Router();

v1Router.get("/health", v1HealthHandler);
