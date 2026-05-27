---
title: "【STL】STL之string详解_string stl-CSDN博客"
source: "https://blog.csdn.net/qq_50285142/article/details/114156051"
author:
  - "[[成就一亿技术人!]]"
  - "[[hope_wisdom 发出的红包]]"
published:
created: 2026-05-25
description: "文章浏览阅读4.1w次，点赞154次，收藏312次。C++STL之string详解_string stl"
tags:
  - "clippings"
---
## 返回STL目录

## 9 string

### 9.1 介绍

string是一个字符串类，和 `char` 型字符串类似。

可以把string理解为一个字符串类型，像int一样可以定义

### 9.2 初始化 及定义

```cpp
//头文件
#include<string>

//1.
string str1; //生成空字符串

//2.
string str2("123456789"); //生成"1234456789"的复制品 

//3.
string str3("12345", 0, 3);//结果为"123" ，从0位置开始，长度为3

//4.
string str4("123456", 5); //结果为"12345" ，长度为5

//5.
string str5(5, '2'); //结果为"22222" ,构造5个字符'2'连接而成的字符串

//6.
string str6(str2, 2); //结果为"3456789"，截取第三个元素（2对应第三位）到最后

cpp运行123456789101112131415161718192021
```

**简单使用**

- 访问单个字符：
```cpp
#include<iostream>
#include<string>
using namespace std;
int main() {
    string s = "xing ma qi!!!";
    for(int i = 0; i < s.size(); i++)
        cout << s[i] << " ";
    return 0;
}
cpp运行123456789
```
- string数组使用：
```cpp
#include<iostream>
#include<string>
using namespace std;
int main() {
    string s[10];
    for(int i = 1; i < 10; i++) {
        s[i] = "loading...  " ;
        cout << s[i] << i << "\n";
    } 
    return 0;
}
cpp运行1234567891011
```

结果：

```
loading...  1
loading...  2
loading...  3
loading...  4
loading...  5
loading...  6
loading...  7
loading...  8
loading...  9
123456789
```

### 9.3 string 特性

- 支持 **比较** 运算符  
	string字符串支持常见的比较操作符 `（>,>=,<,<=,==,!=）` ，支持 `string` 与 `C-string` 的比较（如 `str < "hello"` ）。  
	在使用 `>,>=,<,<=` 这些操作符的时候是根据“当前字符特性”将字符按 `字典顺序` 进行逐一得 比较。字典排序靠前的字符小， 比较的顺序是从前向后比较，遇到不相等的字符就按这个位置上的两个字符的比较结果确定两个字符串的大小（前面减后面）。
	同时， `string ("aaaa") <string(aaaaa)` 。
- 支持 `+` **运算** 符，代表拼接字符串  
	string字符串可以拼接，通过"+"运算符进行拼接。
	```cpp
	string s1 = "123";
	string s2 = "456";
	string s = s1 + s2;
	cout << s;   //123456
	cpp运行
	```

### 9.4 读入详解

- **读入字符串，遇空格，回车结束**
```cpp
string s;
cin >> s;
cpp运行
```
- **读入一行字符串（包括空格），遇回车结束**
```cpp
string s;
getline(cin, s);
cpp运行
```

注意: `getline(cin, s)` 会获取前一个输入的换行符，需要在前面添加读取换行符的语句。如： `getchar()` 或 ` cin.get()`

错误读取：

```cpp
int n;
string s;
cin >> n;
getline(cin, s); //此时读取相当于读取了前一个回车字符
cpp运行
```

正确读取：

```cpp
int n;
string s;
cin >> n;
getchar(); //cin.get()
getline(cin, s);//可正确读入下一行的输入
cpp运行
```

> `cin` 与 `cin.getline()` 混用
> 
> cin输入完后，回车，cin遇到回车结束输入，但回车还在输入流中，cin并不会清除，导致 `getline()` 读取回车，结束。  
> 需要在cin后面加 `cin.ignore()` ；主动删除输入流中的换行符。（不常用）

- **cin和cout解锁**

