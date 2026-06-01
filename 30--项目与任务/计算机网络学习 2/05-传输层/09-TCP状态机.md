# TCP 状态机

## 常见状态

- CLOSED：没有连接。
- LISTEN：服务端等待连接。
- SYN-SENT：客户端已发送 SYN。
- SYN-RECEIVED：服务端收到 SYN 并回复 SYN+ACK。
- ESTABLISHED：连接已建立。
- FIN-WAIT-1：主动关闭方已发送 FIN。
- FIN-WAIT-2：主动关闭方收到 FIN 的 ACK。
- CLOSE-WAIT：被动关闭方收到 FIN。
- LAST-ACK：被动关闭方发送 FIN 后等待 ACK。
- TIME-WAIT：主动关闭方等待旧报文消失。

## CLOSE_WAIT 过多

CLOSE_WAIT 过多通常表示应用程序没有正确关闭 socket。

## TIME_WAIT 过多

TIME_WAIT 是正常状态，但大量 TIME_WAIT 可能与短连接过多有关。

## 排查意义

通过 TCP 状态可以判断连接卡在建立、传输还是关闭阶段。

