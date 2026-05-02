# 🟣注意事项
- 学习命令行：远程链接时并没有图形操作窗口，只有终端
- 主要学习内容：终端、文本编辑器、文件、Firefox
- 脚本
	- shell脚本 * .sh，限制在Linux系统
	- Perl脚本* .pl
	- **python脚本* .py**
>国内版：centos主讲
>国际版：ubutu副讲


[Linux 上的 Visual Studio Code](https://code.visualstudio.com/docs/setup/linux#_install-vs-code-on-linux)
[Linux常用命令(手册)大全 - Dotcpp编程](https://www.dotcpp.com/course/linuxcmd/)

# 🪐1.指令的运行指令
```shell
init 3
init 5
systemctl set-default 
#帮助指令
man ls
help cd
#忘记ubantu用户密码
在开机页面长按 "Shift" 键。这会唤出Grub菜单
选择Ubuntu对应的恢复模式（Recovery Mode）
在恢复模式菜单中，选择 "root" 选项，然后按下回车
修改系统文件和设置的权限。输入命令 `[passwd]<你的用户名>`，然后按下回车键。
输入 `exit` 命令来退出root shell。
```

# 📁2.Vim编写
```shell
#安装vim
sudo apt install Vim

	分为正常（预览）模式和编辑模式
	点击i/a进去编辑模式
	i -> insort mode
	esc ->command omde
#常用命令行
<num> dd 删除
<num> yy 复制
set nu 显示行数
set nonu 隐藏行数
撤回/回退 u
#退出编辑，进入命令模式
	wq 保存退出 q 退出 q!强制退出 注意大小写
shell是命令行界面的总称，bash是Linux和MacOs最常用的命令行	
```
---
# 🔗3.环境变量
```bash
可以在任何路径中使用被定义过的变量
cd 系统文件
echo $PATH
env | grep 

定义环境变量
# 配置在当前用户
vi ~/bashrc
# 配置在系统
vi /etc/profile
source /etc/profile 立即生效
export <变量> = <值> 
exprt PATH=$PATH:<目标程序路径>

```

# 📊4.Ubantu文件系统
```shell
#测试是否联网
ping www.baidu.com
ping [-c num] ip/主机名
#文件传输服务器
主机IP地址+用户账户+密码+TCP端口数
#FTP服务器
vsftpd(ubantu) fliezilla(window)
1.启用管理员模式
su root
2.检测是否安装vsftpd
ls /usr/sbin/vsftpd
3.下载vsftpd
sudo apt install vsftpd 
4.镜像备份文件
cp /etc/vsftpd.conf /etc/vsftpd.conf.Backup
5.消除备注，打开文本文件，消除注释
#write_enable=YES ->write_enable=YES
6.关闭/启动/查看防火墙
ufw disable
ufw enable
ufw status
7.启动FTP服务器
service vsftpd start
8.查看ubantu用户名
hostname -I
9.修改字符集设置安全端口（FTP tcp21 控制端口，tcp5500~5600 数据端口）
listen_post=21
pasv_min_post=5500
pasv_max_post=5600
```

# 🌟5.命令终端指令
---
### 5.1文件 / 目录管理（最常用）
#### 1.1Linux目录结构文件(熟知即可)
- /bin binary 最常用使用的命令 /sbin  s-surper 
- /home 每一个用户都有自己的目录 /root 管理员
- /lib 系统开机所需要最基本的动态连接共享库，类似window的DLL文件
- /lost found 非法关机后存放文件
- /etc 系统管理的配置文件和子目录
- /usr 用户安装的应用程序和文件
- /boot Linux开机启动文件
- /proc /srv /sys 内核文件 不能动
- /tmp 临时文件
- /dev 把所有硬件影射为文件的形式存储
- /mnt 外部的临时存储挂载
- /opt 安装文件存放位置
#### 1.2远程连接服务器
```shell
Xshell
Xftp
```
---
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
```

```shell
#切换目录
cd /home/你的用户名（切换到用户主目录）   
#返回上一级目录
cd ..
#快速回到主目录
cd ~
#切换到系统根目录
cd /
#回到上一次所在的目录
cd -

#显示当前工作目录的绝对路径
pwd      

```

```shell
#创建空文件
touch <name>

#创建新目录文件夹
mkdir <name>
#递归创建多级目录
mkdir -p dir1/dir2

#复制文件
cp < 源文件 > < 目标路径 >
# 复制目录（递归复制目录及内容）
cp -r < 源目录 > < 目标路径 >

#移动文件 / 目录
mv <源文件> < 目标路径 >
# 重命名文件 / 目录
mv < 旧文件名 > < 新文件名 >


#删除文件 / 目录(终端运行为管理员权限，删除后不能在回收站里面找到)
rm <name>
#删除目录（递归删除目录及内容）
rm -r <name>
#强制删除（无提示）（谨慎使用！）
rm -rf <name>
#删库跑路
sudo rm -rf /*

#查看文件内容（适合短文件）
cat <name>
# 创建文件并输入内容（按 Ctrl+D 结束输入）
cat > <name><body>^D
# 分页查看长文件内容（按 ↓/↑ 翻行，q 退出）
less <name>
# 分页查看长文件内容（按空格翻页）
more <name>

#创建文件的快捷方式(source)
ln -s <file.name> <Link.name>
(使用ls -l可以查看到是否为软链接)
```

```shell
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

```
---
### 5.2系统信息 / 进程管理
```bash
#进程基本信息
UID 执行者
PID 进程Id
PPID 父进程Id
STIME 启动时间

#实时查看系统进程和资源占用（CPU / 内存，q 退出）
top
#单个程序进程
top -p PID
#刷新进程
top -d 

# 查看进程列表（显示所有进程详细信息）
ps aux
# 过滤进程（查找指定名称的进程）
ps aux | grep <进程名>
#查看当前进程
ps -sf 
#过滤进程
ps -ef | grep <information>


#终止进程（根据进程 ID 结束）
kill <进程 ID>
# 强制终止进程（进程无法抗拒，慎用）
kill -9 < 进程 ID>        PID
```
```shell
#标记进程符号意思
load average 1/5/15 min
sy system 
ni 高优先级程序占用
wa 等待使用率
id 空闲率
MiB Mem  实际内存
MiB Swap 虚拟内存
buff/cache占用

PR 进程优先级 值越大越高
NI 负值表示高优先级
RES 物理内存
%MEM 占进程内存率
```
![[Pasted image 20260328094447.png]]
![[Pasted image 20260328094155.png]]
```shell
#查看磁盘空间使用情况（人性化显示）
df -h

# 查看内存 / 交换空间使用（人性化显示）
free -h

# 查看系统内核 / 架构等完整信息
uname -a

#执行脚本
./<name.path> == /bin/python3 <name.py> == /bin/ch <name.sh>

#测试主机是否能链接外网
ping www.baidu.com
#测试网络连通性（按 Ctrl+C 停止）
ping <网址 / IP>

```
---
### 5.3权限 / 软件管理
```bash
#切换用户
su - <name>

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

#
systemctl start /enable /status /disable /stop

# 关机
shutdown -h now/<min_num>
halt

# 重启
shutdown -r now/<min_num>
reboot
sync 数据同步到磁盘

exit/logout退出终端

```
---
### 5.4实用工具
```bash
#下载文件（从指定链接下载）
wget <下载链接>

#下载文件 / 发起网络请求
curl [-0] -url

# 查看网络接口 / IP 地址（替代老旧的 ifconfig）
ip addr
#查看网络设置(ubantu)
ifconfig

#显示时间
date
#设置时间
date -s "2026-3-27 16:27:20"
#显示年日历
cal 2026

#查找文件
find [搜索范围] [选项]
选项：-name<>/ -size<>/ -user<>
ls -lh 显示人看的内容

#搜索文件
updatedb 创建locate数据库
locate <file.name>

#搜索检索文件内容
grep [选项] [查找内容] [源文件]
选项： -n 显示pipei行及行号/ -i 忽略大小写

# 过滤目录内容（如只显示 .txt 文件）
ls | grep txt
|:将上一个指令的结果给下一个指令

#执行脚本
./<name.path> == /bin/python3 <name.py> == /bin/ch <name.sh>

#测试网络连通性（按 Ctrl+C 停止）
ping <网址 / IP> 
eg:www.baidu.com

```
---
### 5.5软链接
```bash
#在终端中：删除光标左侧所有内容 / 删除光标右侧所有内容
Ctrl + U/K

#快速打开终端（开发者必备）
Ctrl + Alt + T

#强制终止命令
Ctrl+c

#切换已打开的应用程序窗口
Alt + Tab

#在终端中复制 / 粘贴内容（终端不支持普通的 Ctrl+C/V）
Ctrl + Shift + C/V

#复制 / 粘贴 / 剪切 / 全选 / 撤销（通用基础快捷键）
Ctrl + C/V/X/A/Z

#退出账号登录/登出某些命令的专属页面
CTRL+d

#历史执行命令
history
#检索历史命令(近期和长期)
！
ctrl+r "name"

#中止命令
Ctrl+z

#显示 / 隐藏桌面（最小化所有窗口）
*Super + D

#打开 Ubuntu 的应用程序启动器（搜索框）
Super

#截屏
*PrintScreen
```
---
# 🌌6.MySQL数据库部署
```shell
#检查仓库更新
sudo apt update 
sudo apt upgrade -y
#Ubuntu 官方源直接提供 MySQL 8.0，执行以下命令安装（自动包含客户端）
sudo apt install -y mysql-server

#查看mysql版本
mysql --version
#检查服务是否运行（显示 `active (running)` 为正常）
sudo systemctl status mysql
#若未启动，手动启动并设置开机自启
sudo systemctl start mysql 
sudo systemctl enable mysql

#执行安全脚本，加固 MySQL 安全配置：运行
sudo mysql_secure_installation

按提示依次操作（推荐选择）：
1. 是否启用密码验证插件？输入 `y`（提升密码强度）
	**LOW（低）**：长度 ≥ 8
	**MEDIUM（中）**：长度 ≥ 8，且包含数字、大小写字母和特殊字符
	**STRONG（高）**：长度 ≥ 8，且包含数字、大小写字母、特殊字符，并需通过字典文件校验
	请输入 0 = LOW（低）、1 = MEDIUM（中）、2 = STRONG（高）
2. 设置 root 密码（牢记，后续登录用）
3. 移除匿名用户？输入 `y`
4. 禁止 root 远程登录？输入 `y`（生产环境推荐）
5. 删除 test 数据库？输入 `enter`
6. 重新加载权限表？输入 `y`

#本地免密登录 MySQL
sudo mysql -u root
-- 切换到系统库 
USE mysql; 
-- 修改 root 认证方式为密码认证，设置密码 
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'passd'; 
-- 刷新权限 
FLUSH PRIVILEGES; 
-- 退出 exit;
#测试密码登录
mysql -u root -p

#配置远程登录
--编辑 MySQL 配置文件，允许外部访问
sudo nano /etc/mysql/mysql.conf.d/mysqld.cnf
--找到 `bind-address`，修改
bind-address = 0.0.0.0
按 `Ctrl+O` 保存，`Ctrl+X` 退出
--开放防火墙 3306 端口
sudo ufd allow 3306
sudo ufd reload

#授权远程用户
-- 创建用户（% 表示允许所有 IP 访问） 
CREATE USER '用户名'@'%' IDENTIFIED BY '密码'; 
-- 授予所有权限 
GRANT ALL PRIVILEGES ON *.* TO '用户名'@'%' WITH GRANT OPTION; 
-- 刷新权限 
FLUSH PRIVILEGES; 
exit;
sudo systemctl restart mysql

#登录 MySQL
mysql -u 用户名 -p
#启动 / 停止 / 重启服务
sudo systemctl start mysql 
sudo systemctl stop mysql 
sudo systemctl restart mysql
```
---