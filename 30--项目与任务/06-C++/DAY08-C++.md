---
tags:
  - 计算机语言
created: 2026-04-12
---
#### 继承
>class son : Inheritance_style father 继承出来共性 编辑自身的个性
>	都不能继承父类的私有权限
>公共继承pubilc：子类继承父类之后，依旧为原父类权限
>保护继承pubilc：公共保护都变成了保护权限
>私有继承pubilc：公共保护都变成了私有权限
>父类中所有非静态成员属性都会被子类继承下去
>	eg：sizeof（son）=sizeof（father）+sizeof（sonself）
>	当创建子类对象，也会先调用父类的析构函数，后调用自己的析构函数
>当子类和父类出现同名成员包括静态变量和函数的处理方式
>	调用子类内成员，直接调用
>	调用父类内成员，使用
>	子类和父类重名函数，不可通过重载函数区别函数调用，依旧得加作用域
>	子类同名函数会直接隐藏掉所有的父类同名函数
>多继承语法
>class son : Inheritance_style father1，Inheritance_style father2，Inheritance_style father
>不建议使用多继承语法，多父类可能出现多同名类成员
>菱形继承
>	定义：两个派生类继承一个基类，一个派生类继承了上面的两个派生类
>	[[菱形继承.canvas]]
>	虚继承：关键字 virtual
>		class son : virtual Inheritance_style father
>		统一为共享为一份数据
```C++
#include<iostream>
#include<string>

using namespace std;

class person {
	public :
	
	void person (int age;string name){
		m_age = age;
		m_name = name;
	}
	int m_age;
	string m_name;
	
	void func(){
		cout<<"hello world"<<end1;
	}
	
	public:
	int a;
	
	protected:
	int b;
	
	private:
	int c;
};

class yuanbo : public person{
	public:
	
	void yuanbo (){
		a = 30; 
	}
	
	int a;
	
	void func(){
		cout<<"hello world"<<end1;
	}
};

void test()
{
	person p(20,zhangsan);
	yuanbo y;
	y->a = 10;
	y->b = 20 //父类继承以后依旧为保护权限 不能访问
	
	cout<<"a = "<<y.person::a<<end1;
	cout<<"a = "<< y.a <<end1;
	
	y.func();
	y.perosn::func();
}

int main(){
	test();
	return 0;
}
```