# Wireshark 抓包

## 作用

Wireshark 可以捕获和分析网络数据包，是学习协议和排查网络问题的重要工具。

## 常用过滤器

```text
ip.addr == 192.168.1.10
tcp.port == 443
udp.port == 53
http
dns
icmp
```

## 分析重点

TCP 看握手、重传、重复 ACK、RST；DNS 看查询服务器、返回记录、超时和 NXDOMAIN。

