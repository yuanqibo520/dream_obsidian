# 开发工作日志

## 2026-06-15

### 本次目标

- 落地 Saulink 项目优化改革方案的 P0/P1 核心项。
- 修复乱码文案、ESLint 9 配置缺失、mock/API 切换和用户核心交互闭环。

### 完成内容

- 新增 `VITE_API_BASE_URL` 与 `VITE_USE_MOCK_API` 环境配置。
- 为 `services/` 建立 mock/API 双模式切换，保留本地演示能力。
- 修复首页、认证、发帖、详情、消息、后台审核等主流程文案乱码。
- 发帖、评论、点赞、收藏、举报、标记已读、处理举报改为可改变状态并刷新缓存。
- 新增 NotFound、Unauthorized 和路由错误边界页面。
- 补齐 ESLint 9 平面配置。

### 验证要求

- `npm run lint`
- `npm run build`

### 后续建议

- 接入真实后端后，将 `VITE_USE_MOCK_API=false` 并按当前 service 契约联调。
- 增加 Vitest/React Testing Library，覆盖 validators、services 和核心表单组件。
- 增加端到端冒烟测试，覆盖登录、发帖、评论、举报与后台处理。
