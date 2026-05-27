---
title: vector动态数组
source: https://blog.csdn.net/qq_50285142/article/details/122303529
author:
  - "[[成就一亿技术人!]]"
  - "[[hope_wisdom 发出的红包]]"
published:
created: 2026-05-25
description: 文章浏览阅读10w+次，点赞624次，收藏1k次。本文介绍了STL的vector的常用操作以及相关的注意事项_c++ stl vector
tags:
  - clippings
---
## 返回主目录

> Update：2023-08-21更新部分内容和排版  
> Update：2023-12-11更新部分内容和PDF文件

## 1 vector

### 1.1 介绍

#### 1.1.1 简介

`vector` 为可变长数组（动态数组），定义的 `vector` 数组可以随时添加数值和删除元素。

> 注意： **在局部区域中（比如局部函数里面）开vector数组，是在堆空间里面开的。**
> 
> 在局部区域开数组是在栈空间开的，而栈空间比较小，如果开了非常长的数组就会发生爆栈。
> 
> 故局部区域 **不可以** 开大长度数组，但是可以开大长度 `vector` 。

包含头文件：

```cpp
#include <vector>
cpp运行1
```

#### 1.1.2 初始化

- 一维初始化：
	```cpp
	vector<int> a; //定义了一个名为a的一维数组,数组存储int类型数据
	vector<double> b; //定义了一个名为b的一维数组，数组存储double类型数据
	vector<node> c; //定义了一个名为c的一维数组，数组存储结构体类型数据，node是结构体类型
	cpp运行123
	```
	指定 **长度** 和 **初始值** 的初始化
	```cpp
	vector<int> v(n); // 定义一个长度为n的数组，初始值默认为0，下标范围[0, n - 1]
	vector<int> v(n, 1); // v[0] 到 v[n - 1]所有的元素初始值均为1
	//注意：指定数组长度之后（指定长度后的数组就相当于正常的数组了）
	cpp运行123
	```
	初始化中有多个元素
	```cpp
	vector<int> a{1, 2, 3, 4, 5};//数组a中有五个元素，数组长度就为5
	cpp运行1
	```
	拷贝初始化
	```cpp
	vector<int> a(n + 1, 0);
	vector<int> b(a); // 两个数组中的类型必须相同,a和b都是长度为n+1，初始值都为0的数组
	vector<int> c = a; // 也是拷贝初始化,c和a是完全一样的数组
	cpp运行123
	```
- 二维初始化  
	定义第一维固定长度为 `5` ，第二维可变化的二维数组
	```cpp
	vector<int> v[5];//定义可变长二维数组
	//注意：行不可变（只有5行）, 而列可变,可以在指定行添加元素
	//第一维固定长度为5，第二维长度可以改变
	cpp运行123
	```
	> `vector<int> v[5]` 可以这样理解：长度为5的v数组，数组中存储的是 `vector<int> ` 数据类型，而该类型就是数组形式，故 `v` 为二维数组。其中每个数组元素均为空，因为没有指定长度，所以第二维可变长。可以进行下述操作：
	> 
	> ```cpp
	> v[1].push_back(2);
	> v[2].push_back(3);
	> cpp运行
	> ```
	行列均可变
	```cpp
	//初始化二维均可变长数组
	vector<vector<int>> v;//定义一个行和列均可变的二维数组
	cpp运行
	```
	> 应用：可以在 `v` 数组里面装多个数组
	> 
	> ```cpp
	> vector<int> t1{1, 2, 3, 4};
	> vector<int> t2{2, 3, 4, 5};
	> v.push_back(t1);
	> v.push_back(t2);
	> v.push_back({3, 4, 5, 6}) // {3, 4, 5, 6}可以作为vector的初始化,相当于一个无名vector
	> cpp运行12345
	> ```
	行列长度均固定 `n + 1` 行 `m + 1` 列初始值为0
	```cpp
	vector<vector<int>> a(n + 1, vector<int>(m + 1, 0));
	cpp运行1
	```
	c++17及以上支持的形式（定义模板类的对象时，可以不指定模板参数，但必须要在构造函数中能推导出模板参数）
	```cpp
	vector a{1, 2, 3, 4, 5}; // 声明一个int类型动态数组，初始元素自己指定
	vector b(n + 1, vector(m + 1, 0));
	cpp运行
	```

