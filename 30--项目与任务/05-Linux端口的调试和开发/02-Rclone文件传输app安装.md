# 🧾rclone 文件互传-Window+Linux

（Ubuntu 远程服务器 ↔ Windows 本地电脑，高效互传方案，全部实测可用）

本教程针对**2026年最新稳定版本** 优化（rclone v1.66.0，rsync 3.2.7），适配Ubuntu 22.04/24.04 LTS（最常用服务器版本）、Windows 10/11，兼顾新手友好和传输效率。

**核心推荐**：优先使用 rclone（Windows 原生支持，无需依赖WSL，并发稳定、操作简单）；rsync 适合习惯命令行、需要极致增量同步（仅传改动文件）的用户，推荐通过WSL运行（比Cygwin、Putty方案更快更稳定）。

⚠️ 重要提示：所有同步/传输命令，建议先加预览参数（如rclone --dry-run、rsync --dry-run），确认操作无误后再执行，避免误删数据。

# 一、准备工作（两工具通用，必须先完成）

核心目标：打通Windows与Ubuntu的SSH连接，实现免密登录（更安全、更高效，避免频繁输入密码）。

## 1. Ubuntu 服务器开启SSH并安装基础工具

登录Ubuntu服务器（本地服务器直接操作，云服务器通过控制台登录），执行以下命令：

```bash
# 更新软件源并安装openssh-server、rsync（rsync后续用于rsync方案，rclone方案可暂不装）
sudo apt update && sudo apt install -y openssh-server rsync
# 启动SSH服务并设置开机自启
sudo systemctl enable --now ssh
# 查看SSH服务状态（确认启动成功）
sudo systemctl status ssh
```

出现「active (running)」即为启动成功，默认SSH端口为22（无需修改，若云服务器需在安全组开放22端口）。

## 2. Windows 侧生成SSH密钥（优先密钥登录，替代密码）

打开 **PowerShell（无需管理员权限，普通用户即可）**，执行以下命令（避免用管理员权限，防止路径异常）：

```powershell
# 生成SSH密钥（ed25519算法，比rsa更安全、速度更快）
ssh-keygen -t ed25519 -C "你的邮箱@示例.com" -f $env:USERPROFILE\.ssh\id_ed25519
```

