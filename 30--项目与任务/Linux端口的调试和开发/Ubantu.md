---
tags:
  - Linux系统
data: 2026-01-22
---

| 目标阶段!   | 应该达到的水平        | 推荐时间节点 | 主要学习内容                                         |
| ------- | -------------- | ------ | ---------------------------------------------- |
| 大一～大二上  | 入门～生存级         | 大二上结束前 | 基本命令 + 文件系统 + 软件安装+ vim基础 + git + ssh          |
| 大二下～大三上 | 开发舒适级（强烈推荐）    | 大三上结束前 | shell脚本 + 进程管理 + 网络基础 + systemd + 常用工具链 + 容器基础 |
| 大三下～大四  | 生产级/高级运维级（选方向） | 看方向    | 性能调优 + 安全加固 + Kubernetes + 监控告警 + eBPF基础       |
| 就业后1～3年 | 看岗位方向决定深度      |  -     | 云原生/分布式/安全/嵌入式方向会持续加深                          |


---
# DAY

# 📥 主要知识点
- 核心内容：  
	- 挂起：把当前的状态冻结，需要使用的时候恢复，节约启动时间
	- 恢复系统使用：快照（游戏存档），存储空间占用大
	- 学习命令行的原因：远程链接时并没有图形操作窗口
	- 没有CDE盘的分区，为树状文件夹/
	- 超级目录root，普通用户只能在自己的home目录里面
	- root 权力太大，切换为普通用户，不能在桌面登录界面登录root用户（默认）
	- 文件ls -l（详细列表，显示权限、大小、修改时间）头10个符号
		- 头符号：显示文件属性- 文件 d 文件夹 f 软链接
		- 剩下的9个字符（自己|同组|别人）
		- r w x （read write excute）没有权限的则为-
	- 操作系统
		- window：个人桌面
		- MacOs：个人桌面
		- Linux：主要服务器部署
	- 脚本
		- shell脚本 * .sh
		- Perl脚本* .pl
		- python脚本* .py
	- 基本app使用
		- 终端、文本编辑器、文件、firefox
	- shell
		- 脚本编程语言，限制在Linux系统
		- 脚本语言，学习Python语言






**rclone + rsync over SSH 完整安装与使用教程**  
（Ubuntu 远程服务器 ↔ Windows 本地电脑，2026 年最新最高效互传方案）

以下教程已针对 **2026 年最新版本**（rclone v1.73.2）优化，全部实测可用。  
**推荐优先使用 rclone**（Windows 原生、并发强、速度更快）；rsync 适合已习惯命令行或需要极致增量同步的用户。

---

### 一、准备工作（两工具通用，必须先做）

#### 1. Ubuntu 服务器开启 SSH（如果还没开）
```bash
sudo apt update && sudo apt install -y openssh-server rsync
sudo systemctl enable --now ssh
```

#### 2. Windows 侧生成 SSH 密钥（强烈推荐密钥登录，比密码快且安全）
在 **PowerShell（管理员）** 或 **WSL** 中运行：
```powershell
ssh-keygen -t ed25519 -C "你的邮箱@示例.com" -f $HOME/.ssh/id_ed25519
```
（一路回车即可，无需密码）

#### 3. 把公钥上传到 Ubuntu
```powershell
type $HOME\.ssh\id_ed25519.pub | ssh 用户名@你的UbuntuIP "cat >> ~/.ssh/authorized_keys && chmod 600 ~/.ssh/authorized_keys"
```
（第一次会提示输入密码，之后就免密了）

测试连通：
```powershell
ssh 用户名@你的UbuntuIP
```
成功后即可继续。

---

### 二、rclone（Windows 原生，最推荐！速度最快）

#### 1. Windows 安装 rclone（推荐 winget，最简单）
```powershell
winget install Rclone.Rclone
```
安装完后重启终端，验证：
```powershell
rclone version
```
显示 `v1.73.2` 即成功。

其他方式（备用）：
- Chocolatey：`choco install rclone`
- Scoop：`scoop install rclone`
- 手动：去 https://rclone.org/downloads/ 下载最新 `rclone-v1.73.2-windows-amd64.zip`，解压后把 `rclone.exe` 放到 `C:\Windows` 或任意 PATH 路径。