### 1.2 方法函数

#### 1.2.1 函数总结

**c指定为数组名称** ，含义中会注明算法复杂度。

| 代码 | 算法复杂度 | 返回值类型 | 含义 |
| --- | --- | --- | --- |
| `c.front()` |  | 引用 | 返回容器中的第一个数据 |
| `c.back()` |  | 引用 | 返回容器中的最后一个数据 |
| `c.at(idx)` |  | 引用 | 返回 `c[idx]` ，会进行边界检查，如果越界会报错，比直接使用 `[]` 更好一些，常在项目中使用 |
| `c.size()` |  |  | 返回实际数据个数（unsigned类型） |
| `c.begin()` |  | 迭代器 | 返回首元素的迭代器（通俗来说就是地址） |
| `c.end()` |  | 迭代器 | 返回最后一个元素后一个位置的迭代器（地址） |
| `c.empty()` |  | bool | 判断是否为空，为空返回真，反之返回假 |
| `c.reserve(sz)` |  |  | 为数组提前分配 `sz` 的内存大小，即改变了 `capacity` 的大小，主要是为了防止在 `push_back` 过程中多次的内存拷贝 |
| `c.assign(beg, end)` |  |  | 将另外一个容器 `[x.begin(), x.end())` 里的内容拷贝到 `c` 中 |
| `c.assign(n, val)` |  |  | 将 `n` 个 `val` 值拷贝到 `c` 数组中，这会清除掉容器中以前的内容， `c` 数组的 `size` 将变为 `n` ， `capacity` 不会改变 |
| `c.pop_back()` |  |  | 删除最后一个数据 |
| `c.push_back(element)` |  |  | 在尾部加一个数据 |
| `c.emplace_back(ele)` |  |  | 在数组中加入一个数据，和 `push_back` 功能基本一样，在某些情况下比它效率更高，支持传入多个构造参数 |
| `c.clear()` |  |  | 清除容器中的所有元素 |
| `c.resize(n, v)` |  |  | 改变数组大小为 `n`,`n` 个空间数值赋为 `v` ，如果没有默认赋值为 `0` |
| `c.insert(pos, x)` |  |  | 向任意迭代器 `pos` 插入一个元素 `x` |
| 例： `c.insert(c.begin() + 2, -1)` |  |  | 将 `-1` 插入 `c[2]` 的位置 |
| `c.erase(first, last)` |  |  | 删除 `[first, last)` 的所有元素 |

#### 1.2.2 注意情况

- `end()` 返回的是最后一个元素的后一个位置的地址，不是最后一个元素的地址， **所有STL容器均是如此**
- 使用 `vi.resize(n, v)` 函数时，若 `vi` 之前指定过大小为 `pre`
	- `pre > n` ：即数组大小变小了，数组会保存前 `n` 个元素，前 `n` 个元素值为原来的值，不是都为 `v`
		- `pre < n` ：即数组大小变大了，数组会在后面插入 `n - pre` 个值为 `v` 的元素
	也就是说，这个初始值 `v` 只对新插入的元素生效。
	```cpp
	#include<bits/stdc++.h>
	using namespace std;
	void out(vector<int> &a) { for (auto &x: a) cout << x << " "; cout << "\n"; }
	int main() {
	    vector<int> a(5, 1);
	    out(a); // 1 1 1 1 1
	    a.resize(10, 2);
	    out(a); // 1 1 1 1 1 2 2 2 2 2
	    a.resize(3, 3);
	    out(a); // 1 1 1
	    return 0;
	}
	cpp运行123456789101112
	```
- 使用 `sort` 排序要: `sort(c.begin(), c.end());`

> `sort()` 为STL函数，请参考本文最后面STL函数系列。

对所有元素进行排序，如果要对指定区间进行排序，可以对 `sort()` 里面的参数进行加减改动。

