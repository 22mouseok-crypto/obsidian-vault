---
title: "C++ STL之queue详解_c++ stl queue-CSDN博客"
source: "https://blog.csdn.net/qq_50285142/article/details/122304056"
author:
  - "[[成就一亿技术人!]]"
  - "[[hope_wisdom 发出的红包]]"
published:
created: 2026-05-25
description: "文章浏览阅读3.9w次，点赞50次，收藏69次。本文介绍C++STL之queue的讲解，会介绍queue的常用操作以及数组模拟方法_c++ stl queue"
tags:
  - "clippings"
---
## 返回主目录

## 3 queue

### 3.1 介绍

队列 是一种先进先出的数据结构。

```cpp
//头文件
#include<queue>
//定义初始化
queue<int> q;
cpp运行
```

### 3.2 方法 函数

| 代码 | 含义 |
| --- | --- |
| `q.front()` | 返回队首元素 |
| `q.back()` | 返回队尾元素 |
| `q.push(element)` | 尾部添加一个元素 `element` 进队 |
| `q.pop()` | 删除第一个元素 出队 |
| `q.size()` | 返回队列中元素个数，返回值类型 `unsigned int` |
| `q.empty()` | 判断是否为空，队列为空，返回 `true` |

### 3.3 队列 模拟

使用 `q[]` 数组模拟队列

`hh` 表示队首元素的下标，初始值为 `0`

`tt` 表示队尾元素的下标，初始值为 `-1` ，表示刚 **开始队列为空**

> 一般来说单调栈和单调队列写法均可使用额外变量 `tt` 或 `hh` 来进行模拟  
> 如有学习余力可学习 [单调队列详解](https://blog.csdn.net/qq_50285142/article/details/120245122)

```cpp
#include<bits/stdc++.h>
using namespace std;
const int N = 1e5 + 5;
int q[N];

int main() {
    int hh = 0,tt = -1;
//    入队 
    q[++tt] = 1;
    q[++tt] = 2; 
//    将所有元素出队 
    while(hh <= tt) {
        int t = q[hh++];
        printf("%d ",t);
    }
    return 0;
 } 
cpp运行1234567891011121314151617
```

### 3.4 队列模拟例题

题目链接： [https://atcoder.jp/contests/abc247/tasks/abc247\_d](https://atcoder.jp/contests/abc247/tasks/abc247_d)

```cpp
#include<bits/stdc++.h>
using namespace std;

using ll = long long ;
using pii = pair<int, int>;
const int N = 250005, mod = 998244353;

int q[N], num[N];

void solve() {
    int qq, hh = 0, tt = -1;
    cin >> qq;
    while(qq--) {
        int op;
        cin >> op;
        int x, c;
        if(op == 1) {
            cin >> x >> c;
            q[++tt] = c;
            num[tt] = x;
        } else {
            cin >> c;
            ll res = 0;
            while(c) {
                if(q[hh] > c) {
                    q[hh] -= c;
                    res += 1ll * c * num[hh];
                    break;
                } else {
                    res += 1ll * q[hh] * num[hh];
                    c -= q[hh++];
                }
            }
            cout << res << "\n";
        }
    }
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    int t;
    // cin >> t;
    t = 1;
    while(t--)
        solve();
    return 0;
}
cpp运行12345678910111213141516171819202122232425262728293031323334353637383940414243444546474849
```

> 如要获取所有内容的PDF文件，请在公众号【行码棋】回复【STL】获取，非常抱歉了。  
> Update：2023-12-11更新PDF文件

微信公众号