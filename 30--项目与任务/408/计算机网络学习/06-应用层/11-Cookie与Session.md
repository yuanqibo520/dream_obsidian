# Cookie 与 Session

## 为什么需要它们

HTTP 是无状态协议。Cookie 和 Session 用于在多次请求之间维持用户状态。

## Cookie

Cookie 是服务器通过响应头写入浏览器的小段数据，浏览器后续请求会自动携带。

常见属性：Domain、Path、Expires、Max-Age、HttpOnly、Secure、SameSite。

## Session

Session 通常保存在服务端，客户端只保存 Session ID。

## 安全建议

登录态 Cookie 应开启 `HttpOnly` 和 `Secure`，并合理设置 `SameSite`。