```cpp
vector<int> a(n + 1);
sort(a.begin() + 1, a.end()); // 对[1, n]区间进行从小到大排序
cpp运行
```

### 1.3 元素访问

共三种方法：

- **下标法** ： 和普通数组一样

注意：一维数组的下标是从 `0` 到 `v.size()-1` ，访问之外的数会出现越界错误

- **迭代器法** ： 类似指针一样的访问 ，首先需要声明迭代器变量，和声明指针变量一样，可以根据代码进行理解（附有注释）。
```cpp
vector<int> vi; //定义一个vi数组
vector<int>::iterator it = vi.begin();//声明一个迭代器指向vi的初始位置
cpp运行
```
- **使用auto** ：非常简便，但是会访问数组的所有元素（特别注意0位置元素也会访问到）

#### 1.3.1 下标访问

直接和普通数组一样进行访问即可。

```cpp
//添加元素
for(int i = 0; i < 5; i++)
    vi.push_back(i);
    
//下标访问 
for(int i = 0; i < 5; i++)
    cout << vi[i] << " ";
cout << "\n";
cpp运行12345678
```

#### 1.3.2 迭代器访问

类似指针，迭代器就是充当指针的作用。

```cpp
vector<int> vi{1, 2, 3, 4, 5};
//迭代器访问
vector<int>::iterator it;   
// 相当于声明了一个迭代器类型的变量it
// 通俗来说就是声明了一个指针变量
cpp运行12345
```
- 方式一：
```cpp
vector<int>::iterator it = vi.begin(); 
for(int i = 0; i < 5; i++)
    cout << *(it + i) << " ";
cout << "\n";
cpp运行1234
```
- 方式二
```cpp
vector<int>::iterator it;
for(it = vi.begin(); it != vi.end();it ++)
    cout << *it << " ";
//vi.end()指向尾元素地址的下一个地址

// 或者
auto it = vi.begin();
while (it != vi.end()) {
    cout << *it << "\n";
    it++;
}
cpp运行1234567891011
```

#### 1.3.3 智能指针

**只能遍历完数组** ，如果要指定的内容进行遍历，需要另选方法。

`auto` 能够自动识别并获取类型。

```cpp
// 1. 输入
vector<int> a(n);
for (auto &x: a) {
    cin >> x; // 可以进行输入，注意加引用
}
// 2. 输出
vector<int> v;
v.push_back(12);
v.push_back(241);
for(auto val : v) {
    cout << val << " "; // 12 241
}

cpp运行12345678910111213
```

> `vector` 注意：
> 
> - `vi[i]` 和 `*(vi.begin() + i)` 等价，与指针类似。
> - `vector` 和 `string` 的 `STL` 容器支持 `*(it + i)` 的元素访问，其它容器可能也可以支持这种方式访问，但用的不多，可自行尝试。

string的讲解在后续章节会有讲述

### 1.4 vector内存拷贝机制

`vector` 里面有两个变量 `size` （指数组实际 **长度** 大小）和 `capacity` （指数组分配的内存空间 **容量** 大小）。

存在机制： **当长度大于容量时，vector会自动进行扩容** 。  
扩容规则为：vector会重新开辟新的内存空间（大小为原来的capacity的2倍），原来的vector中存储内容先copy到新的地址空间中，然后销毁原来的地址空间。

> 所以每次push\_back进去一个元素，内存空间copy到新的空间中，vector会进行自动扩容，原来地址空间销毁。这种操作可以进行，但是地址空间的copy占用一定的时间，效率变低，尽量不要用。

一个减少内存拷贝的思路是：使用reserve提前分配固定的空间大小（必须知道分配空间大小的上限）

```cpp
const int N = 1e6 + 5; // 空间大小的上限
vector<int> a;
a.reserve(N);
// 或者
vector<int> b(N); // 直接指定长度分配这么大的空间也可以
cpp运行12345
```

> 如要获取所有内容的PDF文件，请在公众号【行码棋】回复【STL】获取，非常抱歉了。  
> Update：2023-12-11PDF文件已更新

微信公众号