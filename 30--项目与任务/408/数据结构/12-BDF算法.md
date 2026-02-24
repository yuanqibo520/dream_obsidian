```C
#include<stdio.h>
#include<stdbool.h>

#define INFINTY
#define Maxsize 31
bool status[Maxsize];
typedef int EdgeType;
typedef char VertexType;

//邻接矩阵法
typedef struct {
	VertexType Vex[Maxsize];
	EdgeType Edge[Maxsize][Maxsize] = { 0 };
	int vexnum, arcnum;//当前已标记的顶点数、边数
}MGragh;

//静态链表结点
typedef struct LNode {
	EdgeType Vex;
	struct LNode* next;
}LNode ,*LinknodeList;
//邻接表法
typedef struct {
	VertexType Vex[Maxsize];
	LinknodeList L;
}Linked_Table[Maxsize];

//双端队列
typedef struct {
	int data[Maxsize];
	int front, rear;
}SqQueue;

void InitLinked_Table(Linked_Table* a)
{
	//a[0]->Vex[] = { "Placeholder" };
	for (int i = 0; i < Maxsize; i++)
	{
		a[i]->L = NULL;
	}
}
void InitMGragh(MGragh* b)
{
	b->vexnum = 0;
	b->arcnum = 0;
}
void InitSqQueue(SqQueue* Q)
{
	Q->rear = Q->front = 0;
	for (int i = 0; i < Maxsize; i++)
		Q->data[i] = 0;
}
void Visit(int mark, Linked_Table* a)
{
	printf("%s\n", a[mark]->Vex);
	status[mark + 1] = true;
}
void Enqueue(SqQueue* Q, int i)
{
	if ((Q->rear + 1) % Maxsize == Q->front)
		printf("队列满\n");
	else
	{
		Q->data[Q->rear] = i;
		Q->rear = (Q->rear++) % Maxsize;
	}
}
bool Is_empty (SqQueue* Q)
{
	return (Q->front == Q->rear);
}	
void Dequeue(SqQueue* Q, int* i)
{
	*i = Q->data[Q->front];
	Q->front = (Q->front++) % Maxsize;
}
int FistNeighber(Linked_Table* a, int i)
{
	if (a[i]->L != NULL)
		return a[i]->L->Vex;
	else
		return -1;
}
int OtherNeighber(Linked_Table* a, int i) 
{
	LinknodeList l = a[i]->L->next;
	if(!status[l->Vex]&&l!=NULL)
		return l->Vex;
	return -1;
}
void BFS(Linked_Table *a, int i, SqQueue* Q)
{
	Visit(i, a);
	Enqueue(Q, i);
	while (!Is_empty(Q)){
		int k = 0;
		Dequeue(Q, &k);
		for(int i=FistNeighber(a,k);i>0;i=OtherNeighber(a,k))
		{
			if (!status[i])
			{
				Visit(i, a);
				Enqueue(Q, i);
			}
		}
	}
}
void Visit(int mark, MGragh* b)
{
	printf("%s\n", b->Vex[mark]);
	status[mark] = true;
}
int FistNeighber(MGragh* b, int c)
{
	for (int i = 0; i < b->arcnum; i++)
	{
		if (b->Edge[c][i] == 1 && !status[i])
			return i;	
		else
			return -1;
	}
}
int OtherNeighber(MGragh* b, int c)
{
	for (int i = c; i < b->arcnum; i++)
	{
		if (b->Edge[c][i] == 1 && !status[i])
			return i;
		else
			return -1;
	}
}
void BFS1(MGragh* b, int i, SqQueue* Q)
{
	Visit(i, b);
	Enqueue(Q, i);
	while (!Is_empty(Q)) {
		int k = 0;
		Dequeue(Q, &k);
		int temp = 0;
		for (int i = FistNeighber(b, k); i > 0; i= OtherNeighber(b, temp))
		{
				Visit(i, b);
				Enqueue(Q, i);
				temp = i;
		}
	}
}
void BFSTreverse(Linked_Table* a, int vexnum , SqQueue* Q)
{
	int mark = 0;
	scanf("%d", &mark);
	for (int i = 1; i < Maxsize; i++)
		status[i] = false;
	for (int i = 1; i < vexnum; i++)
	{
		if (!Is_empty(Q))
			BFS(a,i,Q);
	}
}//链接表

void BFSTreverse1(MGragh* b,SqQueue* Q)
{
	int mark = 0;
	scanf("%d", &mark);
	for (int i = 1; i < Maxsize; i++)
		status[i] = false;
	for (int i = 1; i < b->vexnum; i++)
	{
		if (!Is_empty(Q))
			BFS1(b, i, Q);
	}
}//临近矩阵法
int main()
{
	SqQueue Q;
	Linked_Table a;
	MGragh b;
	InitMGragh(&b);
	InitLinked_Table(&a);
	InitSqQueue(&Q);
	int vexnum = 0;
	scanf("%d", &vexnum);
	//当前已标记的顶点数、边数//要求遍历是已存入的邻接矩阵法和邻接表
	BFSTreverse( &a, vexnum, &Q);
	BFSTreverse1(&b, &Q);
	return 0;
}
```