# JSON 与数据交换

## JSON 是什么

JSON 是一种常见的数据交换格式，常用于 API、配置文件和前后端通信。

## 字典转 JSON 字符串

```python
import json

user = {"name": "Alice", "age": 18}
text = json.dumps(user, ensure_ascii=False)
print(text)
```

## JSON 字符串转字典

```python
import json

text = '{"name": "Alice", "age": 18}'
user = json.loads(text)
print(user["name"])
```

## 写入 JSON 文件

```python
import json

data = {"items": [1, 2, 3]}

with open("data.json", "w", encoding="utf-8") as file:
    json.dump(data, file, ensure_ascii=False, indent=2)
```

## 读取 JSON 文件

```python
import json

with open("data.json", "r", encoding="utf-8") as file:
    data = json.load(file)
```

## CSV 简介

```python
import csv

with open("users.csv", "r", encoding="utf-8") as file:
    reader = csv.DictReader(file)
    for row in reader:
        print(row)
```

## 练习

1. 保存一组用户信息到 JSON 文件。
2. 从 JSON 文件读取数据并打印。
3. 读取 CSV 文件并统计行数。
