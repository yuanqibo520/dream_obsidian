---
tags:
  - 计算机语言
created: 2026-04-05
---
#### 程序的内存模型
1. 代码区：存放函数体的二进制代码，由操作系统进行管理：共享和只读
2. 全局区：存放全局变量和静态变量及变量：static
3. 栈区：由编译器自动分配释放，存放函数的参数值，局部变量等
4. 堆区：由程序员分配和释放
```C++
#include<iostream>
using namespace std;

//栈区
int *func(){
	int p = 10;
	return *p;
}

//堆区
int *func(){
	int *p = new int (10); //利用关键字new将数据开辟到堆区，返回的时该类型的指针
	return *p;
}
int main()
{
	int *p = func();
	cout<< *p <<end1; //第一次 栈区 堆区 10
	cout<< *p <<end1; //第二次 栈区 随机
	delete p;
	return 0;
}
```
---
#### 引用
1. 初始化，起别名，不可修改为别的变量别名
2. 如果放回值是引用，这个函数调用可以作为左值
3. 函数引用
4. 等价指针常量
```C++
#include<iostream>
using namespace std;

void change(int  &a ; int &b)
{
	int temp = a;
	a = b ;
	b = temp;
}
int & test(){
	int a = 10 ; 
	return a ;
}
int main()
{
	int a = 10;
	int & b = a;
	b = 20;
	cout<< a <<end1; //20
	
	int a = 1, b = 2;
	change (a,b);
	cout<< a << b <<end1;
	
	int & ref = test();
	cout << ref <<end1; //10
	test() = 100;
	cout << ref <<end1;//100
	return 0;
}
```
---
#### * 函数提高
1. 设置默认值
	1. 如果某个位置已经有了默认参数，那么从这个位置往后，从左到右必须要有默认值
	2. 函数声明和函数实现只能由一个默认参数
2. 函数重载
	1. 条件：类型/个数/顺序不同，针对形参
	2. 同一作用域

```C++
#include<iostream>
using namespace std;

int func(int a = 10 ;int b = 20 ;int c = 30)
{
	return a+b+c;
}

int main (){
	cout << func()<<end1; //60
	cout<< func(20)<<end1; //70
	return 0;
}
```