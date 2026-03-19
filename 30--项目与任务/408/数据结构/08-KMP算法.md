```C
#include<stdio.h>
#define max_size 50

typedef struct SString{
	char ch[max_size];
	int length ;
}SString;

void InitSString(SString &S,SString &T)
{
	S.length=0;
	T.length=0;
}

void test()
{
	SString S,T;
	InitSString(S,T);
}

int Index_KMP(SString S,SString T,int next[] )
{
	int i = 0 ,int j = 0 ;
	while(i<=S.length;j<=T.length)
	{
		if (j==0||S.ch[i]==T.ch[j])
		{
			i++;
			j++;
		}
		else
		{
			j=next[j];
		}
	}
	if(j>T.length)
		return i-T.length;
	else
		return 0;
}

int main()
{
	int next [] = { 0 };
	//手动设计next数组内容，发生失配时j自动跳转至上比较区
	//设计哨站0位置
	test();
	int size = Index_KMP(S,T,next);
	printf("%d",size);
	return 0;
}
```