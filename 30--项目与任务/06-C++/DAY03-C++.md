---
tags:
  - 计算机语言
created: 2026-04-06
---
# 类和对象
面向对象：分装、继承、多态

----
#### 封装
>class和struct的区别
>class默认的权限为私有，struct默认权限是公共
```C++
#include<iostream>
#include<string>

using namespace std;

class Name {
	//权限
	public :    //成员类内和类外都可以访问
	protected : //类内可以访问，类外不可以访问，子可访问父
	private :   //类内可以访问，类外不可以访问，个人私有
	//属性
	string name;
	//行为
	void print(string Name){
		name = Name;
	}
	////////////////////////
	public:
	int name_change(int Age)
	{
		name = Age ;
	}
	void print(){
		cout << age << end1;
	}
	private:
	string name ;
	int age = 18;
	string lover ;
	
	
};

int main()
{
	Name n ; //创建对象
	n.print ("yuanqibo")
	cout << n.string << end1; 
	return 0;
}
```
#### 对象的初始化和清理
>构造函数和析构函数，编译器自动提供，强制要求
>构造函数语法：类名（）{}
>	没有返回值不用类型
>	函数名和类名相同
>	有参数，可以函数重载
>	自动调用有且一次
>析构函数语法：~类名（）{}
>	 不可有参数
>普通构造和拷贝构造
>调用：
```C++
#include<iostream>
using namespace std;

class Person {
public:
	int age = 0;
	Person (){
		cout<< "构造无参函数调用"<<end1;
	}
	Person(int a ){
		age = a;
		cout<<"构造有参函数调用"<<end1;
	}
	~Person(){
		cout<<"析构函数调用"<<end1;
	}
	//拷贝函数
	Person(const Person &P)
	{
		//将所有属性拷贝
		age = P.age;
		cout<<"拷贝函数调用"<<end1;
	}
};

void test()
{
	//括号法
	//调用默认构造的时候，不要加（），编译器认为是一个函数的声明
	Person p1;
	Person p2(20);
	Person p3(p2);
	
	//显示法
	Person p1 = Person(20);
	Person p2 = Person(P1);
	//不要用拷贝构造函数 初始化匿名对象
	
	//隐式转换法
	Person p4 = 20;
	Person p5 = p4;
	
}

int main(){

	return 0;
}
```