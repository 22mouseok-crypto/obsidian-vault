---
title: "C++ STL之stack详解_c的stl里的stack会不会炸掉-CSDN博客"
source: "https://blog.csdn.net/qq_50285142/article/details/122303786"
author:
  - "[[成就一亿技术人!]]"
  - "[[hope_wisdom 发出的红包]]"
published:
created: 2026-05-25
description: "文章浏览阅读4.5w次，点赞74次，收藏129次。C++STL之stack栈的介绍，常用方法，模拟栈介绍_c的stl里的stack会不会炸掉"
tags:
  - "clippings"
---
## 返回主目录

## 2 stack

### 2.1 介绍

栈 为数据结构的一种，是STL中实现的一个先进后出，后进先出的容器。

```cpp
//头文件需要添加
#include<stack>

//声明
stack<int> s;
stack<string> s;
stack<node> s;//node是结构体类型
cpp运行
```

### 2.2 方法 函数

| 代码 | 含义 |
| --- | --- |
| `s.push(ele)` | 元素 `ele` 入栈，增加元素 |
| `s.pop()` | 移除栈顶元素 |
| `s.top()` | 取得栈顶元素（但不删除） |
| `s.empty()` | 检测栈内是否为空，空为真 |
| `s.size()` | 返回栈内元素的个数 |

### 2.3 栈遍历

#### 2.3.1 栈遍历

栈只能对栈顶元素进行操作，如果想要进行遍历，只能将栈中元素一个个取出来存在数组中

```cpp
stack<int> st;
for (int i = 0; i < 10; ++i) st.push(i);
while (!st.empty()) {
    int tp = st.top(); // 栈顶元素
    st.pop();
}
cpp运行
```

#### 2.3.2 数组 模拟 栈进行遍历

通过一个 **数组** 对栈进行模拟，一个存放下标的变量 `top` 模拟指向栈顶的 指针 。

> 一般来说单调栈和单调队列写法均可使用额外变量 `tt` 或 `hh` 来进行模拟  
> 单调栈可见： [单调栈详解](https://blog.csdn.net/qq_50285142/article/details/114833197)

**特点：** 比 `STL` 的 `stack` 速度更快，遍历元素方便

```cpp
int s[100]; // 栈 从左至右为栈底到栈顶
int tt = -1; // tt 代表栈顶指针,初始栈内无元素，tt为-1

for(int i = 0; i <= 5; ++i) {
    //入栈 
    s[++tt] = i;
}
// 出栈
int top_element = s[tt--]; 

//入栈操作示意
//  0  1  2  3  4  5  
//                tt
//出栈后示意
//  0  1  2  3  4 
//              tt
cpp运行12345678910111213141516
```

> 如要获取所有内容的PDF文件，请在公众号【行码棋】回复【STL】获取，非常抱歉了。  
> Update:2023-12-11更新PDF文件

微信公众号