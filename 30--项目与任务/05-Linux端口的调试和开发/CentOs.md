```shell
#配置MySQL的仓库
wget .deb
dpkg -i .deb
bionic
#导入MySQL仓库的密钥
#更新仓库信息
apt update
#检查是否成功配置仓库
apt-cache policy mysql-server
#使用apt安装MySQL
apt intsall -f -y mysql-client=5.7*mysql-community-server=5.7*

#设置密码

#安装完成以后，启动MySQL并配置开机自启动
/etc/init.d/mysql start #启动
/etc/init.d/mysql stop #停止
/etc/init.d/mysql status #查看状态
systemctl start mysqld #启动
systemctl enable mysqld #开机自启动
mysql_secure_installation
root@
移除y 不同意enter
#获得初始密码
cat /var/log/mysqld.log | grep "temporary paasword"
#管理员权限使用密码启动
mysql -uroot -p
#sql语句
ALTER USER 'root'@'localhost' IDENFIED BY 'password';
//密码>8位数，必须有大小写字母，必须存在特殊符号
#降低密码安全级别，减少密码位数
set global vaildate_password_policy=LOW;
set global vaildate_password_length=4;
ALTER USER 'root'@'localhost' IDENFIED BY 'simple_password';
#配置远程登陆
grant all privileges on *.* to root@"ip地址" identified by 'password' with grant option;n;
#刷新权限，生效
flush privileges;
#退出
exit
#检查端口
netstat -anp | grep 3306