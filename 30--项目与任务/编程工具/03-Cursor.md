---
tags:
created: 2026-03-09
---
# ℹ️前言
欢迎来到这份**超长篇、一步到位**的 Cursor 上手教程！  

不管你是计算机专业学生、转行程序员，还是已经在用 VS Code 的老鸟，这篇教程都会让你 **30 分钟入门、3 天熟练、1 周成为生产力怪物**。

---

### 🧠第一章：为什么现在必须学 Cursor？（官网 Cursor Learn 精华）

官网《Cursor Learn》课程开篇就说：

> “这门课不是教你机器学习，而是教开发者如何用 AI 模型和工具更快地写软件。  
> AI 就像交通工具：徒步（纯手写代码）免费但慢；开车（AI 工具）贵但快。你是司机，你来决定。”

官网强调：如果你没有正确的==[[心智模型]]==（mental model），AI 会让你崩溃——代码生成出来却跑不通，越修越乱。  
这门教程就是要给你这个心智模型 + 实战模式。

**Cursor 的核心定位（官网首页原话）**：  
“Cursor 是一个 AI 编辑器 + 编码代理（coding agent）。用自然语言描述你要构建或修改什么，它就会为你写代码。”

2026 年主流评价：Cursor 已经不是“VS Code + 插件”，而是**AI 原生 IDE**，生产力提升 2-5 倍。

---

### 📁第二章：安装 Cursor（官网 Quickstart 完整步骤）

官网 Quickstart 第一步就是下载：

**官方下载地址**：https://cursor.com/downloads

#### 支持系统要求
- **macOS**：10.15 Catalina 及以上（.dmg 原生安装，支持 Apple Silicon + Intel）
- **Windows**：Windows 10 及以上（.exe 原生安装）
- **Linux**：
	- Debian/Ubuntu（推荐）：
    ```bash
    curl -fsSL https://downloads.cursor.com/keys/anysphere.asc | gpg --dearmor | sudo tee /etc/apt/keyrings/cursor.gpg > /dev/null
    echo "deb [arch=amd64,arm64 signed-by=/etc/apt/keyrings/cursor.gpg] https://downloads.cursor.com/aptrepo stable main" | sudo tee /etc/apt/sources.list.d/cursor.list > /dev/null
    sudo apt update
    sudo apt install cursor
    ```
  - RHEL/Fedora：
    ```bash
    sudo tee /etc/yum.repos.d/cursor.repo << 'EOF'
    [cursor]
    name=Cursor
    baseurl=https://downloads.cursor.com/yumrepo
    enabled=1
    gpgcheck=1
    gpgkey=https://downloads.cursor.com/keys/anysphere.asc
    EOF
    sudo dnf install cursor
    ```
  - AppImage（便携版）：下载后 `chmod +x Cursor-*.AppImage` 运行即可。

### **⭐安装后立即做的事（官网强烈建议）**：
1. 用 **GitHub**(优先) / Google 账号登录（解锁 Pro 模型配额）
2. 打开设置（Cmd + ,）→ 搜索 “Import from VS Code” → 一键导入你的扩展、主题、settings.json、keybindings（成功率 95%+）
3. 选择默认模型：新手推荐 **Claude 4.6 Sonnet** 或 **Cursor Composer 1.5**（速度与智能平衡）

---

### 🧾第三章：Cursor 界面与核心快捷键（新手 5 分钟上手）

打开 Cursor 后，你会发现它几乎和 VS Code 一模一样（因为是 fork），但多了 AI 专属面板。

**必背 6 个核心快捷键**（官网 Quickstart + 文档标配）：
- ==**Win: Ctrl + I**（Cmd + I ）→打开 **Agent / Composer**（最强功能！）==
- **Win:Ctrl + L**（Cmd + L ）→ 打开侧边 Chat
- **Win: Ctrl + K**（Cmd + K）→ 选中代码后快速指令编辑
- **Shift + Tab**（在 Agent 输入框）→ 切换 **Plan Mode**（规划模式，神器！）
- **Cmd + .**（在 Composer 中）→ 开启 Agent 自主模式（自动跑命令、修 bug）
- **Tab** → 智能补全（灰色 ghost text）

左下角还有 **模型切换器** 和 **Token 使用量** 显示，随时监控配额。

