## `test.cpp` 程序运行过程分析（C 语言实现）

本文以 `Project/test.cpp` 为准（该文件包含完整实现），按“启动→加载→菜单循环→各功能→保存退出”的顺序分析程序运行过程，并标注关键数据流与潜在问题点。

---

## 一、程序目标与总体结构

- **程序类型**：命令行通讯录管理系统（菜单驱动）。
- **核心能力**：
  - 添加/删除/修改/搜索联系人
  - 显示所有联系人（按姓名排序）
  - 导出到指定文件
  - 启动时从 `contacts.txt` 加载，退出时保存回 `contacts.txt`
- **总体控制流**：
  - `main()` 初始化内存与加载文件
  - 进入 `while(true)` 菜单循环
  - 通过 `switch(choice)` 分发到各功能函数
  - `choice==0` 时保存并退出

---

## 二、核心数据结构与常量

### 2.1 常量

- `MAX_CONTACTS`：最大联系人数量（100）
- `MAX_NAME`：姓名最大长度（50）
- `MAX_PHONE`：电话最大长度（20）
- `MAX_EMAIL`：邮箱最大长度（50）
- `MAX_ADDR`：地址最大长度（100）
- `FILE_NAME`：持久化文件名（固定 `contacts.txt`）

### 2.2 结构体

- **`Contact`（单个联系人）**
  - `name` / `phone` / `email` / `addr`
- **`ContactBook`（通讯录）**
  - `contacts[MAX_CONTACTS]`：顺序表存储
  - `count`：当前有效联系人数量

> 运行期间所有业务对同一个 `ContactBook* book` 进行读写，`book->count` 是“有效区间”的边界。

---

## 三、启动流程（`main`）

`main()` 的关键步骤如下：

1. **堆内存分配通讯录对象**
   - `ContactBook* book = malloc(sizeof(ContactBook));`
   - 分配失败则打印错误并返回 `1`。

2. **初始化通讯录**
   - 调用 `initContactBook(book)`：
     - `book->count = 0`
     - `memset(book->contacts, 0, sizeof(book->contacts))`

3. **加载历史数据**
   - 调用 `loadFromFile(book)`：
     - 尝试打开 `contacts.txt`
     - 若不存在则提示“未找到历史数据文件，将创建新文件”，并继续运行（不退出）

4. **进入菜单循环**
   - `while(true)`：
     - `showMenu()` 打印菜单
     - `safeScanfInt(&choice)` 读取用户输入
     - `flushInput()` 清掉输入残留（尤其是 `scanf` 遗留的换行）
     - `switch(choice)` 分发功能
     - 每次功能完成后等待回车，并清屏

---

## 四、菜单循环与输入处理机制

### 4.1 输入读取与校验

- 读取选项使用 `safeScanfInt(&choice)`：
  - MSVC 下使用 `scanf_s`，其他平台使用 `scanf`
  - 返回值不为 1 或选项不在 0–8，则判定为非法输入
- 非法输入处理：
  - 打印提示
  - `flushInput()` 丢弃本行剩余字符
  - `continue` 回到下一轮菜单

### 4.2 为什么需要 `flushInput()`

- 由于 `scanf("%d")` 只读取数字，输入行末的 `\n` 会留在缓冲区。
- 后续业务函数大量使用 `fgets()` 读字符串，如果不清理，`fgets()` 可能直接读到这一个残留换行，导致“看起来没输入就跳过”。
- 因此主循环在读取选项后统一 `flushInput()`，保证后续 `fgets()` 正常等待用户输入。

---

## 五、持久化：文件加载与保存

### 5.1 保存流程（`saveToFile`）

调用时机：

- **退出程序**（`choice == 0`）时必定调用

实现要点：

1. `safeFopen(FILE_NAME, "w")` 打开/创建 `contacts.txt`
2. 遍历 `i=0..book->count-1`，按 CSV 写入：
   - `name,phone,email,addr\n`
3. 关闭文件并提示保存条数

### 5.2 加载流程（`loadFromFile`）

调用时机：

- 程序启动时
- 菜单选项 8（重新加载文件）时

实现要点：

1. `safeFopen(FILE_NAME, "r")` 打开 `contacts.txt`
2. `fgets()` 逐行读取，每行视为一个联系人记录（CSV）
3. 去除尾部 `\n` / `\r\n`
4. `SAFE_STRTOK(line, ",", &saveptr)` 按逗号分割字段
5. 逐字段写入临时 `Contact temp`，再 `memcpy` 到 `book->contacts[book->count]`

### 5.3 重要缺陷（影响“姓名”字段加载）

在 `test.cpp` 的 `loadFromFile()` 中，CSV 解析逻辑存在缺陷：

