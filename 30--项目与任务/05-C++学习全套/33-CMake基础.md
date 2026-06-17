# CMake 基础

## 最小项目

目录结构：

```text
project/
  CMakeLists.txt
  main.cpp
```

`CMakeLists.txt`：

```cmake
cmake_minimum_required(VERSION 3.20)
project(MyApp LANGUAGES CXX)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

add_executable(my_app main.cpp)
```

## 构建

```bash
cmake -S . -B build
cmake --build build
```

## 添加库

```cmake
add_library(core src/core.cpp)
target_include_directories(core PUBLIC include)

add_executable(app src/main.cpp)
target_link_libraries(app PRIVATE core)
```

## 建议

现代 CMake 优先使用 target 相关命令，例如 `target_link_libraries`、`target_include_directories`。

