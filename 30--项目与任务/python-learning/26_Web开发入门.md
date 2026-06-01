# Web 开发入门

## Web 基本概念

- 客户端：浏览器、App。
- 服务端：处理请求并返回响应。
- HTTP：客户端和服务端通信协议。
- API：程序之间交换数据的接口。

## Flask 示例

安装：

```bash
pip install flask
```

代码：

```python
from flask import Flask, jsonify

app = Flask(__name__)

@app.get("/")
def home():
    return jsonify({"message": "hello"})

if __name__ == "__main__":
    app.run(debug=True)
```

## FastAPI 示例

安装：

```bash
pip install fastapi uvicorn
```

代码：

```python
from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def home():
    return {"message": "hello"}
```

运行：

```bash
uvicorn main:app --reload
```

## REST API 常见方法

- `GET`：查询
- `POST`：创建
- `PUT`：整体更新
- `PATCH`：部分更新
- `DELETE`：删除

## 练习

1. 写一个返回用户列表的 API。
2. 写一个接收 JSON 的 POST 接口。
3. 用 requests 调用自己写的接口。
