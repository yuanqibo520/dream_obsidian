---
tags:
  - 计算机语言
data: 2026-01-14
---
```C
#include<stdio.h>
int main()
{
	char arr[]={"abccdf"};
	printf("%d\n",strlen(*arr/arr[1]));//err
	printf("%d\n",strlen(&arr+1));//随机值
	char* p={"abccdf"};
	printf("%d\n",strlen(&p));//随机值
	printf("%d\n",sizeof(p));//4或8
	char arr[]={'a','b','c','d','e','f'};
	printf("%d\n",sizeof(arr));//7
	printf("%d\n",sizeof(arr+0));//4或8
	printf("%d\n",sizeof(&arr[0]+1));//4或8
	printf("%d\n",strlen(arr));//随机值
	printf("%d\n",strlen(&arr));//随机值
	printf("%d\n",strlen(&arr+1));//随机值-6
	printf("%d\n",strlen(&arr[0]+1));//随机值-1
	int a[3][4]={0};
	printf("%d\n",sizeof(a[0]+1));//4或8
	printf("%d\n",sizeof(a+1));//16
	printf("%d\n",sizeof(*(a[0]+1)));//4
	printf("%d\n",sizeof(*a[0]+1));//16第二行的地址
	printf("%d\n",sizeof(a[3]));//16
	printf("%d\n",);
	printf("%d\n",);
	int a[5][5]={};
	int (*p) [4];
	p=a;
	printf("%p,%d",&p[4][2]-&a[4][2],&p[4][2]-&a[4][2]);
	return 0;
}
```