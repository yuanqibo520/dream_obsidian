# AI_RULES.md

本文件用于统一项目上下文、技术选择、目录结构、开发规范和验收标准。让 AI 写代码前，应先阅读本文和相关源码。

## 项目目标

- 项目名称：Saulink 校园信息交流平台。
- 目标用户：在校大学生、校园内容维护人员。
- 核心问题：让学生可以在本校范围内快速发布、浏览、评论和处理校园信息。
- 一期范围：账号登录/注册、信息流、频道浏览、搜索、发帖、评论、点赞、收藏、消息、举报和后台审核。
- 暂不实现：私信、交易闭环、复杂推荐、课程/一卡通等校方系统能力。

## 技术栈

- 前端：React 18、TypeScript、Vite、React Router、TanStack Query、Zustand、Tailwind CSS、Axios。
- 数据层：默认 mock API，可通过 `VITE_USE_MOCK_API=false` 切换真实后端。
- 包管理器：npm。

## 目录职责

- `components/common`: 通用 UI 组件。
- `components/layout`: 布局组件。
- `components/feature`: 业务组件。
- `services`: API 请求、mock 服务与外部服务封装。
- `stores`: 全局状态。
- `types`: 共享类型定义。
- `lib`: 通用工具函数、校验 schema。
- `app`: 全局配置、路由和 Provider。

## 开发规范

- 修改代码前先阅读相关文件，保持现有结构和风格。
- 不做无关重构，不随意更换技术栈。
- 页面必须考虑 loading、error、empty、success/disabled 状态。
- API 请求统一放在 `services/`，组件不直接读取 `mockData`，除非是明确的纯展示 mock。
- 表单必须处理提交中、提交失败和校验失败状态。
- 移动端不能出现横向溢出。
- 每次较大改动后运行 `npm run lint` 和 `npm run build`。

## 验收标准

- 构建通过。
- lint 通过。
- 核心流程可用：登录、浏览首页、切换频道、搜索、发帖、进入详情、评论、点赞/收藏、举报、后台处理举报。
- 没有提交依赖目录、构建产物、本地日志或 `.env`。
