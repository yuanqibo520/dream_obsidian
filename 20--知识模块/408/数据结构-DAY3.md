---
tags:
  - 数据结构
data: 2026-01-11
---
# 📥 主要知识点
- 核心内容：  
	- 顺序表的基本操作
	- 顺序表特征
	- 链表的定义

---
## 🧠 理解+知识点
#### 分支
- 顺序表
	- 存储结构：逻辑相邻的元素在物理意义上也相邻
	- 动态分配：malloc+free
	- 随机访问，0(1)时间内找到第i个元素
	- 注意：代码中注意位序i和数组下表的区别
- 代码实例[[顺序表]]
- 链表
	- 数据域+指针域
	- 带头结点的链表更方便？
	- LinkList== * LinkNode，前者表示单链表，后者表示结点
```C
	// struct LNode *p= (struct LNode *)malloc(sizeof(struct LNode ));
	//sizeof Elemtype Alias;
	// sizeof struct LNode LNode;
	// sizeof struct LNode* LinkList
```

承上[[数据结构-DAY2]]



