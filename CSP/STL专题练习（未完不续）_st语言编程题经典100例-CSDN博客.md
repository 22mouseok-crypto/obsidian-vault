---
title: STL专题练习（未完不续）_st语言编程题经典100例-CSDN博客
source: https://blog.csdn.net/qq_39940018/article/details/122533666
author:
published:
created: 2026-05-25
description: 文章浏览阅读6.8k次，点赞4次，收藏48次。STL专题的全部题目和知识点_st语言编程题经典100例
tags:
  - clippings
---
---

## pair

pair<数据类型，数据类型>变量名  
比如：pair<int, int> a  
加上初始化，pair<数据类型，数据类型>变量名（第一个数的值，第二个数的值）  
比如：pair<int, int> a (100, 5)  
调用pair内值时，前一个数为first，后一个数为second  
比如：a.first => 100 a.second => 5  
将两个数邦成 pair(第一个数，第二个数)  
比如：a = make ( pair(100, 5) ) 此时 a 与上面的 a 还是一样的

好用之处！！！  
在丢进 sort 时，不需要cmp，sort会直接按 first 排序，first相同就会用 second 排序  
作用相当于

```javascript
bool cmp(const DT&k, const DT&l) {
    if(k.first == l.first) return k.second < l.second;
    return k.first < l.first;
}
javascript1234
```

---

### 例题（主要运用：pair）： 字符串 排序

> [51nod 1874 字符串排序](http://www.51nod.com/Challenge/Problem.html#problemId=1874)  
> [题解](https://blog.csdn.net/qq_39940018/article/details/122543081)

---

## vector

vector<数据类型>变量名  
比如：vector< int >v

vector 就是个数组，但是是动态的，就是不用提前标需要多少，当需要存东西时，才会新建内存  
比如定义数组时一定要有下标，int a\[1000\]，long long b\[50000\]  
但是vector不需要

**vector的基本操作**  
![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/bfbb3718e4d834c2ad53b16936fd396e.png)  
**vector的遍历**

**vector的排序**  

---

### 例题一（主要运用：pair，vector）： 排队问题

> [51nod 2353 排队问题](http://www.51nod.com/Challenge/Problem.html#problemId=2353)  
> [题解](https://blog.csdn.net/qq_39940018/article/details/122543192)

---

### 例题二（主要运用：vector）：小明爱数列

> [51nod 3056 小明爱数列](http://www.51nod.com/Challenge/Problem.html#problemId=3056)  
> [题解](https://blog.csdn.net/qq_39940018/article/details/122543485)

---

### 例题三（主要运用：pair，vector）： 学习 委员候选人

> [51nod 3200 学习委员候选人](http://www.51nod.com/Challenge/Problem.html#problemId=3200)  
> [题解](https://blog.csdn.net/qq_39940018/article/details/122542685)

---

### 例题四（主要运用：vector）：最小约数 V2

> [51nod 2456 最小约数 V2](http://www.51nod.com/Challenge/Problem.html#problemId=2456)  
> [题解](https://blog.csdn.net/qq_39940018/article/details/122545754)

---

## map

```javascript
#include <bits/stdc++.h>

using namespace std;

int main() {
    //插入
    map<string, int> my_Map;
    my_Map["a"] = 1;  //最常用
    my_Map.insert(map<string, int>::value_type("b", 2));
    my_Map.insert(pair<string, int>("c", 3));
    my_Map.insert(make_pair<string, int>("d", 4));
    int x = my_Map["a"];
    cout << x << endl;
//**************************************************************
    //查找
    map<string, string> Map;
    Map["hello"] = "world";
    map<string, string>::iterator it;
    it = Map.find("hello");
    if(it != Map.end())
        cout << it -> second << endl;
//**************************************************************
    //指针遍历
    map<int, string> S;
    S[1] = "I";
    S[2] = "love";
    S[3] = "SSL";
    map<int, string>::iterator iter;
    for(iter = S.begin(); iter != S.end(); iter ++)
        cout << iter -> first << " " << iter -> second << endl;
//*********************************************
    //直接遍历
    int n = S.size();
    for(int I = 1; I <= n; I ++)
        cout << S[I] << endl;
}
javascript12345678910111213141516171819202122232425262728293031323334353637
```

---

### 例题一：（主要运用：map，vector，pair）和为k的连续区间

> [51nod 1094 和为k的连续区间](http://www.51nod.com/Challenge/Problem.html#problemId=1094)  
> [题解](https://blog.csdn.net/qq_39940018/article/details/122548047)

---

### 例题二：（主要运用：map）子集和判断

> [51nod 3202 子集和判断](http://www.51nod.com/Challenge/Problem.html#problemId=3202)  
> [题解](https://blog.csdn.net/qq_39940018/article/details/122552387)

---

### 例题三：（主要运用：map，pair）最近的一对

> [51nod 3059 最近的一对](http://www.51nod.com/Challenge/Problem.html#problemId=3059)  
> [题解](https://blog.csdn.net/qq_39940018/article/details/122553586?spm=1001.2014.3001.5502)