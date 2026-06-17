# STL 算法

## sort

```cpp
std::sort(nums.begin(), nums.end());
```

## find

```cpp
auto it = std::find(nums.begin(), nums.end(), 42);
if (it != nums.end()) {
    std::cout << "found\n";
}
```

## transform

```cpp
std::transform(nums.begin(), nums.end(), nums.begin(), [](int x) {
    return x * 2;
});
```

## accumulate

```cpp
int sum = std::accumulate(nums.begin(), nums.end(), 0);
```

## 算法思想

标准算法让代码表达“做什么”，而不是手写循环表达“怎么做”。

## 建议

熟悉 `<algorithm>` 和 `<numeric>`，能显著提升代码质量。