---

### 📖第四章：Tab 智能补全 + 快速编辑（日常写代码 80% 场景）

官网强调：Tab 是你每天用得最多的功能。

- 边写边按 Tab，AI 会预测下一整段代码（支持多行）
- 写完函数注释 → Tab → 完整实现
- 改一行 → 后面自动同步

**进阶**：选中代码按 Win:Ctrl+k（Cmd + K），输入中文指令：
- “把这个函数改成异步 + 加错误处理”
- “优化性能，减少循环层级”
- “加上 TypeScript 类型定义”

一键接受（Ctrl + Enter）或拒绝（Esc）。

---

### 🚀第五章：Agent / Composer —— Cursor 的灵魂（官网 Quickstart 完整拆解）

官网 Quickstart 标题就是 **“Get started with Cursor's Agent in minutes”**，以下是逐字提炼 + 扩展的实战流程：

#### 1. 打开 Agent（Ctrl + I）
Agent 可以**独立完成复杂任务**：搜索代码库、编辑多文件、运行终端命令、测试、部署。

#### 2. 先规划，再动手（Shift + Tab 开启 Plan Mode）
官网原话：“The most impactful change you can make is planning before coding.”

流程：
1. 输入需求（如“为这个 React 项目加上用户登录 + OAuth”）
2. 按 Shift + Tab 进入 Plan Mode
3. Agent 会：
   - 自动搜索相关文件
   - 提问澄清需求
   - 输出详细实施计划
   - 等你审核通过后再开始写代码

**官方建议**：永远先审计划，再点“Build”！

#### 3. 上下文管理（让 Agent 自动找文件）
- 不用手动 @ 所有文件，Agent 有强大搜索工具
- 只在你知道精确文件名时用 `@文件名`
- 官网警告：塞太多无关文件反而会让 AI 混乱

#### 🧾4. 写提示词的黄金法则（官网对比表）
| 模糊提示               | 具体提示（推荐）                                      |
|------------------------|-------------------------------------------------------|
| “加测试”               | “为 auth.ts 写 logout 边缘案例测试，参考 __tests__/ 目录风格，不要用 mock” |
| “修 bug”               | “登录表单点击按钮会提交两次，找到原因并修复”          |

==**具体 + 参考现有模式 + 描述预期结果** = 成功率翻倍。==

#### 5. 迭代与审查（Review 流程）
- 实时看 diff（变化预览）
- 发现跑偏 → Cmd + Shift + Backspace 立刻停止
- 完成后点击 **Review → Find Issues**（AI 自动审查一遍）
- **官网警告**：AI 代码看起来对但可能有细微错误，必须手动 review！

#### 6. 提供可验证目标（让 Agent 自己迭代）
官网推荐神器工作流：
- 用 TypeScript（类型检查即时反馈）
- 先让 Agent 写测试（故意失败）→ 再让它实现通过测试的代码
- 配置 linter，Agent 会自动遵守

---

### ℹ️第六章：Rules 规则系统 —— 让 AI 永远懂你的团队风格（官网 Rules 文档完整搬运）

这是 Cursor 最被低估的功能！官网专门有一整页《Rules》。

**四种规则类型**（官网原话）：
1. **Project Rules**（.cursor/rules 文件夹，推荐！随项目 git 提交）
2. **User Rules**（全局个人设置）
3. **Team Rules**（团队/企业版，从 dashboard 统一管理）
4. **AGENTS.md**（项目根目录或子目录，简单版）

**创建方式**（最简单）：
- 在 Agent 输入框打 `/create-rule` + 描述需求 → AI 自动生成 .mdc 文件
- 或 设置 → Rules, Commands → + Add Rule

**规则文件示例**（官网标准格式）：
```markdown
---
description: "前端组件规范"
globs: ["**/*.tsx"]
alwaysApply: false
---

- 必须使用 Tailwind 样式
- 动画用 Framer Motion
- 组件命名用 PascalCase
@component-template.tsx
```

**最佳实践**（官网直接摘录）：
- 规则保持 < 500 行
- 多拆小规则而非一个大文件
- 用 `@文件名` 引用而非复制代码
- 发现 Agent 犯错就立刻更新规则
- 团队规则优先级最高