- 代码先取了第一个 token（应当是 **name**），但**没有把它拷贝到 `temp.name`**；
- 随后直接读取下一个 token 写入 `temp.phone`，再写入 `temp.email`、`temp.addr`；
- 最终 `memcpy` 到通讯录数组时，`contacts[i].name` 可能是未初始化值或上一次循环残留值。

**现象与影响：**

- 文件中明明有姓名，加载后可能出现姓名为空/乱码/重复异常；
- 后续“按姓名删除/修改/排序/查重”会出现异常（因为这些操作都依赖 `name` 字段）。

> 建议在优化/修复时：在解析第一个 token 后立刻 `safeStrCopy(temp.name, MAX_NAME, token)`，并确保每次循环开始时对 `temp` 清零或完整赋值。

---

## 六、各菜单功能运行过程（业务流程）

### 6.1 添加联系人（选项 1：`addContact`）

1. 检查容量是否已满（`count >= MAX_CONTACTS`）
2. 读入姓名 `name`（`fgets`，去掉换行）
3. 遍历检查是否重名（`strcmp`）
4. 依次读入电话/邮箱/地址到 `contacts[count]`
5. `count++`，提示成功

数据变化：

- 写入 `book->contacts[oldCount]`，并将 `book->count` 增加 1

### 6.2 删除联系人（选项 2：`deleteContact`）

1. 若 `count==0` 提示为空
2. 读入目标姓名
3. 线性查找匹配索引 `index`
4. 将 `index+1..count-1` 前移覆盖 `index..count-2`
5. `count--`，提示成功

数据变化：

- 顺序表删除：后续元素整体前移，末尾元素逻辑上被“遗忘”

### 6.3 修改联系人（选项 3：`modifyContact`）

1. 若 `count==0` 提示为空
2. 读入目标姓名并查找索引
3. 姓名不可改；电话/邮箱/地址允许改
4. 每个字段读取一行：
   - 若用户直接回车（空串）则保留原值
   - 否则覆盖原值（`safeStrCopy`）

### 6.4 搜索联系人（选项 4：`searchContact`）

1. 若 `count==0` 提示为空
2. 读入关键字 `keyword`
3. 遍历联系人：
   - 若 `keyword` 是 `name` 或 `phone` 的子串（`strstr`）则命中
4. 输出命中条目及统计数

### 6.5 显示全部（选项 5：`showAllContacts`）

1. 若 `count==0` 提示为空
2. 先 `sortContacts(book)` 按姓名冒泡排序
3. 遍历输出每条联系人与总数

### 6.6 导出文件（选项 6：`exportToFile`）

1. 若 `count==0` 提示为空
2. 读入导出文件名
3. 打开导出文件（写模式）
4. 先排序，再按 CSV 写入所有联系人
5. 关闭文件并提示成功

### 6.7 排序（选项 7：`sortContacts`）

- 使用冒泡排序按 `name` 字典序（A→Z）排序。
- 注意：排序会改变 `contacts` 数组中的存储顺序，从而影响后续显示/导出结果顺序。

### 6.8 重新加载（选项 8）

- 直接调用 `loadFromFile(book)` 覆盖当前内存数据（实际效果取决于 `loadFromFile` 的实现）。
- 在当前实现中，`loadFromFile` 没有先清空 `book`，而是从 `book->count` 当前值继续追加还是从 0 写入，取决于是否在函数内重置 `count`：
  - `test.cpp` 版本 **没有在 `loadFromFile` 开头重置 `book->count`**，因此会在当前 `count` 基础上继续加载并追加，造成重复累加的风险。

> 若希望“覆盖内存数据”，建议在 `loadFromFile()` 开头先执行 `initContactBook(book)` 或至少 `book->count = 0` 并清理数组有效区间。

---

## 七、退出流程

当用户选择 `0`：

1. `saveToFile(book)` 保存当前通讯录到 `contacts.txt`
2. 输出“已保存数据，程序退出”
3. `free(book)` 释放堆内存
4. `return 0` 结束进程

---

## 八、关键注意点汇总（运行层面的坑）

- **加载姓名缺陷**：`loadFromFile` 未写入 `temp.name`，会导致姓名字段异常，影响所有依赖姓名的功能。
- **重新加载“覆盖”语义不成立**：当前 `loadFromFile` 未重置 `count`，菜单 8 会产生“追加加载/重复数据”的风险。
- **CSV 解析能力有限**：使用 `SAFE_STRTOK` 简易切分，无法正确处理字段内包含逗号、引号等复杂 CSV 场景（地址字段也并未真正做到“包含逗号”的兼容）。

---

## 九、小结

`test.cpp` 的程序运行过程非常典型：**结构体顺序表 + 文件持久化 + 菜单循环分发**。整体逻辑清晰，但在“文件加载”环节存在两个会直接影响运行正确性的点（姓名字段未加载、重新加载不重置计数），建议优先修复，再进行模块化拆分与业务/UI 解耦等工程化优化。