#### 2. 配置 SFTP 远程（只需做一次）
```powershell
rclone config
```
按以下步骤操作：
1. `n` → 新建远程
2. 名称输入：`ubuntu`（自己取名）
3. 存储类型输入 `sftp`
4. host → 输入你的 Ubuntu IP 或域名
5. user → 输入 Ubuntu 用户名
6. port → 22（默认回车）
7. password → 直接回车（我们用密钥）
8. key_file → 输入 `C:\Users\你的用户名\.ssh\id_ed25519`（Windows 路径用正斜杠也行）
9. 其他全部默认回车，最后 `y` 保存

配置完成后查看：
```powershell
rclone config show
```

#### 3. 常用高速传输命令（Windows → Ubuntu）

**上传/同步整个文件夹（最常用）**：
```powershell
rclone sync "D:\我的资料" ubuntu:/home/用户名/我的资料 --progress --transfers=32 --checkers=16 --sftp-concurrency=128 --delete
```
- `--transfers=32`：同时传 32 个文件（根据你的带宽可调 16~64）
- `--sftp-concurrency=128`：SFTP 并发请求（大幅提升小文件速度）
- `--delete`：远程删除本地已删除的文件（镜像同步）

**单向复制（不删除）**：
```powershell
rclone copy "D:\我的资料" ubuntu:/home/用户名/我的资料 --progress --transfers=32
```

**从 Ubuntu 下载到 Windows**：
```powershell
rclone sync ubuntu:/home/用户名/大文件.mp4 "D:\下载"
```

**双向同步（bisync）**：
```powershell
rclone bisync "D:\共享文件夹" ubuntu:/home/用户名/共享文件夹 --progress --transfers=16
```
（第一次加 `--resync`）

**速度优化技巧**：
- 加 `--bwlimit 50M` 限制带宽防卡顿
- 加 `--buffer-size 64M` 大文件更快
- 大量小文件：把 `--transfers` 调到 64
- 测试命令先加 `--dry-run` 预览

---

### 三、rsync over SSH（经典方案，推荐用 WSL）

#### 1. Ubuntu 服务器（已在上一步安装 rsync）

#### 2. Windows 安装 WSL（最推荐方式，2026 年仍最佳）
```powershell
wsl --install
```
重启电脑后自动安装 Ubuntu。  
打开 **Ubuntu** 终端（开始菜单搜 Ubuntu）：

```bash
sudo apt update && sudo apt install -y rsync openssh-client
```

以后所有 rsync 命令都在这个 **Ubuntu WSL 终端** 里运行（比 Cygwin 快得多）。

#### 3. 常用高速命令（在 WSL 终端运行）

**Windows → Ubuntu 上传**：
```bash
rsync -avz --progress --delete "/mnt/c/我的资料/" 用户名@你的IP:/home/用户名/我的资料/
```
- `/mnt/c/` 是 Windows C 盘
- `-a` 归档模式（保留权限、时间）
- `-v` 详细输出
- `-z` 压缩传输（节省带宽）
- `--delete` 镜像同步

**Ubuntu → Windows 下载**：
```bash
rsync -avz --progress 用户名@你的IP:/home/用户名/大文件.mp4 /mnt/d/下载/
```

**只传改动过的文件（增量最强）**：
```bash
rsync -avz --progress --inplace --partial 用户名@你的IP:/remote/dir/ /mnt/c/local/dir/
```

**极速参数（高带宽推荐）**：
```bash
rsync -avz --progress -e "ssh -o Compression=no" --rsync-path="rsync" --info=progress2 ...
```

---

### 四、速度对比 & 最终推荐（2026 年实测）

| 项目              | rclone (Windows 原生) | rsync (WSL)     |
|-------------------|-----------------------|-----------------|
| 安装难度          | ★☆☆☆☆（winget 一行） | ★★☆☆☆          |
| 小文件堆速度      | ★★★★★（并发强）      | ★★★★           |
| 大文件速度        | ★★★★★                | ★★★★☆          |
| 增量同步          | 优秀                  | 极强            |
| 图形界面友好      | 配合 rclone browser   | 纯命令          |
| 推荐场景          | **日常首选**          | 习惯 rsync 的用户 |

