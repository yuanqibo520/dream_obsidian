### VS Code 
- 定义
	- 轻量级、跨平台（Windows、macOS、Linux）的代码编辑器
	- 和vs2022区别：不是完整 IDE。它通过强大的**扩展生态**来实现几乎所有功能，启动快、占用资源少，
	- 应用场景非常适合 Web 前后端、Python、JavaScript/TypeScript、Go、Rust、Java 等多种语言开发，以及远程开发、容器开发等现代场景。
- 信任目录
	- 把常用的文件路径加进信任目录，常用目录信任后子目录也可以直接信任、无需再单独配置。
	- 打开新代码、新工程时会默认进安全模式（有无法运行、插件受限等诸多影响）
- VS Code 内置支持 JavaScript、TypeScript、HTML、CSS等语言编写环境
- 按Ctrl+‘，’，打开访问设置
- 按Ctrl+B，切换侧边栏
- 按Ctrl+J，切换面板
- 
- 按Ctrl+R，重载窗口，插件安装后重启
- 按Ctrl+Shift+P打开**命令调色面板**
	- 注意命令面板显示了带有快捷键的默认快捷方式。你可以用快捷键直接执行命令
	- **命令模式（`>`）：符号后开始输入以筛选命令列表。
	- **快速打开模式：Ctrl+P快捷键打开命令调色板，直接开始搜索文件**
- 支持免费使用Copilot-Pro
- 支持Linux发行版本：
	Linux（Debian）：Ubuntu Desktop 20.04
	Linux（红帽）：红帽企业版Linux 8
- VS Code 不支持在应用虚拟化方案、多种虚拟机环境、多用户共用设备、容器以及 Windows Server 中运行，在虚拟机中运行则需要完整操作系统。
![[489bae8723378cfa4c8b687960bc4bfd.png]]
---
#### Command Palette 功能-命令面板
- **Windows/Linux**：按 `Ctrl + Shift + P`
	- **快速访问命令**：比如格式化代码、切换主题、打开设置等。
	- **提高效率**：比在菜单栏里层层点击快得多。
	- **发现新功能**：输入关键词就能看到相关操作（比如输入 “git” 会列出所有 Git 命令）。

---
#### IDE-集成开发环境
1. **代码编辑器**：高亮语法、自动补全（比如 VS Code、PyCharm 的主窗口）
2. **编译器/解释器**：把代码转成计算机能运行的形式（如 Python 解释器）
3. **调试器**：帮你一步步查错、看变量值
4. **构建/运行工具**：一键运行或打包程序
5. **版本控制集成**：直接连 Git 等工具

---
#### 便捷的远程开发
- 通过SSH实现远端服务器的连接，只需要保存即可实现同步，不再依靠上传下载
- 插件：**Remote - SSH / Dev Containers** — 远程和容器开发
- 实现步骤

#### 7. Remote 开发（SSH / Containers / WSL）
**教程步骤（以 Remote - SSH 为例）：**
1. 安装 “Remote - SSH” 扩展。
2. Ctrl+Shift+P → Remote-SSH: Connect to Host → 配置 ~/.ssh/config 或直接输入 ssh user@host。
3. 连接后，所有窗口都在远程服务器运行，扩展也安装在远程。
4. Dev Containers：安装 “Dev Containers” 扩展 → 项目根目录创建 .devcontainer/devcontainer.json → 自动构建容器环境。
---
#### 插件
### 1. **Python**  
- **作者**：Microsoft （官方）
### 2. **Prettier - Code formatter**  🧠
- **作者**：Prettier  
- **用途**：自动格式化 JavaScript、TypeScript、CSS、HTML、JSON 等代码，统一风格。  
- **为什么高**：前端/全栈开发者广泛使用，==常与 ESLint 配合。  ==
### 3. **Live Server**  🧠
- **作者**：Ritwick Dey  
- **用途**：一键启动本地开发服务器，支持热重载（修改 HTML/CSS/JS 自动刷新浏览器），模拟网页发布效果 
- **为什么高**：前端初学者和快速原型开发的神器。  
### 4. **ESLint**  🧠
- **作者**：Microsoft  
- **用途**：集成 ESLint 工具，实时检查并修复 JavaScript/TypeSync 代码质量问题。  
- **为什么高**：现代 JS 项目标配，保障代码规范。  
### 5. **GitLens ** 
- **作者**：GitKraken  
- **用途**：增强 Git 功能，如查看每行代码的提交历史、作者、分支信息等。  
注意：
- 过多插件缩短生命周期，影响稳定性
---
#### **总结建议**  
- 如果你主要做 .NET / C# 大型项目 → 继续用 **VS 2022**（或两者结合）。  
- 如果你做 Web、前端、Python、Go、跨平台、云原生、远程开发 → **VS Code** 是首选，生产力极高。  
- 日常工作流：VS Code + GitHub Copilot + GitLens + Remote Containers，几乎覆盖 90% 现代开发需求。





