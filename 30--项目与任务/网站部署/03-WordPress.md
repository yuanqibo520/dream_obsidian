---
status: in_progress
data: 2025-12-23
deadline:
---
---
## 目标
- ### 用 WordPress 搭建类似 CET4 真题在线平台
	- 核心内容：
		- 历年真题列表（按年份/卷别）
		- PDF 在线查看/下载、答案解析
		- 阅读辅助工具（如取词查词、句子翻译、手写标注、高亮）
		- 生词本收集与复习（间隔重复）
		- 
	- 预算来源：
		- 域名+主机->（100-500 元/年）
	- 注意事项
		- 版权问题：使用公共资源
		- 国内用户：主机需备案（公安部要求）
#### 技术文档


---
## 关键步骤
### 阶段1
- [ ] 购买域名
- **阿里云（备案方便）操作：
    - 去阿里云官网（aliyun.com），注册账号（用手机号/微信）。
    - 搜索域名（如“cet4zhenti.com”），检查可用（.com 约 50-100 元/年，.cn 更便宜）。
    - 购买：添加购物车，支付（支付宝/微信）。买 1-3 年，续费提醒。
	- 提示：选易记域名，避免数字/连字符。买后，域名解析（DNS）稍后配置。
	- 常见问题：域名被占？试变体如 cet4online.cn。
- [ ] **购买主机（服务器）
- 云服务器（ECS）或虚拟主机
	- 阿里云/腾讯云轻量应用服务器（新手优惠）
	- ==问题==：服务器后续是否能升级，当前几核几G够用
	- [ ] **备案**
	 -  阿里云提供免费备案服务：提交身份证、照片、网站信息（描述如“英语学习平台”）。
     - 时间：1-20 天（审核中网站不可访问）。备案号如“京 ICP 备 XXXXXX 号”。
     - 如果急，可先用国外主机测试。
- [ ] **域名解析到主机
- 操作（阿里云）：
     - 在域名控制台，添加 A 记录：主机名“@”（根域名），值填服务器 IP。
     - 添加 CNAME：主机名“www”，值填根域名。
- 测试：Ping 域名，看是否解析到 IP（命令行输入“ping cet4zhenti.com”）。
- [ ] **收集内容数据
- 真题 PDF+答案解析+生词列表：
	- 年份跨度 2020-2025
	- 资料来源：教育部官网、百度文库、知乎
	- 命名规范，方便整理-eg：2025-CETF4-pdf

### 阶段 2:
- [ ] **登录服务器**：
   - （推荐）用 SSH 工具（如 PuTTY、Xshell）连接服务器：
	   - 输入 IP、用户名 root、密码。
   - 备选：主机面板（阿里云控制台的“远程连接”，感觉还行）
- [ ] **安装必要环境**（如果主机没预装）：
   -  win+r，输入cmd，打开系统操作命令符
   - 更新系统：命令行输入 `sudo apt update && sudo apt upgrade`（Ubuntu）或 `sudo yum update`（CentOS）。
   - 安装 LAMP（Linux + Apache + MySQL + PHP）
     - 示例命令（Ubuntu）：`sudo apt install apache2 mysql-server php libapache2-mod-php php-mysql`。
   - 重启服务：`sudo systemctl restart apache2`。
- [ ] **下载并安装 WordPress**：
   - 下载：命令行 `wget https://wordpress.org/latest.tar.gz`，解压 `tar -zxvf latest.tar.gz`。
   - 移动到 web 目录：`sudo mv wordpress/* /var/www/html/`。
   - 配置权限：`sudo chown -R www-data:www-data /var/www/html/`。
   - 创建数据库：
     - 登录 MySQL：`sudo mysql -u root -p`（密码空或主机给的）。
     - 创建：`CREATE DATABASE wordpress; CREATE USER 'wpuser'@'localhost' IDENTIFIED BY 'strongpassword'; GRANT ALL ON wordpress.* TO 'wpuser'@'localhost'; FLUSH PRIVILEGES; EXIT;`。
   - 浏览器访问域名/install.php，填数据库信息
	   - 主要信息：（名称 wordpress/用户 wpuser/密码 strongpassword/主机 localhost）。
   - 完成安装：设置站点标题“CET4 真题在线”、管理员账号/密码。
- [ ] **登录后台**：
   - 访问域名/wp-admin，登录（用户名 admin，密码自己设）。
   - 常见问题：安装卡住？检查 PHP 版本（需 7.4+），或用主机“一键安装”。

