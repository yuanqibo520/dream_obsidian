---
tags:
  - 计算机语言
created: 2026-04-07
---
#### 拷贝构造函数调用时机
>使用一个已经创建完毕的对象来初始化另一个对象（创建对象进行初始化）
>值传递的方式给函数参数传值
>以值方式返回局部对象
#### 拷贝函数调用规则
>如果用户定义拷贝构造函数，编译器将不再添加别的构造函数
>如果用户定义有参构造函数，编译器将不再添加无参构造函数
#### 深构造和浅构造
>析构函数 ，将堆区开辟数据做释放操作
>利用拷贝函数会做浅拷贝，就是堆区内存重复释放，需要深拷贝
#### * 初始化列表
>eg：
```C++
#include<iostream>
using namespace std ;

class person {
	public:
	person (int age ;int year) : m_age(age),m_year(year)
	{
		
	}
	int m_age;
	int m_year;
};

void test()
{
	person p (18,06);
}
int main ()
{
	return 0;
}
```
#### 类对象作为类成员
>类似结构体嵌套结构体，先有学生再有老师
#### 静态成员
>静态成员变量 static
>	所有对象共享同一份数据
>	再编译截断分配内存
>	类内声明，类外初始化
>	有访问权限
>静态成员函数
>	所有对象共享同一个函数
>	静态成员函数只能访问静态成员变量，无法区分变量是哪个对象的
>	有访问权限
```C++
#include<iostream>
using namespace std;

class person {
	public :
	static void func(){
		cout << "yuanboshi daishuaige" <<end1;
		age = 100;
	}
	static int age ;
};

int person :: age = 18;

void test ()
{
	person p;
	//通过对象访问
	p.func();
	cout << p.age <<end1;//18
	//通过类名来访问对象
	cout<< person:: age <<end1;
	cout<< person:: func() <<end1;

}

int main(){
	test();
	system("pause");
	return 0;
}
```