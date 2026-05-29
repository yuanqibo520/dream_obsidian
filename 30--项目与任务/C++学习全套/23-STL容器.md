# STL 容器

## vector

连续动态数组，最常用。

```cpp
std::vector<int> nums = {1, 2, 3};
nums.push_back(4);
```

## list

双向链表，适合频繁在中间插入删除，但缓存局部性较差。

## map

有序键值表，基于红黑树。

```cpp
std::map<std::string, int> count;
count["cpp"] = 1;
```

## unordered_map

哈希键值表，平均查找更快，但无序。

## set

有序集合，元素不重复。

## 选择建议

- 默认用 `std::vector`。
- 需要键值查找用 `std::unordered_map` 或 `std::map`。
- 需要唯一集合用 `std::unordered_set` 或 `std::set`。