执行后一路回车（无需设置密钥密码，若需要更高安全可设置，后续登录需输入密钥密码），生成的密钥文件路径为：`C:\Users\你的Windows用户名\.ssh\`，其中 `id_ed25519` 是私钥（不可泄露），`id_ed25519.pub` 是公钥（需上传到服务器）。

---
- Windows 与 Ubuntu 虚拟机（VirtualBox）22 端口连接被拒绝，核心原因是**虚拟机网络模式 / 端口转发 / 防火墙**配置问题，以下是分步排查 + 解决方案，从简单到复杂逐一验证，确保能彻底解决：

### 一、先确认核心前提（已完成可跳过）

1. Ubuntu 侧 SSH 服务确实正常运行（你已验证`active (running)`，满足）；
2. Ubuntu 防火墙未拦截 22 端口（新手最易忽略）：
    
    bash
    
    运行
    
    ```
    # 查看Ubuntu防火墙状态（UFW是Ubuntu默认防火墙）
    sudo ufw status
    # 若显示「active」且未允许22端口，执行：
    sudo ufw allow 22/tcp
    sudo ufw reload
    ```
    
    （若 UFW 是 inactive，说明防火墙未开启，无需操作）

### 二、核心解决方案：VirtualBox 网络模式配置（90% 的问题根源）

VirtualBox 默认的「NAT 模式」会隔离虚拟机与宿主机的端口访问，导致 Windows 无法直接访问 Ubuntu 的 22 端口，推荐两种方案（选其一即可）：

#### 方案 1：端口转发（保留 NAT 模式，最简单）

适合不想改网络模式的场景，将虚拟机 22 端口映射到宿主机的某个端口（如 2222）：

1. 关闭 Ubuntu 虚拟机；
2. 打开 VirtualBox → 选中你的 Ubuntu 虚拟机 → 点击「设置」→ 「网络」；
3. 网卡 1 → 连接方式选「NAT」→ 点击「高级」→ 「端口转发」；
4. 点击「+」添加转发规则：
    
    - 名称：SSH（自定义）
    - 协议：TCP
    - 主机 IP：127.0.0.1（或留空）
    - 主机端口：2222（任意未被占用的端口，如 2222/8022）
    - 子系统 IP：10.0.2.15（你的 Ubuntu 虚拟机 IP）
    - 子系统端口：22
    
5. 点击「确定」保存，重启 Ubuntu 虚拟机；
6. Windows 侧测试连接（用映射的端口）：
    
    powershell
    
	```
	#确定主机名称
	whoami
    # 测试SSH连通性（端口加 -p 2222）
    ssh 用户名@127.0.0.1 -p 2222
    #重新打开powershell
    # 上传公钥（同样加 -p 2222）
    type $env:USERPROFILE\.ssh\id_ed25519.pub | ssh 用户名@127.0.0.1 -p 2222 "mkdir -p ~/.ssh && cat >> ~/.ssh/authorized_keys && chmod 700 ~/.ssh && chmod 600 ~/.ssh/authorized_keys"
    ```


## 3. 把Windows公钥上传到Ubuntu服务器（实现免密登录）

在PowerShell中执行以下命令（替换「用户名」「你的UbuntuIP」为实际信息）：

```powershell
# 上传公钥并设置正确权限（关键！权限错误会导致密钥登录失败）
type $env:USERPROFILE\.ssh\id_ed25519.pub | ssh 用户名@你的UbuntuIP "mkdir -p ~/.ssh && cat >> ~/.ssh/authorized_keys && chmod 700 ~/.ssh && chmod 600 ~/.ssh/authorized_keys"
```

说明：

- `mkdir -p ~/.ssh`：确保Ubuntu用户目录下的.ssh文件夹存在（若不存在则创建）；

- `chmod 700 ~/.ssh`：SSH强制要求.ssh目录权限为700（仅当前用户可读写执行）；

- `chmod 600 ~/.ssh/authorized_keys`：强制公钥文件权限为600（仅当前用户可读写）。

第一次执行会提示「Are you sure you want to continue connecting」，输入「yes」并回车，然后输入Ubuntu用户的密码（仅第一次需要），执行完成后验证免密登录：

```powershell
ssh 用户名@你的UbuntuIP
```

无需输入密码即可登录Ubuntu，说明SSH免密连接配置成功；若登录失败，优先检查上述权限设置（最常见问题）。

# 二、rclone（Windows原生，最推荐！新手首选）

优势：Windows原生运行，无需依赖WSL，配置一次终身可用，支持图形界面（可选），并发传输稳定，小文件、大文件传输速度均优于传统方案。

## 1. Windows 安装 rclone（3种方式，优先winget，最简单）

### 方式1：winget安装（推荐，Windows 10/11自带，无需额外下载）

```powershell
# 打开PowerShell，执行安装命令
winget install Rclone.Rclone
```

安装完成后，**重启PowerShell**（确保环境变量生效），验证安装：

```powershell
rclone version
```

显示「rclone v1.66.0」（或更高稳定版），即为安装成功。

### 方式2：备用安装（winget失败时使用）

- Chocolatey：`choco install rclone`（需先安装Chocolatey）；

- Scoop：`scoop install rclone`（需先安装Scoop）；

- 手动安装：访问 [rclone官方下载页](https://rclone.org/downloads/)，下载「Windows amd64」版本（如rclone-v1.66.0-windows-amd64.zip），解压后将「rclone.exe」复制到 `C:\Windows` 目录（或其他已添加到系统PATH的目录），重启终端即可使用。

⚠️ 若重启终端后提示「rclone不是内部或外部命令」，手动配置PATH：右键「此电脑」→「属性」→「高级系统设置」→「环境变量」→「系统变量」→找到「Path」→「编辑」→「新建」，添加rclone.exe所在路径（如C:\Windows），保存后重启终端。

## 2. 配置SFTP远程连接（只需配置一次，终身可用）

在PowerShell中执行配置命令：

```powershell
rclone config
```

按以下步骤操作（全程中文提示，跟着来即可）：

1. 输入 `n` → 回车，新建远程连接；

2. 输入远程名称（自定义，如 `ubuntu_sftp`）→ 回车（方便后续命令调用，建议简单好记）；

3. 输入存储类型：输入 `sftp` → 回车（rclone通过SFTP协议连接Ubuntu）；

4. 输入host：你的Ubuntu服务器IP或域名 → 回车；

5. 输入user：Ubuntu服务器的用户名 → 回车；

6. 输入port：默认22 → 回车（无需修改，若SSH端口修改过，输入对应端口）；

7. 输入password：直接回车（我们用SSH密钥登录，无需设置密码）；

8. 输入key_file：输入SSH私钥路径，格式为 `C:\Users\你的Windows用户名\.ssh\id_ed25519`（若用户名含空格，需加引号，如 `"C:\Users\张三\.ssh\id_ed25519"`）→ 回车；

9. 后续所有选项（如key_pass、pubkey_file、host_key、shell等），全部默认回车；

10. 最后输入 `y` → 回车，确认保存配置；

11. 输入 `q` → 回车，退出配置界面。

配置完成后，验证配置是否正确：

```powershell
rclone config show
```

会显示刚才配置的「ubuntu_sftp」远程信息，确认host、user、key_file路径正确即可。


## 3. 常用高速传输命令（Windows ↔ Ubuntu，实测高效）

⚠️ 所有命令中，Windows路径若含空格，需用双引号包裹（如 "D:\我的资料"）；Ubuntu路径无需包裹，若含空格需用反斜杠转义（如 /home/用户名/我的\资料）。

核心参数说明（按需调整，新手默认即可）：

- `--progress`：显示传输进度（速度、剩余时间、已传大小）；

- `--transfers=16`：同时传输的文件数量（默认8，建议8-16，根据带宽调整，过高会导致SSH连接超限）；

- `--checkers=32`：同时检查文件的数量（配合transfers，提升同步效率）；

- `--buffer-size=32M`：传输缓冲区大小，大文件建议设为32M-64M，小文件设为16M；

- `--bwlimit=0`：不限制带宽（默认，若需限制，如50MB/s，设为 --bwlimit=50M）；

- `--dry-run`：预览操作（不实际传输/删除文件，新手必加，确认无误后删除该参数）。

### （1）Windows → Ubuntu 上传/镜像同步（最常用）

镜像同步：将Windows本地文件夹完全同步到Ubuntu，本地删除的文件，远程也会删除（适合备份、迁移），命令：

```powershell
# 先预览（新手必做）
rclone sync "D:\我的资料" ubuntu_sftp:/home/用户名/我的资料 --progress --transfers=16 --checkers=32 --buffer-size=32M --dry-run
# 预览无误后，执行实际同步（删除--dry-run）
rclone sync "D:\我的资料" ubuntu_sftp:/home/用户名/我的资料 --progress --transfers=16 --checkers=32 --buffer-size=32M
```

⚠️ 风险提示：`sync` 命令是单向镜像（本地→远程），`--delete` 参数默认开启（无需手动加），会删除远程有但本地没有的文件，务必先预览！

### （2）Windows → Ubuntu 单向复制（不删除远程文件）

仅上传本地文件，远程已有文件不删除、不覆盖（适合补充上传）：

```powershell
rclone copy "D:\我的资料" ubuntu_sftp:/home/用户名/我的资料 --progress --transfers=16 --buffer-size=32M
```

### （3）Ubuntu → Windows 下载/镜像同步

将Ubuntu远程文件同步到Windows本地，远程删除的文件，本地也会删除：

```powershell
# 先预览
rclone sync ubuntu_sftp:/home/用户名/大文件.mp4 "D:\下载" --progress --transfers=8 --buffer-size=64M --dry-run
# 实际下载
rclone sync ubuntu_sftp:/home/用户名/大文件.mp4 "D:\下载" --progress --transfers=8 --buffer-size=64M
```

说明：大文件传输时，下调`--transfers` 至8，提升稳定性。

### （4）双向同步（bisync，谨慎使用）

实现Windows与Ubuntu文件夹双向同步（本地改动同步到远程，远程改动同步到本地），适合共享文件夹：

```powershell
# 第一次同步（必须加--resync，以本地为准初始化远程，避免双向误删）
rclone bisync "D:\共享文件夹" ubuntu_sftp:/home/用户名/共享文件夹 --progress --transfers=16 --resync --dry-run
# 第一次预览无误后，执行实际同步（删除--dry-run）
rclone bisync "D:\共享文件夹" ubuntu_sftp:/home/用户名/共享文件夹 --progress --transfers=16 --resync
# 后续同步（无需加--resync）
rclone bisync "D:\共享文件夹" ubuntu_sftp:/home/用户名/共享文件夹 --progress --transfers=16
```

⚠️ 双向同步风险提示：

- 第一次必须加 `--resync`，否则可能导致两端数据冲突、误删；

- 同步前建议备份两端文件，避免网络中断、文件冲突导致数据丢失；

- 不适合同步频繁修改的文件（如正在编辑的文档、视频）。

### （5）速度优化技巧（按需调整）

- 大量小文件（如照片、文档）：将 `--transfers` 调到16-32，`--buffer-size` 设为16M；

- 单个大文件（如视频、压缩包）：将 `--transfers` 调到4-8，`--buffer-size` 设为64M-128M；

- 公网低带宽（如100Mbps）：加 `--bwlimit=10M`（限制10MB/s，避免占用全部带宽）；

- 内网高带宽（如千兆）：加 `--sftp-disable-concurrent-writes`，提升大文件传输速度。

### （6）可选：rclone图形界面（新手更友好）

若不喜欢命令行，可安装 **rclone browser**（图形化管理工具）：

```powershell
# winget安装rclone browser
winget install RcloneBrowser.RcloneBrowser
```

安装后打开，选择已配置的「ubuntu_sftp」远程，即可通过图形界面拖拽上传、下载、同步文件，操作和Windows文件管理器一致。

#### 基础测试 / 查看命令（验证连接）
powershell

```
# 1. 测试连接，列出 Ubuntu 家目录文件（核心验证）
rclone ls ubuntu_sftp:/home/fantastic-bob