**AGENTS.md 简单用法**（项目根目录新建）：
```markdown
# 项目规范
- 全程使用 TypeScript
- React 组件必须有 Props 接口
- API 层统一用 repository 模式
```

支持子目录嵌套，更精细控制！

---

### 🪐第七章：模型选择与定价（官网 Models 表格实时更新）

官网 Models 页面实时显示（2026 年最新）：

| 模型                  | 默认上下文 | 最大模式 |
| ------------------- | ----- | ---- |
| Claude 4.6 Sonnet   | 200k  | 1M   |
| GPT-5.4             | 272k  | 1M   |
| Grok Code           | 256k  | -    |
| Cursor Composer 1.5 | 200k  | -    |

**学生/新人推荐**：
- 日常：Claude 4.6 Sonnet（速度快、性价比高）
- 大项目重构：GPT-5.4 或 Composer 1.5
- 免费用户也有足够配额，Pro 每月 $20（学生常有优惠）

左下角可随时切换模型。

---

### 🌟第八章：Cursor Learn 官方课程精华浓缩（7 大 Agents 实战模块）

官网《Cursor Learn》把“Coding Agents”分为 7 课，我帮你浓缩成实战 checklist：

1. **Working with agents** → 掌握 Cmd+I + Plan Mode（本教程第 5 章）
2. ==**Understanding your codebase** → 用 Agent 问“How does this project work?”==
3. **Developing features** → 大功能全用 Composer
4. ==**Finding and fixing bugs** → “The login form submits twice...” + Review==
5. **Reviewing and testing code** → 先写测试 → 让 Agent 实现
6. **Customizing agents** → Rules + AGENTS.md（第 6 章）
7. **Putting it all together** → 完整项目从 0 到 1

建议：每天学一课，边学边在自己的小项目里实践。

---

### 第九章：实战案例 —— 30 分钟用 Cursor 做一个完整 Todo App

（按官网 Quickstart 流程实操）

1. 新建文件夹 `todo-app`
2. Ctrl + I 输入：“用 Next.js 15 + Tailwind + TypeScript + Prisma + SQLite 做一个支持注册登录 + Todo CRUD 的完整 Web App，要有暗黑模式和部署脚本”
3. 开启 Plan Mode 审核计划
4. 批准后让 Agent 自主构建（它会自动创建 15+ 个文件、跑 npm install）
5. 完成后继续对话：“加上 OAuth Google 登录”“改成响应式移动端优先”
6. ==测试：让 Agent 写测试用例并运行
7. ==部署：让 Agent 生成 Vercel 脚本

整个过程你只需要当“产品经理”审核即可。

---

### ⏰第十章：常见问题 & 最佳实践（官网 FAQ + 社区共识）

**Q：规则不生效？**  
A：检查规则类型（Always Apply / Intelligently），确认 description 写清楚。

**Q：Token 用得太快？**  
A：用 Plan Mode + 具体提示 + 及时开新对话；优先本地索引模型。

**Q：扩展不兼容？**  
A：绝大部分 VS Code 插件都支持，**少数远程开发插件可能需禁用。**

**最佳实践清单**（官网 + 我的经验）：
- 每周有一天关闭 AI 纯手写代码（防止肌肉记忆退化）
- 大项目先索引（打开文件夹后等几秒）
- 用 `.cursorignore` 忽略 node_modules 等
- 重要代码必须人工 review + git commit 前跑测试
- 多用 `@Docs` 添加外部文档（Figma、API 文档等）

---

### 🧾结语：成为 AI 时代顶级程序员的路径

官网《Cursor Learn》最后一课的精髓：  
**AI 是你的顶级实习生，你是产品经理 + 架构师。**

装好 Cursor 后，立刻做一件小事：
1. 打开一个练习项目
2. Ctrl+ I 输入：“帮我分析这个项目架构并提出 3 个优化建议”
3. 感受 Agent 的强大
	
然后按照本教程顺序，一章一章实践。

**想继续进阶？**
- 官网 Learn 课程：https://cursor.com/learn（免费）
- 官网完整文档：https://cursor.com/docs（随时 Cmd + K 搜索）！

现在就去下载 Cursor，**把这篇教程当做你的 AI 编程圣经**，反复翻阅。

你已经站在了 2026 年程序员的最前沿。

**开始你的 Agent 之旅吧！** 🚀

