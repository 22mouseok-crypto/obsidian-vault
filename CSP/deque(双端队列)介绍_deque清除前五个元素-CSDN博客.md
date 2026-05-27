---
title: "deque(双端队列)介绍_deque清除前五个元素-CSDN博客"
source: "https://blog.csdn.net/qq_50285142/article/details/114079022"
author:
  - "[[成就一亿技术人!]]"
  - "[[hope_wisdom 发出的红包]]"
published:
created: 2026-05-25
description: "文章浏览阅读2.3w次，点赞21次，收藏25次。双端队列介绍_deque清除前五个元素"
tags:
  - "clippings"
---
## 4 deque

### 4.1 介绍

首尾都可插入和删除的队列为双端队列。

```cpp
//添加头文件
#include<deque>
//初始化定义
deque<int> dq;
cpp运行
```

### 4.2 方法函数

> 注意双端队列的常数比较大。

| 代码 | 含义 |
| --- | --- |
| `push_back(x)/push_front(x)` | 把 `x` 插入队尾后 / 队首 |
| `back()/front()` | 返回队尾 / 队首元素 |
| `pop_back() / pop_front()` | 删除队尾 / 队首元素 |
| `erase(iterator it)` | 删除双端队列中的某一个元素 |
| `erase(iterator first,iterator last)` | 删除双端队列中 `[first,last)` 中的元素 |
| `empty()` | 判断deque是否空 |
| `size()` | 返回deque的元素数量 |
| `clear()` | 清空deque |

### 4.3 注意点

deque可以进行排序

> 双端队列排序一般不用，感觉毫无用处，使用其他STL依然可以实现相同功能

```cpp
//从小到大
sort(q.begin(), q.end())
//从大到小排序
sort(q.begin(), q.end(), greater<int>());//deque里面的类型需要是int型
sort(q.begin(), q.end(), greater());
cpp运行
```

> 如要获取所有内容的PDF文件，请在公众号【行码棋】回复【STL】获取，非常抱歉了。  
> Update：2023-12-11更新PDF文件

微信公众号