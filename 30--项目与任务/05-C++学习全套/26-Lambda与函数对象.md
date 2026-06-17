# Lambda 与函数对象

## Lambda 基本形式

```cpp
auto add = [](int a, int b) {
    return a + b;
};
```

## 捕获

```cpp
int factor = 2;
auto multiply = [factor](int x) {
    return x * factor;
};
```

- `[factor]`：按值捕获。
- `[&factor]`：按引用捕获。
- `[=]`：默认按值捕获。
- `[&]`：默认按引用捕获。

## 配合算法

```cpp
std::sort(items.begin(), items.end(), [](const Item& a, const Item& b) {
    return a.price < b.price;
});
```

## 函数对象

实现了 `operator()` 的对象也可以像函数一样调用。

```cpp
struct GreaterThan {
    int limit;
    bool operator()(int x) const {
        return x > limit;
    }
};
```

