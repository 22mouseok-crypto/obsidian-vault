---
title: "C++ STL之pair详解_stl pair-CSDN博客"
source: "https://blog.csdn.net/qq_50285142/article/details/122304842"
author:
  - "[[成就一亿技术人!]]"
  - "[[hope_wisdom 发出的红包]]"
published:
created: 2026-05-25
description: "文章浏览阅读2.1w次，点赞34次，收藏41次。C++ STL之pair详解_stl pair"
tags:
  - "clippings"
---
## 返回主目录

## 8 pair

### 8.1 介绍

pair只含有两个元素，可以看作是只有两个元素的结构体。

**应用：**

- 代替二元结构体
- 作为map键值对进行插入（代码如下）
```cpp
map<string, int> mp;
mp.insert(pair<string, int>("xingmaqi",1));
// mp.insert(make_pair("xingmaqi", 1));
// mp.insert({"xingmaqi", 1});
cpp运行
```

初始化操作和赋值操作

```cpp
//头文件
#include<utility>

//1.初始化定义
pair<string, int> p("wangyaqi",1);//带初始值的
pair<string, int> p;//不带初始值的

//2.赋值
p = {"wang", 18};
p = make_pair("wang", 18);
p = pair<string, int>("wang", 18);
cpp运行1234567891011
```

### 8.2 访问

```cpp
//定义结构体数组
pair<int,int> p[20];
for(int i = 0; i < 20; i++) {
    //和结构体类似，first代表第一个元素，second代表第二个元素
    cout << p[i].first << " " << p[i].second;
}
cpp运行
```

---

> 如要获取所有内容的PDF文件，请在公众号【行码棋】回复【STL】获取，非常抱歉了。  
> Update：2023-12-11更新PDF文件

微信公众号