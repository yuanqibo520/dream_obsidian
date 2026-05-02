
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






