# Saulink 校园信息交流平台

Saulink 是面向大学校园场景的信息交流前端项目，当前实现为 Vite + React + TypeScript 单页应用。项目覆盖校园资讯、失物招领、二手交易、学习互助、消息中心、个人主页和内容审核等一期核心页面。

## 技术栈

- React 18
- TypeScript
- Vite
- React Router
- TanStack Query
- Zustand
- Tailwind CSS
- Axios
- lucide-react

## 本地运行

```bash
cd frontend
npm install
npm run dev
```

默认开发地址为 `http://127.0.0.1:5173`。

## 环境变量

复制 `frontend/.env.example` 为本地 `.env` 后可调整：

- `VITE_API_BASE_URL`: 真实后端 API 前缀，默认 `/api/v1`。
- `VITE_USE_MOCK_API`: 是否使用本地 mock 数据，开发默认 `true`；接入后端时设为 `false`。

## 常用命令

```bash
npm run dev
npm run build
npm run lint
npm run preview
```

## 目录说明

```text
frontend/src/
  app/          全局配置、Provider、路由
  components/   通用组件、布局组件、业务组件
  hooks/        复用 Hooks
  layouts/      页面布局
  lib/          工具函数与校验
  pages/        路由页面
  services/     API 与 mock 数据服务
  stores/       全局状态
  styles/       全局样式
  types/        TypeScript 类型
```

## 交付与回滚

- 交付前运行 `npm run lint` 和 `npm run build`。
- 默认保留 mock 数据能力，后端不可用时可将 `VITE_USE_MOCK_API=true` 回退到本地演示模式。
- `dist/`、日志、依赖目录和本地环境文件不纳入版本管理。
