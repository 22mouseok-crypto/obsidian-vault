---
title: "C++ STL之tuple详解_stl tuple-CSDN博客"
source: "https://blog.csdn.net/qq_50285142/article/details/123000835"
author:
  - "[[成就一亿技术人!]]"
  - "[[hope_wisdom 发出的红包]]"
published:
created: 2026-05-25
description: "C++ STL中的tuple模板是pair的泛化，可封装不同类型任意数量的对象，可理解为pair的扩展，可声明二元组或三元组，等价为结构体使用。"
tags:
  - "clippings"
---
## 主页面目录

## 12 tuple

### 12.1 介绍

tuple 模板 是pair的泛化，可以封装不同 类 型任意数量的对象。

可以把tuple理解为pair的扩展，tuple可以声明二元组，也可以声明 三元组 。

tuple可以等价为 **结构体** 使用

**头文件**

```cpp
#include <tuple>
cpp运行1
```

### 12.2 声明初始化

声明一个空的 `tuple` 三元组

```cpp
tuple<int, int, string> t1;
cpp运行1
```

赋值

```cpp
t1 = make_tuple(1, 1, "hahaha");
cpp运行1
```

创建的同时初始化

```cpp
tuple<int, int, int, int> t2(1, 2, 3, 4);
cpp运行1
```

可以使用pair对象构造tuple对象，但tuple对象必须是两个元素

```cpp
auto p = make_pair("wang", 1);
tuple<string, int> t3 {p}; //将pair对象赋给tuple对象
cpp运行
```

### 12.3 元素操作

获取tuple对象 `t` 的第一个元素

```cpp
int first = get<0>(t);
cpp运行1
```

修改tuple对象 `t` 的第一个元素

```cpp
get<0>(t) = 1;
cpp运行1
```

### 12.4 函数操作

- 获取元素个数
```cpp
tuple<int, int, int> t(1, 2, 3);
cout << tuple_size<decltype(t)>::value << "\n"; // 3
cpp运行
```
- 获取对应元素的值

通过 `get<n>(obj)` 方法获取,`n` 必须为数字不能是变量

```cpp
tuple<int, int, int> t(1, 2, 3);
cout << get<0>(t) << '\n'; // 1
cout << get<1>(t) << '\n'; // 2
cout << get<2>(t) << '\n'; // 3
cpp运行
```
- 通过 `tie` 解包 获取元素值

`tie` 可以让tuple变量中的三个值依次赋到tie中的三个变量中

```cpp
int one, three;
string two; 
tuple<int, string, int> t(1, "hahaha", 3);
tie(one, two, three) = t;
cout << one << two << three << "\n"; // 1hahaha3
cpp运行
```

---

微信公众号