---
tags:
  - 计算机语言
data: 2026-04-04
---
```C++
#include<iostream>
using namespace std;
{
	int a = 10;
	cout << !a <<end1; //0
	cout << a <<end1;  //1
	cout << "hello , C++" << end1;
	int a = 0;
	cin >> a;
	cout << "变量a的大小为："<< a << end1;
	system("pause");
	return 0;
}
```
- 数据类型
```C++
#字符串类型
#include<string>
 string <name> = "bady" ;
 
#布尔类型(1字节)
bool < name > = false/true;
#浮点型
float a = 3.14f(f修改系统默认指定为double)
```
- 三目运算符
	- 表达式1?表达式2:表达式3
	- 如果1真，返回2，如果1假，返回3
