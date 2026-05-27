---
title: "bitset详解-CSDN博客"
source: "https://blog.csdn.net/qq_50285142/article/details/114186789"
author:
  - "[[成就一亿技术人!]]"
  - "[[hope_wisdom 发出的红包]]"
published:
created: 2026-05-25
description: "文章浏览阅读1.6w次，点赞34次，收藏79次。bitset常见用法详解_bitset"
tags:
  - "clippings"
---
## 主页面目录

## 10 bitset

### 10.1 介绍

bitset 在 bitset 头文件中，它 类 似数组，并且每一个元素只能是０或１，每个元素只用１bit空间

```cpp
//头文件
#include<bitset>
cpp运行
```

### 10.2 初始化定义

初始化方法

| 代码 | 含义 |
| --- | --- |
| `bitset<n> a` | a有n位，每位都为0 |
| `bitset<n> a(b)` | a是unsigned long型u的一个副本 |
| `bitset<n> a(s)` | a是string对象s中含有的位串的副本 |
| `bitset<n> a(s,pos,n)` | a是s中从位置pos开始的n个位的副本 |

> 注意： `n` 必须为常量表达式

演示 代码 ：

```cpp
#include<bits/stdc++.h>
using namespace std;
int main() {
    // 1 无参构造
    bitset<4> bitset1;  //无参构造，长度为４，默认每一位为０
    
    // 2 有参构造：数字作为参数
    bitset<9> bitset2(12); //长度为9，将该数转化为二进制保存，前面用０补充
    // 或此写法 bitset<9> bitset2({12});

    // 3 有参构造：string字符串作为参数        
    string s = "100101";
    bitset<10> bitset3(s); //长度为10，前面用 0 补充

    // 4 有参构造：char字符数组（字符串）作为参数            
    char s2[] = "10101";
    bitset<13> bitset4(s2); //长度为13，前面用 0 补充
    
    cout << bitset1 << endl; //0000
    cout << bitset2 << endl; //000001100
    cout << bitset3 << endl; //0000100101
    cout << bitset4 << endl; //0000000010101
    return 0;
}
cpp运行123456789101112131415161718192021222324
```

---

### 10.3 特性

`bitset` 可以进行 **位操作**

```cpp
bitset<4> foo (string("1001"));
bitset<4> bar (string("0011"));

cout << (foo ^= bar) << endl;// 1010 (foo对bar按位异或后赋值给foo)

cout << (foo &= bar) << endl;// 0001 (按位与后赋值给foo)

cout << (foo |= bar) << endl;// 1011 (按位或后赋值给foo)

cout << (foo <<= 2) << endl;// 0100 (左移2位，低位补0，有自身赋值)

cout << (foo >>= 1) << endl;// 0100 (右移1位，高位补0，有自身赋值)

cout << (~bar) << endl;// 1100 (按位取反)

cout << (bar << 1) << endl;// 0110 (左移，不赋值)

cout << (bar >> 1) << endl;// 0001 (右移，不赋值)

cout << (foo == bar) << endl;// false (1001==0011为false)

cout << (foo != bar) << endl;// true  (1001!=0011为true)

cout << (foo & bar) << endl;// 0001 (按位与，不赋值)

cout << (foo | bar) << endl;// 1011 (按位或，不赋值)

cout << (foo ^ bar) << endl;// 1010 (按位异或，不赋值)
cpp运行12345678910111213141516171819202122232425262728
```

**访问**

```cpp
//可以通过 [] 访问元素(类似数组)，注意最低位下标为0，类似于数的二进制表示，如下：
bitset<4> f("1011"); 
for (int i = 0; i < 4; ++i) {
    cout << f[i];
} // 输出1101
cpp运行12345
```

注意： bitset访问时候是从右边（最低位）开始访问的，但是左右移位的时候还是按照原来的形式左右移位的

---

### 10.4 方法 函数

| 代码 | 含义 |
| --- | --- |
| `b.any()` | b中是否存在置为1的二进制位，有 返回true |
| `b.none()` | b中是否没有1，没有 返回true |
| `b.count()` | b中为1的个数 |
| `b.size()` | b中二进制位的个数 |
| `b.test(pos)` | 测试b在pos位置是否为1，是 返回true |
| `b[pos]` | 返回b在pos处的二进制位 |
| `b.set()` | 把b中所有位都置为1 |
| `b.set(pos)` | 把b中pos位置置为1 |
| `b.reset()` | 把b中所有位都置为0 |
| `b.reset(pos)` | 把b中pos位置置为0 |
| `b.flip()` | 把b中所有二进制位取反 |
| `b.flip(pos)` | 把b中pos位置取反 |
| `b.to_ulong()` | 用b中同样的二进制位返回一个unsigned long值 |

### 10.5 bitset 优化

一般会使用bitset来优化时间复杂度，大概时间复杂度会除64或32，例如没有优化的时间复杂度为 ，使用bitset优化后复杂度可能就为

bitset还有开动态空间的技巧，bitset常用在 `01背包` 优化等算法中

```cpp
// 动态长度bitset实现
const int N = 1e6 + 5; // 开空间的上限，一般为数据范围附近的值
template <int len = 1>
void bitset_(int sz) { // sz即为想要开的大小
    if (len < sz) { bitset_<min(len * 2, N)>(sz); return; }
    bitset<len + 1> dp;
    // 具体算法的实现
}
cpp运行12345678
```

> 如要获取所有内容的PDF文件，请在公众号【行码棋】回复【STL】获取，非常抱歉了。  
> Update：2023-12-11更新PDF文件

微信公众号