代码（写在main函数开头）：

```cpp
ios::sync_with_stdio(false);
cin.tie(0),cout.tie(0);
cpp运行
```

> 为什么要进行 `cin` 和 `cout` 的解锁，原因是：
> 
> 在一些题目中，读入的 **数据量很大** ，往往超过了1e5（10 <sup>5</sup> ）的数据量,而 `cin` 和 `cout` 的读入输出的速度 **很慢** （是因为 `cin` 和 `cout` 为了兼容C语言的读入输出在性能上做了妥协），远不如 `scanf` 和 `printf` 的速度，具体原因可以搜索相关的博客进行了解。
> 
> **所以** 对 `cin` 和 `cout` 进行解锁使 `cin` 和 `cout` 的速度几乎接近 `scanf` 和 `printf` ，避免输入输出超时。

**注意** ： `cin cout` 解锁使用时，不能与 `scanf,getchar, printf,cin.getline()` 混用，一定要注意，会出错。

> **string与C语言字符串（C-string）的区别**
> 
> - string  
> 	是C++的一个类，专门实现字符串的相关操作。具有丰富的操作方法，数据类型为 `string` ，字符串结尾没有 `\0` 字符
> - C-string  
> 	C语言中的字符串，用char数组实现，类型为 `const char *`,字符串结尾以 `\0` 结尾

一般来说string向char数组 转换 会出现一些问题，所以为了能够实现转换，string有一个方法 `c_str()` 实现string向char数组的转换。

```cpp
string s = "xing ma qi";
const char *s2 = s.c_str();
cpp运行
```

### 9.5 函数方法

- **获取字符串长度**

| 代码 | 含义 |
| --- | --- |
| `s.size()` 和 `s.length()` | 返回string对象的字符个数，他们执行效果相同。 |
| `s.max_size()` | 返回string对象最多包含的字符数，超出会抛出length\_error异常 |
| `s.capacity()` | 重新分配内存之前，string对象能包含的最大字符数 |

- **插入**

| 代码 | 含义 |
| --- | --- |
| `s.push_back()` | 在末尾插入 |
| 例： `s.push_back('a')` | 末尾插入一个字符a |
| `s.insert(pos,element)` | 在pos位置插入element |
| 例： `s.insert(s.begin(),'1')` | 在第一个位置插入1字符 |
| `s.append(str)` | 在s字符串结尾添加str字符串 |
| 例： `s.append("abc")` | 在s字符串末尾添加字符串“abc” |

- **删除**

| 代码 | 含义 |
| --- | --- |
| `erase(iterator p)` | 删除字符串中 `p` 所指的字符 |
| `erase(iterator first, iterator last)` | 删除字符串中迭代器区间 `[first, last)` 上所有字符 |
| `erase(pos, len)` | 删除字符串中从索引位置pos开始的len个字符 |
| `clear()` | 删除字符串中所有字符 |

- **字符替换**

| 代码 | 含义 |
| --- | --- |
| `s.replace(pos, n, str)` | 把当前字符串从索引pos开始的n个字符替换为str |
| `s.replace(pos, n, n1, c)` | 把当前字符串从索引pos开始的n个字符替换为n1个字符c |
| `s.replace(it1, it2, str)` | 把当前字符串 `[it1,it2)` 区间替换为str **it1,it2为迭代器哦** |

- **大小写转换**

方法一：

| 代码 | 含义 |
| --- | --- |
| `tolower(s[i])` | 转换为小写 |
| `toupper(s[i])` | 转换为大写 |

方法二：

通过stl的 `transform` 算法配合 `tolower` 和 `toupper` 实现。  
有4个参数，前2个指定要转换的容器的起止范围，第3个参数是结果存放容器的起始位置，第4个参数是一元运算。

```cpp
string s;
transform(s.begin(), s.end(), s.begin(), ::tolower);//转换小写
transform(s.begin(), s.end(), s.begin(), ::toupper);//转换大写
cpp运行
```
- **类型转换**

