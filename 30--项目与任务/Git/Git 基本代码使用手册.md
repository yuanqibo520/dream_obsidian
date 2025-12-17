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
==总结==：修改文件 → 暂存（add）→ 提交（commit）→ 同步（push/pull）

---
## 应用场景

- 协作共享知识库
- 版本回溯
- 自动备份笔记

---

## 关联概念
- [[ ]]

---

git bash 为命令窗口
git gui 为图形应用工具
初始化本地代码库
git init 
git add .
git comfig --global user.name" "
git comfig --global user.email" "
git clone <ur1>
git commit -m" "
touch
git status 查看文件状态
git push -u origin main       # 首次推送（假设主分支叫 main）
git add <file>

要求git不追踪
touch <file>.gitignore
vi . gitingore/直接用记事本编写
*.[后缀]
!/important.log 不忽略 important.log（即使前面有 *.log）
 git rm --cached <文件名>如果文件已经被追踪了，先得取消追踪 
vi.编写页面下
esc退出插入模式，：wq保存并退出

查看提交历史
git log 
git log --oneline

git reset --hard [COMMIT ID]回溯到上一个版本
touch ~/.basrc 

修改或创建->add->暂存区->commit->本地数据库
鼠标选中即为复制，鼠标中键粘贴

git remote add origin <url>   # 关联远程仓库

git pull                      # 拉取并合并远程更改
## 分支
git branch               # 列出本地分支
git branch <name>        # 创建新分支
git checkout <branch>    # 切换分支
git switch (-b)  <branch>      #（新命令）切换并建立（若本身不存在）分支
git branch -d <name>
git branch -D <name> 强制删除，不做任何检查
git merge  <branch>       # 合并指定分支到当前分支
esc退出插入模式，：wq保存并退出
两个文件都被改变了同一行，合并时会产生冲突，需要我们手动修改决策，然后重新提交一遍
master（稳定根）develop（开发躯干）feature（功能叶）hotfix（dbug剪）
 





