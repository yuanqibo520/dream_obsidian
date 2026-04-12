---
tags:
  - 计算机语言
created: 2026-04-08
---
#### 成员变量和成员函数分开存储
>只有非静态成员变量才是类的对象
>空对象占用1个字节
#### this指针概念
>每个非静态成员函数只会诞生一份函数实例，多个同类型的对象会共用一块代码
>this指针不需要定义，直接使用即可
>用途：
>	解决形参和局部变量的名称冲突，
>	返回对象本身* this
#### 空指针访问成员函数
>空指针调用成员变量导致编译器奔溃用if
```C++
#include<iostream>
using namespace std;

class person{
	public:
	void personadd(int age)
	{
		this -> age = age ;
	}
	person & personadd (person & p){
		this->age += p->age;
		return * this ;
	}
	void Person (){
		if(this == NULL)
		return ;
		cout<<"MY_NAME:"<< this->age << end;
	}
	int age ;
};

void test(){
	person p(10);
	person p1(10) ;
	
	p1.personadd(p1)
	cout << p->age << end 1;//10
	
	p1.personadd(p1).personadd(p1).personadd(p1).personadd(p1);
	cout << p1.age << end 1; //40
	
	person *p = NULL;
	p.Person
}

int main()
{
	test();
	return 0;
}
```
#### const修饰成员函数为常函数
>常函数
>	this的本质 是指针常量 指针的指向是不可以修改的
>	在成员函数后面加const，修饰的是this指针，让指针指向的值也不可以修改
>	变量类型前添加mutable，常函数中即可再次被修改
>常对象
>	常对象只能调用特殊函数和常函数
>	声明对象前加const该对象为常对象

```C++
#include<iostream>
using namespace std;

class person {
	public :
	void Showperson () const
	{
		//this->a = 10;
		this->b =10;
	}
	int a = 10;
	mutable int b = 20; //特殊变量
};

void test(){
	person p;
	const person P;
	P->b = 10;
	//P->a = 20;
}

int main ()
{
	test();
	return 0;
}
```