# ICMP

## 作用

ICMP 用于网络层错误报告和诊断。

## 常见用途

- `ping` 使用 ICMP Echo Request 和 Echo Reply。
- `tracert` / `traceroute` 利用 TTL 和 ICMP 超时报文探测路径。

## 注意

ICMP 被防火墙屏蔽时，`ping` 不通不一定代表业务端口不通。

