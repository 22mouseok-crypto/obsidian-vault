---
title: "TUOJ"
source: "https://sim.csp.thusaac.com/contest/41/problem/3"
author:
published:
created: 2026-05-30
description:
tags:
  - "clippings"
---
**时间限制：** 6.0 秒

**空间限制：** 1024 MiB

**相关文件：** [题目目录](https://sim.csp.thusaac.com/staticdata/206.UjQeTb14qfuzGrEQ.pub/5ldjdsBXTvM2qX9L.CSP41-down.zip/CSP41-down.zip)

## 题目描述

类似二进制下的异或操作，小 C 定义了一种 $k$ 进制下的异或运算 $\oplus_k$ 。

对于任意非负整数 $a,b$ 定义 $a$ 和 $b$ 进行 $k$ 进制下的 **不进位** 加法的结果为 $a\oplus_k b$ 。

形式化地，如果 $a=\sum_{i=0}^n(a_i\cdot k^i),b=\sum_{i=0}^n(b_i\cdot k^i)$ ，其中 $a_i,b_i$ 是 **小于** $k$ 的非负整数，则 $a\oplus_k b=\sum_{i=0}^n(((a_i+b_i)\bmod k)\cdot k^i)$ 。

如计算 $11\oplus_3 7$ 的过程如下： $11$ 可表示为 $2\times 3^0+0\times 3^1+1\times 3^2$ ， $7$ 可表示为 $1\times 3^0+2\times 3^1+0\times 3^2$ ，则 $11\oplus_3 7=((2+1)\bmod 3)\times 3^0+((2+0)\bmod 3)\times 3^1+((0+1)\bmod 3)\times 3^2=0\times 3^0+2\times 3^1+1\times 3^2=15$ 。

之后小 C 在此运算基础上对任意非负整数 $n$ 定义了一个函数 $f$ ，具体如下：

$$
f(n)=
\begin{cases}
0 & (n=0)\\
n\oplus_k f(n-1) & (n> 0)
\end{cases}
$$

现在小 C 有一个非负整数序列 $a_1,a_2,\cdots,a_n$ 和 **全局给定** 的 **奇数** $k$ 。小 C 希望对这个序列进行 $m$ 次操作：

- 操作一给出三个参数 $l,r,v$ ，表示将下标在区间 $[l,r]$ 内的 $a_i$ 修改为 $a_i \oplus_k v$ 。
- 操作二给出两个参数 $l,r$ ，表示查询 $f(a_l)\oplus_k f(a_{l+1})\oplus_k \cdots \oplus_k f(a_r)$ 。

## 输入格式

从标准输入读入数据。

第一行给出三个正整数 $n,m,k$ 。

接下来一行给出 $n$ 个非负整数，表示序列 $a$ 。

接下来 $m$ 行每行给出三个或者四个非负整数，表示 $m$ 次操作。

每行第一个数字为操作的类型 $t$ 。

- 如果 $t$ 为 $1$ ，则该操作为操作一，接下来给出三个非负整数 $l,r,v$ 作为该操作的参数。
- 如果 $t$ 为 $2$ ，则该操作为操作二，接下来给出两个正整数 $l,r$ 作为该操作的参数。

## 输出格式

输出到标准输出。

对于每个操作二，输出单独的一行，包含一个非负整数，为该操作的答案。

## 样例1输入

```
5 4 11
13 17 14 19 15
1 1 3 9
2 1 2
1 3 5 6
2 4 5
```

## 样例1输出

```
76
50
```

## 样例1解释

- 第一个操作结束之后，序列 $a$ 为： $[{\color{red}11},{\color{red}15},{\color{red}12},19,15]$ 。
- 第二个操作的答案为 $f(a_1)\oplus_{11}f(a_2)=11\oplus_{11} 65=76$ 。
- 第三个操作结束之后，序列 $a$ 为： $[11,15,{\color{red}18},{\color{red}14},{\color{red}21}]$ 。
- 第四个操作的答案为 $f(a_4)\oplus_{11}f(a_5)=50\oplus_{11} 0=50$ 。

## 样例2

见题目目录下的 *2.in* 与 *2.ans* 。

该样例满足子任务一的限制。

## 样例3

见题目目录下的 *3.in* 与 *3.ans* 。

该样例满足子任务二的限制。

## 样例4

见题目目录下的 *4.in* 与 *4.ans* 。

该样例满足子任务三的限制。

## 样例5

见题目目录下的 *5.in* 与 *5.ans* 。

该样例满足子任务四的限制。

## 子任务

**本题采用捆绑测试，你只有通过一个子任务中的所有测试点才能得到该子任务的分数。**

对于所有数据满足： $1\le n\le 5 \times 10^{5},1\le m \le 10^{4},11\le k \le 10^{9}$ 且 $k$ **为奇数** 。对于每个操作保证 $t\in\{1,2\},1\le l\le r\le n$ 。对于任意时刻，保证 $a_i$ 非负。对于所有操作一，保证参数 $v$ 非负。记所有时刻序列中的元素 $a_i$ 和所有操作一中的参数 $v$ 的最大值为 $R$ ，则保证 $R\le10^{12}$ 。

- 子任务一（ $20$ 分）：保证 $n,m \le 10^{3}$ 且 $R\le 10^{6}$ 。
- 子任务二（ $30$ 分）：保证 $n,m\le 10^{3}$ 。
- 子任务三（ $20$ 分）：保证 $a_i$ 和操作一的参数 $v$ 均是 $k$ 的倍数。
- 子任务四（ $30$ 分）：无特殊限制。

## 提示

子任务三可能有助于你更好地探索函数 $f$ 的相关性质。

语言和编译选项

| # | 名称 | 编译器 | 额外参数 | 代码长度限制 |
| --- | --- | --- | --- | --- |
| 0 | g++ | `g++` | `-O2 -DONLINE_JUDGE` | 65536 B |
| 1 | gcc | `gcc` | `-O2 -DONLINE_JUDGE` | 65536 B |
| 2 | java | `javac` |  | 65536 B |
| 3 | python3 | `python3` |  | 65536 B |

递交历史

递交答案 （剩余次数: 32）
我的答案
```cpp
#include<iostream>
using namespace std;
class op{
    public:
        int t;
        int l,r,v;
};

int xor0(int a,int b,int k){
    int sum=0;
    int i=0;
    while(a!=0||b!=0){//ab不全为0
        if(a!=0&&b!=0){//ab都不为0
            int resa=a%k;//a的k进制的第i+1位
            int resb=b%k;//b的k进制的第i+1位
            int resc=(resa+resb)%k;//第i+1位异或值
            for(int j=0;j<i;j++){//k的i次方*resc
                resc*=k;//这时resc就变成了该位换算成十进制的大小
            }
            sum+=resc;//求和
            a/=k;
            b/=k;
            i++;//处理下一位
        }
        else{
            if(a==0){
                for(int j=0;j<i;j++){//k的i次方*b
                    b*=k;//这时b换算成十进制的大小
                }
                sum+=b;
            }
            else{
                for(int j=0;j<i;j++){//k的i次方*a
                    a*=k;//这时a换算成十进制的大小
                }
                sum+=a;
            }
            break;
        }
    }
    return sum;
}

void op1(int *a,int l,int r,int v,int k){
    for(int i=l-1;i<r;i++){
        a[i]=xor0(a[i],v,k);
    }
}

int f(int n,int k){
    if(n==0){
        return 0;
    }
    else{
        return xor0(n,f(n-1,k),k);
    }
}

int op2(int a[],int l,int r,int k){
    int sum;
    for(int i=l-1;i<r-1;i++){
        sum+=xor0(a[i],a[i+1],k);
    }
    return sum;
}

int main(){
    int n,m,k;
    cin>>n>>m>>k;
    
    int* a;
    a=new int[n];
    for(int i=0;i<n;i++){
        cin>>a[i];
    }

    op* mop;
    mop=new op[m];
    for(int i=0;i<n;i++){
        cin>>op[i].t;
        if(t==1){
            cin>>op[i].l>>op[i].r>>op[i].v;
            op1(a[],op[i].l,op[i].r,op[i].v,k);
        }
        else{
            cin>>op[i].l>>op[i].r;
            op[i].v=-1;
            cout<<op2(a[],op[i].l,op[i].r,k)<<endl;
        }
    }
}
```

