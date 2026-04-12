# now — 英语单词记忆项目落地骨架

本目录对应《[项目设计文档](../项目设计文档.md)》与《[技术文档](../技术文档.md)》的 **v0 可运行 monorepo**：Next.js（App Router + Tailwind + 玻璃拟态 L1 / 深色 L2 示意）+ Express API + PostgreSQL（Docker）。

**分模块目录说明**见 [docs/STRUCTURE.md](./docs/STRUCTURE.md)。

## 目录结构（概要）

```text
now/
  apps/web/src/
    app/                 # 路由与全局样式
    lib/                 # API 工具等（与页面解耦）
    modules/             # 按业务域拆分：dashboard, checkin, stats, …
  apps/api/src/
    config/              # 常量与环境变量
    lib/db/              # 连接池与健康检查
    modules/             # 按业务域拆分：health, …
    routes/v1/           # /api/v1 路由聚合
  packages/shared
  contracts/
  db/
  docker-compose.yml
```

## 前置要求

- Node.js **≥ 20**
- npm **≥ 10**（或兼容 workspaces 的包管理器）
- Docker Desktop（用于本地 PostgreSQL）

## 首次启动

1. **启动数据库**

   ```bash
   cd now
   docker compose up -d
   ```

2. **安装依赖**

   ```bash
   npm install
   ```

3. **配置环境变量**

   - 复制 `apps/api/.env.example` 为 `apps/api/.env`
   - 复制 `apps/web/.env.example` 为 `apps/web/.env.local`

4. **同时启动前后端**

   ```bash
   npm run dev
   ```

   - 前端：<http://localhost:3000>
   - API：<http://localhost:4000/api/v1/health>

## 单独运行

```bash
npm run dev -w web
npm run dev -w api
```

## 构建

```bash
npm run build
```

## 下一步（与文档对齐）

- 实现 `POST /auth/register`、`POST /auth/login` 与 HttpOnly Session（见技术文档第八节）
- 词库 CRUD、打卡会话与 `GET /checkin/calendar`、`GET /stats/mastery-series`
- Prisma / Drizzle 迁移替代 `db/init.sql` 手工维护