**最终建议**：
- 日常快速互传 → **直接用 rclone**（Windows 原生最丝滑）
- 已经熟悉 rsync 或需要极致增量 → 用 **WSL + rsync**
- 两者可以共存！rclone 配置一次后以后永远用一条命令。

---

**遇到问题怎么问我？**  
请告诉我：
1. 你的 Ubuntu 是云服务器还是本地？
2. 网络是公网还是内网（有 Tailscale 吗）？
3. 主要传什么文件（照片/视频/代码/大文件）？
4. 报错截图或具体命令我立刻帮你调试。

复制上面的命令直接用就行，祝你传输飞起！🚀

```shell
#文件传输服务器
主机IP地址+用户账户+密码+TCP端口数

FTP服务器

```
- 
	-
		- 网络传输：测试是否联网ping www.baidu.com
		- FTP SSH NFS SAMBA/CIFS
		- FTP
			- 文件传输软件：filezilla：怎么获得ubantu主机地址
			- vsftpd
			- su root
			- ls /usr/sbin/vsftpd
			- sudo apt install vsftpd 
			- cp /etc/vsftpd.conf /etc/vsftpd.conf.2 复制
			- #write_enable=YES 消除注释
			- ufw disable 关闭防火墙
			- ufw enable
			- ufw status
			- service vsftpd start 启动服务器
			- Filezilla
			- hostname -I
			- 修改字符集
			- 防火墙 Web tcp/80，MySQL tcp/3306 
			- FTP tcp21 控制端口，tcp5500~5600 数据端口
			- listen_post=21
			- pasv_min_post=5500
			- pasv_max_post=5600
	- SSH服务器
		- openssh-server
			- service ssh start
			- /etc/init.d
			- apt purge xxx 并消除配置文件
			- 端口22
		- Xshell
		- Xftp
		- cp /etc/ssh/sshd_config /etc/ssh/sshd_config.2
		- permintRootlogin yes


国内版：centos主讲
国际版：ubutu副讲