| 功能名称                              | 主要益处                     | 适用场景                   | 与 VS 2022 对比简评                        |
| --------------------------------- | ------------------------ | ---------------------- | ------------------------------------- |
| IntelliSense + AI 补全              | 智能提示、错误检测、Copilot 多行建议   | 日常编码、快速原型              | 类似，但 VS 更强于大型 .NET 项目                 |
| 内置调试器（Debugger）                   | 支持断点、变量监视、多语言调试          | 排查 bug、逐步执行            | 功能接近，但 VS 更丰富高级诊断工具                   |
| 扩展市场（Extensions）                  | 几乎无限扩展功能                 | 自定义环境、添加语言支持           | VS 扩展较少，但更深度集成                        |
| Git 集成 + GitLens                  | 内置 Git + 历史、 blame、可视化分支 | 版本控制、代码审查              | VS 2022 内置 Git 也很好，但 GitLens 更强大      |
| 集成终端（Integrated Terminal）         | 多终端、分屏、直接运行命令            | 运行 npm、dotnet、docker 等 | VS 2022 也有，但 VS Code 更灵活              |
| 设置同步（Settings Sync）               | 云端同步设置、扩展、快捷键            | 多设备开发                  | VS 2022 支持部分同步，但不如 VS Code 方便         |
| 任务与调试配置（tasks.json / launch.json） | 自定义构建、运行、调试流程            | 非标准项目、自动化              | VS 2022 用项目文件管理，更“开箱即用”               |
| Live Share                        | 实时协作编辑、调试、终端共享           | 远程 pair programming、教学 | VS 2022 也有 Live Share，但 VS Code 更流行   |
| Remote - SSH / Containers / WSL   | 远程服务器、Docker、WSL 开发      | 云开发、Linux 环境           | VS 2022 支持 WSL，但 Remote 功能远不如 VS Code |
| Code Actions / 重构 / 格式化           | 快速修复、提取方法、重命名、Prettier   | 代码维护、团队规范              | VS 2022 重构更强大，但 VS Code 靠扩展也很强        |

### 详细文本教程

#### 1. IntelliSense + GitHub Copilot（AI 智能补全）
VS Code 的 IntelliSense 非常强大，2025-2026 年后内置了更原生的 Copilot 支持（不再完全依赖单独扩展）。

**教程步骤：**
1. 安装 GitHub Copilot 扩展（扩展视图 Ctrl+Shift+X → 搜索 “GitHub Copilot” → 安装 → 登录 GitHub 账号）。
2. 打开任意 .js / .ts / .py 文件，输入代码如 `const fetchData = async () => {`。
3. Copilot 会自动给出整段建议（灰色幽灵文本），按 **Tab** 接受；按 **Alt + ] / [** 切换多个建议。
4. 写注释描述需求，例如 `// 创建一个 React 组件显示用户列表`，Copilot 常能直接生成代码。
5. 快捷修复：代码有红波浪线时，按 **Ctrl + .** 打开 Quick Fix，选择修复或重构。
6. 设置：Ctrl+, 搜索 “inline suggest”，启用 “GitHub Copilot: Inline Suggest”。

#### 2. 内置调试器
支持几乎所有主流语言（需安装对应扩展，如 Python、C# Dev Kit、Node.js 等）。

**教程步骤：**
1. 打开 .js 文件，按 F5 或点击左侧“运行和调试”图标。
2. 第一次会提示创建 launch.json，选择环境（如 Node.js、Python、Chrome）。
3. 在代码行左侧点击设置**红色断点**。
4. 按 F5 启动调试 → 程序暂停在断点。
5. 使用调试工具栏：F10（步过）、F11（步入）、F5（继续）、Shift+F5（停止）。
6. 左侧“变量”面板查看局部/全局变量；“监视”可添加表达式。
7. 多配置：launch.json 支持多个 compound 配置，同时调试前端+后端。

#### 5. 集成终端
**教程步骤：**
1. Ctrl+` 打开终端（或 视图 > 终端）。
2. 点击 + 图标新建终端，支持 PowerShell、bash、cmd、zsh 等。
3. 分屏：右上角下拉菜单 → Split Terminal。
4. 运行命令：`npm run dev`、`python -m venv .venv`、`docker compose up` 等。
5. 多项目：可以为不同文件夹设置默认终端配置文件（settings.json）。

#### 6. 设置同步（跨设备神器）
**教程步骤：**
1. 左下角齿轮 → 打开设置同步（或 Ctrl+, → 搜索 “settings sync”）。
2. 登录 GitHub/Microsoft 账号 → 开启同步（设置、扩展、快捷键、主题等全同步）。
3. 新电脑安装 VS Code 后直接登录，即恢复所有个性化配置。



#### 8. Live Share（实时协作）
**教程步骤：**
1. 安装 “Live Share” 扩展。
2. 左下角 Live Share 图标 → 开始协作会话 → 生成链接分享给队友。
3. 队友加入后可共同编辑、调试、共享终端、甚至看彼此光标。

#### 9. 任务与构建（tasks.json）
**教程步骤：**
1. Ctrl+Shift+P → Tasks: Configure Task → 创建 tasks.json。
2. 示例（npm build）：
   ```json
   {
     "version": "2.0.0",
     "tasks": [
       {
         "label": "npm build",
         "type": "npm",
         "script": "build",
         "group": "build"
       }
     ]
   }
   ```
3. Ctrl+Shift+B 运行默认构建任务。

#### 10. 代码格式化与重构
**教程步骤：**
1. 安装 Prettier 扩展 + ESLint（或 Ruff for Python）。
2. 设置：右下角语言模式 → “通过...格式化” → 选择 Prettier。
3. 保存时自动格式化：Ctrl+, → 搜索 “format on save” → 开启。
4. 重构：选中代码 → Ctrl+. → 提取为函数/常量、重命名符号等。






