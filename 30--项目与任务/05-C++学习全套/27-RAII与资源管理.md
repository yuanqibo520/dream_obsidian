# RAII 与资源管理

## 核心思想

RAII 是 Resource Acquisition Is Initialization 的缩写。它的思想是：资源在对象构造时获取，在对象析构时释放。

## 示例

```cpp
{
    std::ofstream file("log.txt");
    file << "hello\n";
}
```

离开作用域时，`file` 自动析构并关闭文件。

## 管理什么资源

- 内存。
- 文件句柄。
- 网络连接。
- 互斥锁。
- 数据库连接。

## 好处

- 避免资源泄漏。
- 遇到异常时也能自动清理。
- 让资源生命周期和对象生命周期一致。

## 建议

现代 C++ 程序应该大量依赖 RAII，而不是手写成对的 acquire/release。

