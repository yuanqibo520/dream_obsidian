# STL 代码实例

本文件用于练习容器、迭代器、算法、Lambda 和常见数据处理写法。

## 示例 1：vector 排序与筛选

```cpp
#include <algorithm>
#include <iostream>
#include <vector>

int main() {
    std::vector<int> nums = {5, 1, 9, 3, 7, 2};

    std::sort(nums.begin(), nums.end());

    for (int n : nums) {
        if (n % 2 == 1) {
            std::cout << n << ' ';
        }
    }
    std::cout << '\n';
}
```

检查点：

- 能把排序改成从大到小。
- 能统计奇数个数。

## 示例 2：map 词频统计

```cpp
#include <iostream>
#include <map>
#include <string>

int main() {
    std::map<std::string, int> counts;
    std::string word;

    while (std::cin >> word) {
        ++counts[word];
    }

    for (const auto& [key, value] : counts) {
        std::cout << key << ": " << value << '\n';
    }
}
```

检查点：

- 能解释 `counts[word]` 在 key 不存在时会发生什么。
- 能改成 `std::unordered_map` 并观察输出顺序。

## 示例 3：set 去重

```cpp
#include <iostream>
#include <set>
#include <vector>

int main() {
    std::vector<int> nums = {3, 1, 2, 3, 2, 4, 1};
    std::set<int> unique_nums(nums.begin(), nums.end());

    for (int n : unique_nums) {
        std::cout << n << ' ';
    }
    std::cout << '\n';
}
```

检查点：

- 能解释为什么输出是有序的。
- 能用 `std::unordered_set` 改写。

## 示例 4：algorithm 与 Lambda

```cpp
#include <algorithm>
#include <iostream>
#include <string>
#include <vector>

struct Book {
    std::string title;
    int pages;
};

int main() {
    std::vector<Book> books = {
        {"C++ Primer", 900},
        {"Clean Code", 450},
        {"STL Guide", 320}
    };

    std::sort(books.begin(), books.end(), [](const Book& a, const Book& b) {
        return a.pages < b.pages;
    });

    auto it = std::find_if(books.begin(), books.end(), [](const Book& book) {
        return book.pages > 400;
    });

    if (it != books.end()) {
        std::cout << it->title << '\n';
    }
}
```

检查点：

- 能解释 Lambda 的参数和返回值。
- 能改成按书名排序。

## 示例 5：transform 与 accumulate

```cpp
#include <algorithm>
#include <iostream>
#include <numeric>
#include <vector>

int main() {
    std::vector<int> nums = {1, 2, 3, 4, 5};
    std::vector<int> squares(nums.size());

    std::transform(nums.begin(), nums.end(), squares.begin(), [](int n) {
        return n * n;
    });

    int sum = std::accumulate(squares.begin(), squares.end(), 0);

    for (int n : squares) {
        std::cout << n << ' ';
    }
    std::cout << "\nsum = " << sum << '\n';
}
```

检查点：

- 能解释 `squares.begin()` 为什么必须有足够空间。
- 能改成计算立方和。

## 示例 6：文件读取统计

```cpp
#include <fstream>
#include <iostream>
#include <string>

int main() {
    std::ifstream file("input.txt");
    if (!file) {
        std::cerr << "failed to open input.txt\n";
        return 1;
    }

    int lines = 0;
    int chars = 0;
    std::string line;

    while (std::getline(file, line)) {
        ++lines;
        chars += static_cast<int>(line.size());
    }

    std::cout << "lines = " << lines << '\n';
    std::cout << "chars = " << chars << '\n';
}
```

检查点：

- 能解释为什么要检查 `if (!file)`。
- 能增加单词数量统计。

