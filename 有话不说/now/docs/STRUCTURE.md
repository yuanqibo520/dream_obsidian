# now 仓库目录说明（分模块 · 便于 debug）

## 根目录

| 路径 | 说明 |
|------|------|
| `apps/web` | Next.js 前端 |
| `apps/api` | Express 后端 |
| `packages/shared` | 前后端共享常量（目前以前端消费为主） |
| `contracts/` | OpenAPI 契约草案 |
| `db/` | PostgreSQL 初始化 SQL |
| `docs/` | 本说明等人读文档 |

## 前端 `apps/web/src`

| 路径 | 职责 |
|------|------|
| `app/` | Next App Router：路由、`layout`、`globals.css` |
| `lib/` | 与 UI 无关的工具：**API 基址、fetch 封装**，断点/抓包时优先查这里 |
| `modules/ui/` | 设计系统级小组件（如 `GlassPanel`） |
| `modules/dashboard/` | 首页仪表盘组合（聚合各业务模块） |
| `modules/system/` | 系统状态、联调组件（如 `BackendStatus`） |
| `modules/stats/` | 统计图表（掌握量等） |
| `modules/checkin/` | 打卡、日历 |
| `modules/progress/` | 今日进度、环形进度等 |

**约定**：业务组件放在 `modules/<领域>/`；跨模块复用的纯逻辑放 `lib/`；页面文件只做组合与路由入口。

## 后端 `apps/api/src`

| 路径 | 职责 |
|------|------|
| `index.ts` | 进程入口：加载环境变量、监听端口 |
| `app.ts` | 组装 Express：中间件 + 挂载路由 |
| `config/` | 常量与环境变量读取（**端口、CORS、DB URL** 对不齐时先看这里） |
| `lib/db/` | 连接池与数据库探活（与业务表无关的底层） |
| `modules/<领域>/` | 按业务拆分的 **handlers / service**（当前仅有 `health`） |
| `routes/v1/` | `/api/v1` 路由表：在此 `Router.use` 挂载各模块子路由 |

**约定**：新增接口时：在 `modules/<域>/` 写处理逻辑，在 `routes/v1/index.ts`（或子文件）注册路径，避免全部堆在 `app.ts`。

## 联调顺序建议

1. `config/env.ts` → `PORT`、`CORS_ORIGIN`、`DATABASE_URL`  
2. `lib/db/health-check.ts` → 数据库是否连通  
3. 前端 `lib/api/public-base-url.ts` → `NEXT_PUBLIC_API_URL` 是否与后端一致  
