---
tags:
  - git
created: 2025-12-17
status: in_progress
---
git bash 为命令窗口
git gui 为图形应用工具
初始化本地代码库
git init 
git add .
git comfig --global user.name" "
git comfig --global user.email" "
git clone <ur1>
touch
git status 查看文件状态

要求git不追踪
touch /[FILE-NAME].gitingore
vi . gitingore
*.[后缀]
如果文件已经被追踪了，先得取消追踪 git rm --cached <file>
!/important.log 不忽略 important.log（即使前面有 *.log）
*.txt 忽略文件后缀为.txt的文件
esc退出插入模式，：wq保存并退出

查看提交历史
git log 
git log --oneline

git reset --hand [COMMIT ID]

git add <file>
git flog
git commit -m" "
touch ~/.basrc 

修改或创建->add->暂存区->commit->本地数据库
鼠标选中即为复制，鼠标中键粘贴

git remote add origin <url>   # 关联远程仓库
git push -u origin main       # 首次推送（假设主分支叫 main）
git push                      # 后续推送
git pull                      # 拉取并合并远程更改

git branch               # 列出本地分支
git branch <name>        # 创建新分支
git checkout <branch>    # 切换分支
git switch <branch>      #（新命令）切换分支
git merge <branch>       # 合并指定分支到当前分支
 

# Git 基本代码使用手册

## 核心要点
- 

## 应用场景
- 

## 关联概念
- [[ ]]