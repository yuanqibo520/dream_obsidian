---
tags:
  - git
created: 2025-12-17
status: in_progress
---
---
## 核心要点

- 仓库（Repository）
	→ 存放项目文件 + 完整历史记录的目录。本地一个，远程（如 GitHub/gitee）一个。
- 提交（Commit）
	→ 一次“快照”（snapshot），记录文件在某个时间点的状态。不是差异，而是完整副本
- 分支（Branch）
	→ 本质是指向某次提交的“指针”。默认主分支现在多为 main（旧为 master）。
- 远程（Remote）
	→ 远程仓库地址（如 GitHub），通常命名为 origin。
- 工作流三区模型
	- 工作区（Working Directory）：你编辑的文件
	- 暂存区（Staging Area / Index）：用 git add 选中的待提交变更
	- 仓库（Repository）：用 git commit 保存的历史快照
==总结==：修改文件 → 暂存（add）→ 提交（commit）→ 同步（push/pull）->本地数据库

# Git 基础操作速查

## 基本约定
- **复制**：鼠标选中即复制  
- **粘贴**：鼠标中键粘贴  
- **Git Bash**：命令行窗口  
- **Git GUI**：图形化工具（可选）

---
## 初始化与配置

```bash
# 初始化本地仓库
git init

# 全局配置（只需一次）
git config --global user.name "你的名字"
git config --global user.email "你的邮箱"

# 克隆远程仓库
git clone <仓库URL> [<本地目录名>]
# 添加文件到暂存区
git add .                 # 添加所有更改
git add <文件名>          # 添加指定文件

# 创建空文件（Linux/macOS）
touch <文件名>

# 提交更改
git commit -m "提交说明"

# 查看状态（工作区 vs 暂存区）
git status