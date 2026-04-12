import type { RequestHandler } from "express";
import { checkDatabaseConnectivity } from "../../lib/db/health-check.js";

/** GET /health — 网关 / 负载均衡探活，不访问数据库 */
export const plainHealthHandler: RequestHandler = (_req, res) => {
  res.json({ status: "ok", service: "api" });
};

/** GET /api/v1/health — 开发联调用，可带数据库探测 */
export const v1HealthHandler: RequestHandler = async (_req, res) => {
  const db = await checkDatabaseConnectivity();
  res.json({
    status: "ok",
    service: "api",
    database: db.ok ? "connected" : "skipped_or_error",
    database_detail: db.detail,
  });
};
