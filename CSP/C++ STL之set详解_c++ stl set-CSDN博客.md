---
title: "C++ STL之set详解_c++ stl set-CSDN博客"
source: "https://blog.csdn.net/qq_50285142/article/details/122304728"
author:
  - "[[成就一亿技术人!]]"
  - "[[hope_wisdom 发出的红包]]"
published:
created: 2026-05-25
description: "文章浏览阅读4.2w次，点赞71次，收藏120次。C++ STL之set详解，介绍set的方法及特性_c++ stl set"
tags:
  - "clippings"
---
## 返回STL主目录

## 7 set

### 7.1 介绍

set容器中的元素不会重复，当插入集合中已有的元素时，并不会插入进去，而且set容器里的元素自动从小到大排序。

即：set里面的元素 **不重复 且有序**

```cpp
//头文件
#include<set>
//初始化定义
set<int> s;
cpp运行
```
- 拷贝初始化
```cpp
set<int> a = {1, 3, 5}; // 初始化指定元素
set<int> b(a);
// set<int> b = a; // b和a一样，同样是拷贝初始化
cpp运行
```

### 7.2 函数方法

| 代码 | 复杂度 | 含义 |
| --- | --- | --- |
| `s.begin()` |  | 返回set容器的第一个元素的地址（迭代器） |
| `s.end()` |  | 返回set容器的最后一个元素的下一个地址（迭代器） |
| `s.rbegin()` |  | 返回逆序迭代器，指向容器元素最后一个位置 |
| `s.rend()` |  | 返回逆序迭代器，指向容器第一个元素前面的位置 |
| `s.clear()` |  | 删除set容器中的所有的元素,无返回值 |
| `s.empty()` |  | 判断set容器是否为空 |
| `s.insert(element)` |  | 插入一个元素 |
| `s.size()` |  | 返回当前set容器中的元素个数 |
| `erase(iterator)` |  | 删除定位器iterator指向的值 |
| `erase(first, second）` |  | 删除定位器first和second之间的值 |
| `erase(key_value)` |  | 删除键值key\_value的值 |
| 查找 |  |  |
| `s.find(element)` |  | 查找set中的某一元素，有则返回该元素对应的迭代器，无则返回结束迭代器 |
| `s.count(element)` |  | 查找set中的元素出现的个数，由于set中元素唯一，此函数相当于查询element是否出现 |
| `s.lower_bound(k)` |  | 返回大于等于k的第一个元素的迭代器 |
| `s.upper_bound(k)` |  | 返回大于k的第一个元素的迭代器 |

### 7.3 元素访问

- **迭代器访问**
```cpp
for(set<int>::iterator it = s.begin(); it != s.end(); it++)
    cout << *it << " ";
cpp运行
```
- **智能指针**
```cpp
for(auto i : s)
    cout << i << endl;
cpp运行
```
- **访问最后一个元素**
```cpp
//第一种
cout << *s.rbegin() << endl;
cpp运行
```
```cpp
//第二种
set<int>::iterator iter = s.end();
iter--;
cout << (*iter) << endl; //打印2;
cpp运行
```
```cpp
//第三种
cout << *(--s.end()) << endl;
cpp运行
```

---

### 7.4 重载<运算符

- **基础数据类型**

方式一：改变set排序规则，set中默认使用less比较器，即从小到大排序。（常用）

```cpp
set<int> s1; // 默认从小到大排序
set<int, greater<int> > s2; // 从大到小排序
cpp运行
```

方式二：重载运算符。（很麻烦，不太常用，没必要）

```cpp
//重载 < 运算符
struct cmp {
    bool operator () (const int& u, const int& v) const {
       // return + 返回条件
       return u > v;
    }
};
set<int, cmp> s; 

for(int i = 1; i <= 10; i++)
    s.insert(i);
for(auto i : s)
    cout << i << " ";
// 10 9 8 7 6 5 4 3 2 1
cpp运行1234567891011121314
```

方式三：初始化时使用匿名函数定义比较规则

```cpp
set<int, function<bool(int, int)>> s([&](int i, int j){
    return i > j; // 从大到小
});
for(int i = 1; i <= 10; i++)
    s.insert(i);
for(auto x : s)
    cout << x << " ";
cpp运行1234567
```
- **高级数据类型（结构体）**

直接重载结构体运算符即可，让结构体可以比较。

```cpp
struct Point {
    int x, y;
    bool operator < (const Point &p) const {
        // 按照点的横坐标从小到大排序,如果横坐标相同,纵坐标从小到大
        if(x == p.x)
            return y < p.y;
        return x < p.x;
    }
};

set<Point> s;
for(int i = 1; i <= 5; i++) {
    int x, y;
    cin >> x >> y;
    s.insert({x, y});
}    
/* 输入
5 4
5 2
3 7
3 5
4 8
*/

for(auto i : s)
    cout << i.x << " " << i.y << "\n";
/* 输出
3 5
3 7
4 8
5 2
5 4
*/
cpp运行123456789101112131415161718192021222324252627282930313233
```

### 7.5 multiset

`multiset` ：元素可以重复，且元素有序

- 注意点一：方法函数基本和 `set` 一样，参考set即可。
- 注意点二：进行删除操作时，要明确删除目标。（ `s` 为声明的multiset变量名）
	删除多个元素：由于元素可以重复，注意使用 `s.erase(val)` 方法时，会删除掉所有与 `val` 相等的元素
	删除一个元素：需要删除一个元素时，需要使用 `s.erase(s.find(val))` 操作，先找到一个与 `val` 相等的元素迭代器，专门删除这个元素
- 注意点三：头文件操作为 `#include<set>`

`unordered_set` ：元素无序且只能出现一次

`unordered_multiset` ：元素无序可以出现多次

微信公众号