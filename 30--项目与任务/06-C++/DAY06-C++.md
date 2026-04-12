---
tags:
  - 计算机语言
created: 2026-04-09
---
#### 友元
>关键字friend
>实现方法：
>	全局函数做友元
>	类做友元
>	类内成员函数做友元
```C++
#include<iostream>
#include<string>

using namespace std;

class builiding ;

class goodgay{
	public :
	goodgay();
	
	void visit();
	building * building ;
};

class building {
	
	
	friend void Test(building *building);
	friend class goodgay;
	friend void goodgay::visit();
	
	public :
	void visit();
	buiding();
	
	public:
	string sittingroom;
	private :
	string bedroom;
};

//类外写成员函数
building :: builiding(){
	sittingroom = "客厅";
	bedroom = "卧室";
}

goodgay :: goodgay(){
	//创建建筑物对象，在堆区维护
	building = new builing;
}

vooid goodgay:: visit(){
	cout<< “好基友类正在访问：”<<building->sittingroom<<end1;
	
	cout<< “好基友类正在访问：”<<building->bedroom<<end1;
}

void Test(building *building){
	
	cout<< “好基友类正在访问：”<<building->sittingroom<<end1;
	
}

void test(){
	goodgay gg;
	buiding dd;
	gg.visit();
	Test(&dd);
}

int main (){
	test();
	return 0;
}
```