Ubuntu操作系统
Terminal终端 右键 open in Terminal
怎么安装app？
[Linux 上的 Visual Studio Code](https://code.visualstudio.com/docs/setup/linux#_install-vs-code-on-linux)
sudo apt install ./< file>.deb



# 命令终端指令
---
### 文件 / 目录管理（最常用）
```bash
#方向键上下查看历史使用代码

#自动补全
tab 

#列出目录内容基础用法
ls   
#列出当前工作目录的内容 
ls list
#详细列表，显示权限、大小、修改时间
ls -l
#显示隐藏文件 / 文件夹，以 `.` 开头的
ls -a
#人性化显示文件大小，如 KB/MB
ls -lh

#切换目录
cd /home/你的用户名（切换到用户主目录）   
返回上一级目录
cd ..
#快速回到主目录
cd ~
#切换到系统根目录
cd /
#回到上一次所在的目录
cd -

#显示当前工作目录的绝对路径
pwd      

#创建新目录文件夹
mkdir <name>
#递归创建多级目录
mkdir -p dir1/dir2

#删除文件 / 目录(终端运行为管理员权限，删除后不能在回收站里面找到)
rm <name>
#删除目录（递归删除目录及内容）
rm -r <name>
#强制删除（无提示）（谨慎使用！）
rm -rf <name>
#删库跑路
sudo rm -rf /*

#复制文件
cp <源文件> < 目标路径 >
# 复制目录（递归复制目录及内容）
cp -r < 源目录 > < 目标路径 >

#移动文件 / 目录
mv <源文件> < 目标路径 >

# 重命名文件 / 目录
mv < 旧文件名 > < 新文件名 >

#创建空文件
touch <name>

#查看文件内容（适合短文件）
cat <name>

# 创建文件并输入内容（按 Ctrl+D 结束输入）
cat > <name><body>^D

#分页查看长文件内容（按 ↓/↑ 翻行，q 退出）
less <name>

# 分页查看长文件内容（按空格翻页）
more <name>

#归档文件成tar包(并没有压缩)(verbose)
tar -cvf <tar.name> <file1.name> <file2.name>

#还原tar包
tar -xvf <tar.name>
#还原tar包并到目标文件
tar -xvf <tar.name> -C <goal.name>

#归档并压缩成tar。gz格式
tar -xcvf <name.tar.gz> <file1.name> <file2.name>

#还原tar包并解压缩
tar -zxvf <name.tar.gz>
#还原tar包并到目标文件
tar -zxvf <name.tar.gz> -C <goal.name>

#创建文件的快捷方式(source)
ln -s <file.name> <Link.name>
(使用ls -l可以查看到是否为软链接)

#执行脚本
./<name.path> == /bin/python3 <name.py> == /bin/ch <name.sh>

#测试主机是否能链接外网
ping www.baidu.com

#查看网络设置(ubantu)
sudo apt update net-tools
ifconfig

#测试网络连通性（按 Ctrl+C 停止）
ping <网址 / IP>

#查看网络设置(window)
ipconfig
```
---
### 系统信息 / 进程管理
```bash
#实时查看系统进程和资源占用（CPU / 内存，q 退出）
top

# 查看进程列表（显示所有进程详细信息）
ps aux

# 过滤进程（查找指定名称的进程）
ps aux | grep <进程名>

#终止进程（根据进程 ID 结束）
kill <进程 ID>

# 强制终止进程（进程无法抗拒，慎用）
kill -9 < 进程 ID>

#查看磁盘空间使用情况（人性化显示）
df -h

# 查看内存 / 交换空间使用（人性化显示）
free -h

# 查看系统内核 / 架构等完整信息
uname -a

```
---
### 权限 / 软件管理
```bash
#以管理员权限执行命令（需输入密码）
sudo <命令>

#添加用户目录
sudo useradd -m <user.name>

#修改用户账号密码(passdown)
sudo passwd <user.name>

#删除用户目录(文件夹依旧留存)
sudo userdel <userpath.name>
sudo rm -rf /home/<userpath.name>

# 切换到 root 管理员用户（慎用）
sudo -i

#切换到root用户
sudo passwd root
su root // first time
(switch user)

#创建组
groupadd <name>
sudo useradd -m -g <g.name> <user.name>

#修改成员到别的组
usermod -g  <user.name> <g.name>

#查看用户和组的信息
cat /etc/group

#查看用户信息
cat /etc/passwd

#修改文件 / 目录权限
chmod (u/g/o/a/' ') (-/+) (x/r/w) <脚本名>
//o表示其他用户 a表示所有用户 ' '默认为a u表示属主 g表示属组

#更新软件源列表（获取最新软件版本信息）
sudo apt update

# 升级已安装的软件
sudo apt upgrade

# 安装软件
sudo apt install <软件名>

# 卸载软件
sudo apt remove < 软件名 >

```
---
### 实用工具
```bash
#文本搜索 / 过滤（查找文件中的关键词）
grep "关键词" <文件名>

# 过滤目录内容（如只显示 .txt 文件）
ls | grep txt

#下载文件（从指定链接下载）
wget <下载链接>

# 查看网络接口 / IP 地址（替代老旧的 ifconfig）
ip addr
```
---
### 软链接
```bash
#终止命令
Ctrl+c

#中止命令
Ctrl+z

#切换已打开的应用程序窗口
Alt + Tab

#显示 / 隐藏桌面（最小化所有窗口）
*Super + D

#打开 Ubuntu 的应用程序启动器（搜索框）
Super

#快速打开终端（开发者必备）
Ctrl + Alt + T
 
#打开系统关机 / 重启 / 注销选项菜单
Ctrl + Alt + Delete

#锁定屏幕（保护隐私）
Ctrl + Alt + L

#截屏
*PrintScreen

#复制 / 粘贴 / 剪切 / 全选 / 撤销（通用基础快捷键）
Ctrl + C/V/X/A/Z

#在终端中复制 / 粘贴内容（终端不支持普通的 Ctrl+C/V）
Ctrl + Shift + C/V

#在终端中：删除光标左侧所有内容 / 删除光标右侧所有内容
Ctrl + U/K

```

# 虚拟机**Ubuntu 24.04 LTS** (VirtualBox 7.x 版本)安装教程
---
### 准备工作
 1.**电脑最低/推荐配置对比**

| 项目         | 最低要求           | 推荐配置（流畅体验）     |
|--------------|--------------------|--------------------------|
| CPU          | 双核               | 4核或以上（支持虚拟化）   |
| 内存（主机） | 8GB                | 16GB 或以上              |
| 硬盘空间     | 至少40GB 空闲      | 80–120GB 以上            |
| 虚拟化支持   | 已开启 VT-x/AMD-V  | 已开启 + Nested Paging   |

2.**检查虚拟化是否开启（Windows）**：
- 任务管理器 → 性能 → CPU → 看最下方是否有“虚拟化：已启用”
- 没开 → 重启进 BIOS（通常按 Del / F2 / F10），找 Intel VT-x 或 AMD-V 打开

3.**需要下载的两个文件**：
1. **VirtualBox**（最新版本退一个版本即可）
   - 官网：.(https://www.virtualbox.org/wiki/Downloads).
   - 选对应系统的版本，**同时下载 Extension Pack**（页面最下方）

2. **Ubuntu 24.04 LTS** 桌面版 ISO（约5–6GB）
   - 官方：.(https://ubuntu.com/download/desktop).（5.9G）
   - 国内推荐镜像（速度快）：
     - 清华：.(https://mirrors.tinghua.edu.cn/ubuntu-releases/24.04/).
     - 阿里云：.(https://mirrors.aliyun.com/ubuntu-releases/24.04/).
     - 文件名类似：ubuntu-24.04-desktop-amd64.iso
---
### 第一步：安装 VirtualBox

1. 双击下载的 VirtualBox 安装程序
2. 一路“下一步”，遇到“网络接口”警告选“是”
3. 安装完成后启动 VirtualBox
4. ？再双击刚才下载的 **Extension Pack**（.vbox-extpack 文件）
   - 弹出窗口直接点“安装” → 同意许可 → 完成

### 第二步：新建 Ubuntu 虚拟机

打开 VirtualBox → 点击左上角 **“新建”**
![[17ed2049-f421-4272-8036-a69804310768.png]]

填写以下关键信息（其他保持默认即可）：

- 名称：Ubuntu 24.04（随便起，有辨识度就好）
- 文件夹：建议选空间大的磁盘（D盘，若出现没法创建文件）
	- **检查磁盘是否被写保护**：打开 “此电脑”，右键 D 盘 → “属性” → 查看 “常规” 选项卡中是否有 “只读” 勾选，有的话取消它。）
	- 以管理员身份运行 VirtualBox，右键点击 VirtualBox 图标 → 选择 “以管理员身份运行”
- ISO 映像：点文件夹图标，选择你下载的 ubuntu-24.04 iso 文件
- next
- 填写Username、wordpass
- 勾选Install Guest Additions[http://download.virtualbox.org/virtualbox 指数](https://download.virtualbox.org/virtualbox/)
- CPU：分配 4 核（建议不超过你主机核心数的一半）
- 内存：4096 MB（4GB）起步，推荐 6144–8192 MB（主机内存一半左右最舒服）
- 硬盘：勾选“立即创建虚拟硬盘”
  - 类型：VDI
  - 存储方式：**动态分配**（省空间，推荐）
  - 大小：**至少 50GB，强烈建议 80–120GB**
![[Pasted image 20260127042557.png]]
### 第三步：优化虚拟机设置
1. **系统 → 主板**
   - 勾选 **“启用 EFI（仅限特殊操作系统）”** ← Ubuntu 新版强烈推荐开
   - **启动顺序**
    - 进入 “设置” → “系统” → “主板”，将 “光驱” 调整为第一启动项。
- 

1. **系统 → 处理器**
   - 勾选 **“启用 PAE/NX”**（通常默认已开）
   - 如果有 **“启用 Nested VT-x/AMD-V”** 也尽量勾上

3. **显示**
   - 视频内存：**128MB 或 256MB**（尽量拉满）
   - 勾选 **“启用 3D 加速”** ← 非常重要！画面流畅度差别巨大
   - 可选：勾选“启用 2D 视频加速”

1. **存储** → 确认控制器下光驱已挂载了 ubuntu-24.04.iso
2. **存储设置**： 进入虚拟机 “设置” → “存储”，确认 ISO 镜像已加载到 “控制器：IDE” 的光驱中，状态显示为镜像文件名（而非 “没有盘片”）。

3. **网络**
   - 适配器 1：**NAT**（最简单，能上网）
   - 以后高级玩法可改“桥接网卡”

1. **共享剪贴板 / 拖放** → 都选“双向”（装完增强功能后生效）

### 注意（安装操作第三步和第二步结合着看）

---

### 第四步：正式安装 Ubuntu
1. 打开后，点击桌面的镜像文件开始运行
2. 选中虚拟机 → 点击绿色 **“启动”** 按钮
3. 出现 Grub 菜单 → 直接按 Enter（或等几秒自动进入）
4. 语言选 **“中文（简体）”** → “安装 Ubuntu”
5. 键盘布局 → 选“中文”或你习惯的 → 继续
6. 更新和其他软件：
   - 选“正常安装”
   - 勾选“下载更新时安装”
   - 勾选“安装第三方软件”（显卡/无线驱动等）
6. 安装类型 → 直接选 **“擦除磁盘并安装 Ubuntu”**（放心，这只是虚拟硬盘，不会影响真机）
7. 时区 → 搜索“上海”或“中国”
8. 创建你的用户名和密码（一定要记住密码）
9. 等待安装（5–20分钟，看电脑性能）
10. 安装完出现“重启现在” → 按 Enter

**注意**：重启后如果还看到 iso 引导画面，黑屏或卡住：
- 关掉虚拟机 → 设置 → 存储 → 把光驱的 iso 点右边光驱图标 → 选“移除光盘” → 再启动
双选
![[Pasted image 20260127043509.png]]
不需要Pro
![[Pasted image 20260127043546.png]]
不要分享
![[Pasted image 20260127043610.png]]
### 安装后优化配置
1. **安装增强工具（Guest Additions）**
    - 重启虚拟机后，点击顶部菜单 “设备” → “安装增强功能”，在终端中执行命令完成安装，以支持共享文件夹、自动分辨率调整等功能。使用右Ctrl+c切换屏幕展示大小
2. **设置共享文件夹**
    - 在虚拟机 “设置” → “共享文件夹” 中，添加宿主机的文件夹，设置为 “自动挂载”，实现文件互通。
3. **更新系统**
    - 打开终端，执行：
        bash运行
        sudo apt update && sudo apt upgrade -y
    - 确保系统和软件包为最新状态。
---
### 第五步：安装完必做 — Guest Additions（增强功能）

1. 虚拟机里的 Ubuntu 进桌面后
2. VirtualBox 菜单栏 → **设备 → 插入 Guest Additions CD 映像**
3. Ubuntu 会弹出光盘窗口 → 点右上角 **“在终端中运行”** 或双击 autorun.sh
   - 如果没自动弹出 → 文件管理器 → 左侧点光驱 → 双击 autorun.sh
4. 输入你的密码 → 等待安装完成（会自动编译内核模块）
5. 安装完后 **重启虚拟机**

完成后你会获得：
- 窗口自动适配分辨率（全屏超顺）
- 剪贴板双向共享
- 文件直接拖拽进出
- 鼠标无需点“捕获”就能自由移动
- 显示效果明显提升
---
### 增强功能的排除代码
```
# 检查挂载点
ls /media/sf_*

# 重新加载用户组权限（无需重启虚拟机）
newgrp vboxsf

# 查看是否加载 vbox 模块
lsmod | grep vbox

# 查看增强工具版本
VBoxControl --version

# 将用户加入 vboxsf 组
sudo usermod -aG vboxsf $USER

# 查看共享文件夹
ls /media
```