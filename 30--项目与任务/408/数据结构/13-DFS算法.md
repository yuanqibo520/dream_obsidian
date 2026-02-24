```C
#include<stdio.h>
#define Maxsize 100
bool Visited[Maxsize]
void DFS(Graph *G,int a )
{
	Visit(a);
	Visited[a]=true;
	for(int i =FirstNeighber(G,i);i>=0;i=NextNeighber(G,i))
	{
		if(!Visited(i))
			DFS(G,i);
	}
}
void DFSTraserve(Graph G){
	for(int i = 0;i<G.vexnum; i++)
	{
		Visited[i]=false;
	}
	for(int i =0;i<G.vexnum;i++)
	{
		if(!Visited[i])DFS(G,i);
	}
}
int main()
{
	
	return 0;
}
```
（DFS和BFS有雷同部分，部分函数实现查看BFS算法）[[12-BDF算法]]