# 2. 列出 Ubuntu 目录结构（只显示文件夹）
rclone lsd ubuntu_sftp:/home/fantastic-bob

# 3. 查看远程配置详情（确认参数无误）
rclone config show ubuntu_sftp

# 4. 查看 rclone 版本和帮助
rclone version
rclone help sftp  # 查看 SFTP 协议专属帮助
```

#### 进阶实用命令
powershell

```
# 1. 后台传输（断开终端也能继续）
rclone copy "D:\大文件.zip" ubuntu_sftp:/home/fantastic-bob/ --progress --daemon

# 2. 限速传输（避免占满带宽，单位：K/M/G）
rclone copy "D:\大文件夹" ubuntu_sftp:/home/fantastic-bob/ --progress --bwlimit 10M

# 3. 断点续传（大文件传输中断后继续）
rclone copy "D:\大文件.zip" ubuntu_sftp:/home/fantastic-bob/ --progress --retries 5 --low-level-retries 10

# 4. 查看传输日志（排查问题）
rclone copy "D:\测试文件.txt" ubuntu_sftp:/home/fantastic-bob/ --progress -vv --log-file "D:\rclone_log.txt"
```

---
# 三、常见问题排查（实测踩坑总结）

## 1. SSH密钥登录失败

- 原因1：Ubuntu服务器的.ssh目录权限不是700，或authorized_keys权限不是600；

- 解决：登录Ubuntu，执行 `chmod 700 ~/.ssh && chmod 600 ~/.ssh/authorized_keys`；

- 原因2：私钥路径填写错误（如rclone配置时路径写错、WSL复制私钥路径错误）；

- 解决：重新检查私钥路径，确保路径正确、无拼写错误。

## 2. rclone提示「sftp: failed to connect to server」

- 原因1：Ubuntu服务器SSH服务未启动，或云服务器安全组未开放22端口；

- 解决：检查SSH服务状态（`sudo systemctl status ssh`），开放云服务器22端口；

- 原因2：rclone配置中host、user、key_file填写错误；

- 解决：执行 `rclone config`，重新检查并修改配置。

## 3. rsync中文路径识别失败

- 原因：WSL编码未设置为UTF-8；

- 解决：在WSL终端中执行 `export LC_ALL=en_US.UTF-8 && export LANG=en_US.UTF-8`，若想永久生效，可将该命令添加到 `~/.bashrc` 文件中（执行 `echo "export LC_ALL=en_US.UTF-8" >> ~/.bashrc && source ~/.bashrc`）。

## 4. 传输速度慢

- 原因1：并发参数设置过高/过低，或缓冲区大小不合适；

- 解决：调整 `--transfers`（8-16）、`--buffer-size`（16M-64M）参数；

- 原因2：公网带宽限制，或未开启压缩传输；

- 解决：公网加 `-z`（rsync）或默认开启rclone压缩，内网关闭压缩。

# 六、补充说明

1. 数据安全：所有同步/传输操作，建议先备份重要文件，避免误删；

2. 版本更新：rclone、rsync可定期更新（rclone用 `winget upgrade Rclone.Rclone`，Ubuntu用 `sudo apt upgrade rsync`）；

3. 批量操作：可将常用命令保存为批处理文件（.bat，Windows）或shell脚本（.sh，WSL），双击/执行即可快速运行，无需重复输入命令。

---
