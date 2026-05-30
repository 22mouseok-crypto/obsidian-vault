---
title: "TUOJ"
source: "https://sim.csp.thusaac.com/contest/41/problem/1"
author:
published:
created: 2026-05-30
description:
tags:
  - "clippings"
---
**时间限制：** 1.0 秒

**空间限制：** 512 MiB

**相关文件：** [题目目录](https://sim.csp.thusaac.com/staticdata/206.UjQeTb14qfuzGrEQ.pub/5ldjdsBXTvM2qX9L.CSP41-down.zip/CSP41-down.zip)

## 题目描述

小 P 计划招募 $n$ 个机器人完成一个项目：每个机器人负责其中的一项任务，编号从 $1$ 到 $n$ ，任务之间互不干扰。如果完成任务 $i$ 的耗时为 $t_i$ ，则该项目总耗时为 $t_1 + t_2 + \cdots + t_n$ 。

作为项目管理者，小 P 可以用有限的预算为机器人们购买咖啡加油。其中负责任务 $i$ 的机器人，最多可以喝 $a_i$ 杯咖啡，从而将该任务耗时缩短 $b_i$ （最终耗时即为 $t_i - b_i$ ）。

**根据任务的特性和机器人的偏好， $n$ 项任务可分为“灵活型”和“普通型”两类，详情参见附件资料（重要）。**

附件资料

![HoverNotes Icon](chrome-extension://ohmkaidmhppmhmgbpdmhjcdojgfejkhg/assets/icons/hover-notes-icon-white.svg)

HoverNotes

<video controls=""><source src="https://sim.csp.thusaac.com/staticdata/207.w0quas9iPmXSk2td.pub/xOUJNML0tB0suo82.CSP41-crashing.mp4/CSP41-crashing.mp4" type="video/mp4"></video>

已知小 P 可以为机器人们提供最多 $m$ 杯咖啡，试计算完成整个项目的最短时间。

## 输入格式

从标准输入读入数据。

输入的第一行包含空格分隔的两个正整数 $n$ 和 $m$ ，分别表示任务数量和咖啡数量。

接下来 $n$ 行，每行包含空格分隔的四个整数 $o_i$ 、 $t_i$ 、 $a_i$ 和 $b_i$ ，表示一个任务。其中 $o_i \in \{ 0, 1 \}$ 表示任务类别， $o_i = 0$ 表示灵活型、 $o_i = 1$ 表示普通型；其余变量含义如上所述，输入数据保证 $t_i > b_i$ ，即缩短后的耗时仍大于零。

## 输出格式

输出到标准输出。

输出一个实数，表示完成整个项目的最短时间。

## 样例1输入

```
3 5
0 2 3 1
0 3 4 2
0 4 5 2
```

## 样例1输出

```
6.6
```

## 样例1解释

三个任务均为灵活型，初始总耗时为 $2+3+4=9$ 。最优方案为：给任务二分配 $4$ 杯咖啡，耗时缩短 $2$ ；给任务三分配 $1$ 杯咖啡，耗时相应缩短 $\frac{2}{5}=0.4$ 。综上，完成整个项目最短时间为 $9 - 2 - 0.4 = 6.6$ 。

## 样例2输入

```
5 62
0 10 2 1
0 10 1 1
1 500 40 360
1 600 50 500
1 400 20 150
```

## 样例2输出

```
1008.5
```

## 样例2解释

初始总耗时为 $1520$ 。最优方案为：给任务三分配 $40$ 杯咖啡，耗时缩短 $360$ ；给任务五分配 $20$ 杯咖啡，耗时缩短 $150$ ；给任务一和二各分配 $1$ 杯咖啡，耗时分别缩短 $0.5$ 和 $1$ 。综上，完成整个项目最短时间为 $1520 - 360 - 150 - 0.5 - 1 = 1008.5$ 。

## 子任务

$80 \%$ 的测试点满足：所有任务均为灵活型任务，且对于每个任务 $i$ 有 $0 < a_i \le 20$ ；

全部的测试点满足： $0 < n \le 200$ 、 $0 < m \le 1000$ ，且对于每个任务 $i$ 有 $0 < a_i \le 100$ 、 $0 < b_i < t_i \le 10^{4}$ 。

## 评分方式

输出结果与标准答案相比绝对误差小于 $0.001$ 即可，推荐保留六位小数输出结果。

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
‘’‘c
#include<iostream>

using namespace std;

class robot{

    public:

        bool o;

        int t,a,b;

        double pri;

};

int main(){

    int n,m;

    cin>>n>>m;

    robot* task;

    task=new robot[n];

    for(int i=0;i<n;i++){

        cin>>task[i].o>>task[i].t>>task[i].a>>task[i].b;

        task[i].pri=task[i].b/task[i].a;

    }

    for(int i=0;i<n;i++){

        for(int j=n;j>i;j--){

            if(task[j].pri>=task[j-1].pri){

                if(task[j].pri==task[j-1].pri){//如果优先值相等，

                    if(task[j].o-task[j-1].o>=0){//把普通任务放在前面，优先处理

                        robot temp=task[j];

                        task[j]=task[j-1];

                        task[j-1]=temp;

                    }

                }

                else{//优先值严格大于

                    robot temp=task[j];

                    task[j]=task[j-1];

                    task[j-1]=temp;

                }

            }

        }

    }

    int sum=0;

    for(int i=0;i<n;i++){

        if(m==0){//没有剩余咖啡了

            break;

        }

        if(m>=task[i].a){//如果咖啡够当前任务完全加速

            m-=task[i].a;

            task[i].t-=task[i].b;

        }

        else{//如果咖啡不够当前任务完全加速

            if(task[i].o==0){//如果是灵活任务，耗尽全力

                double rem=m/task[i].a;

                task[i].t-=task[i].b * (rem);

                m=0;

            }

            else{//如果不是灵活任务，就加速下一个，如果下一个的pri和本任务不同，那么答案就可能不对了，但是现在暂时没别的想法。

            }

        }

        sum+=task[i].t;

    }

    cout<<sum;

}
’‘’

---