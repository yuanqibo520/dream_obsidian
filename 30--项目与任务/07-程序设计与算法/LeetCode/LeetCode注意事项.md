必须处理 `returnSize`、`returnColumnSizes`
函数返回的数组必须是 `malloc` 出来的
- **先看数据范围！**
	- 比如数组长度 1e4 以上，暴力 O (n²) 必超时
	- 长度 ≤1000，暴力一般能过