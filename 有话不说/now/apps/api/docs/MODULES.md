# API 模块索引

| 模块路径 | HTTP | 说明 |
|----------|------|------|
| `modules/health/health.handlers.ts` | `GET /health`、`GET /api/v1/health` | 探活；v1 含数据库检测 |
| `routes/v1/index.ts` | 挂载于 `API_V1_PREFIX` | 后续在此增加 `auth`、`vocabulary`、`checkin` 等子路由 |

底层：`lib/db/pool.ts`、`lib/db/health-check.ts`。