| 代码 | 含义 |
| --- | --- |
| `stoi(s)` | 将字符串 `s` 转化为 `int` 类型 |
| `stoll(s)` | 将字符串 `s` 转化为 `long long int` 类型 |
| `stod(s)` | 将字符串 `s` 转化为 `double` 类型 |
| `stold(s)` | 将字符串 `s` 转化为 `long double` 类型 |

- **分割**

| 代码 | 含义 |
| --- | --- |
| `s.substr(pos,n)` | 截取从pos索引开始的n个字符 |

- **查找**

| 代码 | 含义 |
| --- | --- |
| `s.find(str, pos)` | 在当前字符串的pos索引位置（默认为0）开始，查找子串str，返回找到的位置索引， `string::npos` 表示查找不到子串 |
| `s.find(c, pos)` | 在当前字符串的pos索引位置（默认为0）开始，查找字符c，返回找到的位置索引， `string::npos` 表示查找不到字符 |
| `s.rfind(str, pos)` | 在当前字符串的pos索引位置开始，反向查找子串s，返回找到的位置索引，-1表示查找不到子串 |
| `s.rfind(c,pos)` | 在当前字符串的pos索引位置开始，反向查找字符c，返回找到的位置索引，-1表示查找不到字符 |
| `s.find_first_of(str, pos)` | 在当前字符串的pos索引位置（默认为0）开始，查找子串s的字符，返回找到的位置索引，-1表示查找不到字符 |
| `s.find_first_not_of(str,pos)` | 在当前字符串的pos索引位置（默认为0）开始，查找第一个不位于子串s的字符，返回找到的位置索引，-1表示查找不到字符 |
| `s.find_last_of(str, pos)` | 在当前字符串的pos索引位置开始，查找最后一个位于子串s的字符，返回找到的位置索引，-1表示查找不到字符 |
| `s.find_last_not_of(str, pos)` | 在当前字符串的pos索引位置开始，查找最后一个不位于子串s的字符，返回找到的位置索引，-1表示查找不到子串 |

```cpp
#include<string>
#include<iostream>
int main() {
    string s("dog bird chicken bird cat");
//字符串查找-----找到后返回首字母在字符串中的下标
// 1. 查找一个字符串
    cout << s.find("chicken") << endl;// 结果是：9
    
// 2. 从下标为6开始找字符'i'，返回找到的第一个i的下标
    cout << s.find('i',6) << endl;// 结果是：11
    
// 3. 从字符串的末尾开始查找字符串，返回的还是首字母在字符串中的下标
    cout << s.rfind("chicken") << endl;// 结果是：9
    
// 4. 从字符串的末尾开始查找字符
    cout << s.rfind('i') << endl;// 结果是：18因为是从末尾开始查找，所以返回第一次找到的字符
    
// 5. 在该字符串中查找第一个属于字符串s的字符
    cout << s.find_first_of("13br98") << endl;// 结果是：4---b
    
// 6. 在该字符串中查找第一个不属于字符串s的字符------先匹配dog，然后bird匹配不到，所以打印4
    cout << s.find_first_not_of("hello dog 2006") << endl; // 结果是：4
    cout << s.find_first_not_of("dog bird 2006") << endl;  // 结果是：9
    
// 7. 在该字符串最后中查找第一个属于字符串s的字符
    cout << s.find_last_of("13r98") << endl;// 结果是：19

// 8. 在该字符串最后中查找第一个不属于字符串s的字符------先匹配t--a---c，然后空格匹配不到，所以打印21
    cout << s.find_last_not_of("teac") << endl;// 结果是：21
}
cpp运行123456789101112131415161718192021222324252627282930
```
- **其他操作**
```cpp
// 1 排序
sort(s.begin(),s.end());  //按字符的ASCII码排序

// 2 字符串反转
reverse(s.begin(), s.end());
cpp运行
```

---

> 如要获取所有内容的PDF文件，请在公众号【行码棋】回复【STL】获取，非常抱歉了。  
> Update：2023-12-11更新PDF文件

微信公众号