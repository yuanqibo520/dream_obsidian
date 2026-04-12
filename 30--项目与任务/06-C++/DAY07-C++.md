---
data: 2026-04-11
tags:
  - 计算机语言
---
#### 运算符重载
>➕运算符重载
>	成员函数重载本质调用：person p3 = p1.operatoer+(p2)
>	全局函数重载本质调用：person p3 = operatoer+(p1,p2)
>左移函数重载
>	全局函数重载本质调用:cout<< a <<end1;
```C++
#include<iostream>
using namespace std;

class person {
	friend ostream & operator <<(ostream &cout,person &person a);
	
	private :
	int m_a = 10;
	int m_b = 20;
};

//左移函数重载
ostream & operator <<(ostream &cout,person &person a){
	cout<<"a等于为"<<a->m_a<<"b等于为"<<a->m_b;
	return cout;
}

void test ()
{
	person a;
	cout<< a <<end1;
}

int main(){
	
	test();
	return 0;
}
```
>递增运算符重载
```C++
#include<iostream>
using namespace std;

class myinteger{
	friend ostream & operator <<(ostream &cout,myinteger myint);
	
	public;
	myinteger()
	{
		m_num = 0 ;
	}
	
	//使用引用，对同一个数据进行操作
	myinteger& operator ++(){
		m_num++;
		return *this;
	}
	
	//可以区分前置和后置递增
	//temp为临时变量，不需要一直对temp进行操作
	myinteger operator++ ( int ){
		myinteger temp = *this;
		m_num++；
		return temp;
	}
	
	private:
	int m_num ;
};

ostream & operator <<(ostream &cout,myinteger myint){
	cout<<"m_num等于为"<<myint->m_num;
	return cout;
}

void test(){
	myinteger myint;
	cout<< ++(++myint) <<end1;
	cout<< myint++ <<end1
}

int main(){
	test();
	return 0;
}

```
>赋值运算符 operator=，对属性进行值拷贝
```C++
#include<iostream>
using namespace std;

class person{
	pubilc:
	person (int age)
	{
		m_age = new int (age);
	}
	~person ()
	{
		if(m_age!=NULL)
		{
			delete m_age;
			m_age = NULL; 
		}
	}
	person & operator =(perosn &p){
		if(m_age!=NULL)
		{
			delete p->m_age;
			p->m_age = NULL; 
		}
		m_age = new int (*p->m_age);
		return *this;
	}
	int *m_age;
};

void test(){
	perosn p1(20);
	perosn p2(10);
	person p3;
	p3 = p1 = p2;
	cout<< "年龄是："<<p1->m_age<<end1;
	cout<< "年龄是："<<p2->m_age<<end1;
	cout<< "年龄是："<<p3->m_age<<end1;
}

int main (){
	test();
	return 0;
}
```
>关系运算符重载
```C++
#include<isotream>
using namespace std ;

class person{
public :
	person(string name;int age){
		m_name = name;
		m_age = age;
	}
	
	bool operator == (person &p){
		if(this->m_age==p->m_age&&this->m_name==p->m_name)
			return true;
		return false;
	}
	
	bool operator != (person &p){
		if(this->m_age!=p->m_age||this->m_name!=p->m_name)
			return false;
		return true;
	}
	
	string m_name;
	int m_age;
};

void test(){
	person p1(tom,18);
	person p2(tom,18);
	if(p2 == p1){
		cout<<"两个人是同一个人"<<end1;
	}
	if(p2 != p1){
		cout<<"两个人是同一个人"<<end1;
	}
}

int main(){
	test();
	return 0 ;
}
```
>函数调用运算符重载(仿函数)
>	匿名函数对象名（）
```C++
#include<iostream>
#include<string>

using namespace std;

class myprint {
pubilc :
	//重载函数调用运算符
	void operator()(string test){
		cout <<test <<end1;
	}
};

void test(){
	myprint myprint;
	myprint("hello,world");
}

int main(){
	test();
	return 0 ;
}
```