### 阶段 3: 配置主题和布局（
- [ ] **选择并安装主题**：
   - 主题决定网站外观。推荐免费：Astra（轻快、SEO 好）、GeneratePress（简洁）。
   - 操作：后台“外观 -> 主题 -> 添加新”，搜“Astra”，安装激活。
   - 自定义：用 Elementor 插件（免费拖拽编辑器）设计页面。
     - 安装 Elementor：后台“插件 > 添加新”，搜“Elementor”，安装激活。
     - 编辑首页：新建页面，Elementor 编辑，添加标题、按钮、折叠列表。
- [ ] **设计网站结构**：
   - 创建页面：
     - 首页：列表年份（如 accordion 折叠：2025、2024...）。
     - 每个年份页面：子页面，嵌入 PDF、解析。
     - 关于/联系：静态页。
   - 菜单：外观 > 菜单，添加页面到主菜单（首页、真题列表、生词本）。
   - 布局像原网站：干净、白底、左侧导航（用主题设置）。





---
## 相关资料
- [[ ]]




---
## 实操问题



#### 阶段 4: 安装插件实现核心功能（2-4 小时）
插件是 WordPress 的灵魂，安装后激活配置。搜插件时用英文，避免山寨。

1. **真题列表与管理**：
   - 插件：Custom Post Type UI（创建“真题”类型）、Advanced Custom Fields (ACF)（添加字段如年份、PDF 链接）。
   - 操作：新建“真题”帖子，按年份发布，ACF 加下拉菜单分类。

2. **PDF 查看/下载**：
   - 插件：PDF Embedder 或 EmbedPress。
   - 操作：上传 PDF 到媒体库，在页面嵌入 [pdf]短码，支持手机翻页、缩放，像原网站试卷排版。

3. **答案解析**：
   - 用内置编辑器添加文本/图片，或插件 WP Quiz（做解析 quiz）。

4. **阅读辅助工具**：
   - 取词查词/翻译：GlotDict 或 WP Translate（阅读时划词弹出有道/百度翻译）。
   - 手写标注/高亮：Annotator 或 Hypothesis 插件（支持笔记、高亮，保存到用户账号）。
   - 配置：页面添加 JavaScript（Velo 类似，但 WordPress 用代码片段插件）。

5. **生词本收集与复习**：
   - 插件：Simple Vocabulary 或 Anki Integration（收集生词、间隔重复复习）。
   - 高级：LearnDash（付费，创建生词卡片、quiz）。
   - 操作：用户登录后，页面添加按钮“添加生词”，存到数据库。

6. **用户系统**：
   - 内置会员：设置 > 常规 > 任何人可注册。
   - 插件：Ultimate Member（免费登录、个人生词本）。

7. **其他插件**：
   - SEO：Yoast SEO（优化标题、描述）。
   - 安全：Wordfence（防火墙、扫描）。
   - 性能：WP Super Cache（加速）。
   - 备份：UpdraftPlus（自动备份到云）。

安装插件后，配置每个：去插件设置页，填 API（如翻译用有道 key，免费申请）。

#### 阶段 5: 填充内容与测试（1-2 天）
1. **上传真题**：
   - 媒体 > 添加新，上传 PDF。
   - 创建页面/帖子：标题“2025 上半年 CET4”，内容嵌入 PDF + 解析文本。

2. **实现生词功能**：
   - 用表单插件（如 Contact Form 7）收集生词，存到数据库。
   - 测试：浏览器不同设备访问，检查标注/翻译是否工作。

3. **移动适配**：
   - WordPress 默认响应式，测试手机查看 PDF（插件支持）。

4. **安全优化**：
   - 安装 SSL：用 Let’s Encrypt（免费），命令 `sudo apt install certbot`，生成证书。
   - 强密码、限登录尝试（插件）。

#### 阶段 6: 上线、推广与维护（持续）
1. **上线**：
   - 移除安装文件，设置 permalink（设置 > 固定链接 > 文章名）。
   - 测试全站：点击每个链接，模拟用户。

2. **推广**：
   - 提交百度/Google 站长工具。
   - 分享微信/知乎/X，关键词如“CET4 真题在线”。

3. **维护**：
   - 更新 WordPress/插件（每周查）。
   - 监控：用 Jetpack 插件看流量。
   - 备份：每周一次。

**总预算分解**：域名 50 元 + 主机 200 元 + 插件/主题付费版（可选 100 元）= 350 元/年。

**常见坑与排查**：
- 网站白屏？检查 PHP 错误日志（/var/log/apache2/error.log）。
- 慢？优化图片、用 CDN（如阿里云 OSS）。
- 功能不工作？插件冲突，禁用测试。

这个步骤覆盖 95% 需求，如果想 100% 复制（如 App-like 生词同步），可能需自定义代码（雇开发者，1000-5000 元）。如果卡在某步（如备案），或想具体插件配置，告诉我细节，我再帮你！加油，你的 CET4 网站会帮到很多备考者 🚀