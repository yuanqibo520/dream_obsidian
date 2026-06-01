---
tags:
  - 计算机语言
created: 2026-05-31
---
### 函数对象
>概念：重载函数调用操作符的类
>特点：
>	函数对象在使用时，可以像普通函数那样调用，可以有参数，可以有返回值
>	函数对象超出普通函数的概念，函数对象可以有自己的状态
>	函数对象可以作为参数传递


#### 谓词
>返回bool类型的仿函数成为谓词
>如果接受二个参数，那么叫做二元谓词

#### 内建函数对象
```C++
#include<functional>
#include<iostream> 
using namespace std;

int main(){
###算法仿函数
	//加法仿函数
	plus<T>;
	//减法仿函数
	minus<T>;
	//乘法仿函数
	multiplies<T>;
	//除法仿函数
	divides<T>;
	//取模仿函数
	modulus<T>;
	//取反仿函数
	nagate<T>;
###关系仿函数
	//等于
	bool equal_to<T>;
	bool not_equal_to<T>;
	//大于
	bool greater<T>;
	bool greator_equal<T>;
	//小于
	bool less<T>;
	bool less_equal<T>;
###逻辑仿函数
	//逻辑和/或/非
	bool logical_and<T>;
	bool logical_or<T>;
	bool logical_not<T>;
	return 0;
}
```
### 常用算法
>概述：头文件< algprithm >，< numeric >，< functional >

```C++
#include<iostream>
using namespace std;
int main(){
	###遍历
	for_each(iterator beg,iterator end,_func);
	//_func函数或者函数对象
	###搬运
	transform(iterator beg1,iterator end1,iterator beg2,_func);
	//目标容器需要提起开辟空间
	###查找算法
	find(iterator beg,iterator end,value);
	find_if(iterator beg,iterator end,_Pred);
	//_Pred函数或者谓词（返回bool类型的仿函数）
	adjacent_find
	binary_search
	count
	count_if
	return 0;
}
```





