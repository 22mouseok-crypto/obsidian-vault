# CSP 认证考试 — 现场速查手册

> **目标分数**：T1满分(100) + T2满分(100) + T3(50) + T4(50) + T5(10) = **310 分**
> 打印双面携带，考前反复熟悉，考中快速定位。

---

## 目录速查

| 章节 | 内容 |
|------|------|
| **零** | 防爆零检查清单（考前必读） |
| **一** | 模板头文件 & 你的代码框架 |
| **二** | 你的习惯最容易踩的 5 个坑 ⚠️ |
| **三** | 变量类型速查 & 格式化输出 |
| **四** | 数组创建（你的 new 写法） |
| **五** | STL 容器速查（何时用哪个） |
| **六** | 算法选择决策树（看题选算法） |
| **七** | 算法模板大全 |
| **八** | 五题策略 & 得分公式 |
| **九** | 你的习惯导致的常见报错 & 修复 |
| **十** | 时间复杂度速查 |

---

## 零、防爆零检查清单 ⚠️

**此为 0 分与 300+ 分的区别！**

### 提交前必查

```
□ freopen("problem.in","r",stdin);   // 必须有！
□ freopen("problem.out","w",stdout);  // 必须有！
□ 文件名严格大小写匹配
□ 文件夹：准考证号/T1英文名/T1英文名.cpp
□ 调试用的 cout 已注释或删除
```

### 你的代码自查清单（按你的习惯）

```
□ new 的数组大小够不够？下标 [0, n-1] 用对了吗？
□ 整数除法是不是忘了 (double) 强转？
□ 局部变量初始化了吗？（int sum=0;）
□ 循环是 for(int j=n-1;j>i;j--) 不是 for(int j=n;j>i;j--)
□ 需要小数输出时，sum 是不是 double 不是 int？
```

---

## 一、模板头文件 & 你的代码框架

```cpp
#include<iostream>
using namespace std;

int main(){
    freopen("problem.in","r",stdin);
    freopen("problem.out","w",stdout);

    // 在这里写你的代码...

    return 0;
}
```

> **说明**：这就是你现在的写法，保持不变。不需要额外头文件，`iostream` 覆盖了 `cin/cout`。
> 
> 如果需要用到 `sort`、`queue` 等 STL，按需加头文件：`#include<algorithm>`、`#include<queue>`、`#include<map>`、`#include<set>`、`#include<string>`。

---

## 二、你的习惯最容易踩的 5 个坑 ⚠️

### 坑1：整数除整数 = 整数（你 T2 的主要错误！）

```cpp
// ❌ 你容易这样写（T2 就这样错的）：
task[i].pri = task[i].b / task[i].a;    // 两个 int 相除，结果截断为 int！
double rem = m / task[i].a;              // 同样是整数除法！

// ✅ 正确写法——加 (double) 强转：
task[i].pri = (double)task[i].b / task[i].a;
double rem = (double)m / task[i].a;
```

> **规则**：只要除法的结果需要小数，两个操作数中至少一个必须是 `double`。最安全的做法：`(double)a / b`。

### 坑2：局部变量不初始化

```cpp
// ❌ 你容易这样写（T4 就这样错的）：
int sum;        // 值随机！可能是任意垃圾值
sum += a[i];    // 垃圾值 + a[i]，结果不可预测

// ✅ 正确写法：
int sum = 0;    // 必须初始化！
```

> **规则**：**所有局部变量声明时必须赋值**。`int sum=0;`、`double ans=0.0;`、`bool flag=false;`。

### 坑3：数组 new 出来后，下标从 0 到 n-1

```cpp
int *a;
a = new int[n];            // 合法下标：a[0] ~ a[n-1]

// ❌ 你 T2 犯的错误：
for(int j=n; j>i; j--){   // j=n 时访问 a[n]，越界！
    // 使用 task[j]        // 下标 n 不存在！
}

// ✅ 正确写法：
for(int j=n-1; j>i; j--){ // j 从 n-1 开始
    // 使用 task[j] 和 task[j-1]
}
```

> **规则**：`new int[n]` 创建了 n 个元素的数组，下标范围是 `[0, n-1]`。任何 `>= n` 的下标都是越界。

### 坑4：需要小数答案时用 double，不能用 int

```cpp
// ❌ 你 T2 犯的错误：
int sum = 0;       // 题目要求输出 6.6，int 存不了小数！
cout << sum;       // 输出 6，不是 6.6

// ✅ 正确写法：
double sum = 0.0;  // double 才能存小数
cout << sum;       // 输出 6.6
```

> **规则**：只要题目输出要求里有小数，或者中间计算涉及小数，变量就用 `double`。

### 坑5：手动排序容易写出越界和逻辑错误

```cpp
// ❌ 你 T2 的手动排序（有越界 bug + 逻辑复杂）：
for(int i=0;i<n;i++){
    for(int j=n;j>i;j--){   // 越界 + 逻辑复杂容易出错
        if(task[j].pri>=task[j-1].pri){
            // 嵌套 if-else 很绕...
        }
    }
}

// ✅ 推荐：直接用 sort + 自定义比较函数（绝对不会越界）
bool cmp(robot a, robot b){
    if(a.pri != b.pri) return a.pri > b.pri;     // pri 大的在前
    return a.o > b.o;                             // pri 相同时普通型在前
}
sort(task, task+n, cmp);  // 需要 #include<algorithm>
```

> **对比**：
> - 手动排序：容易写出越界、逻辑复杂、考试紧张时更容易错
> - `sort()`：一行搞定，不会越界，只需写一个清晰的比较函数
> 
> **建议**：用 `sort()`。你 T2 如果用了 `sort`，至少能避免越界 bug，只需要修整数除法就能过。

---

## 三、变量类型速查 & 格式化输出

### 3.1 一句话选类型

```
数据 < 2×10⁹（约 21 亿）→ int
数据 > 2×10⁹              → long long（必须！）
需要小数                  → double（别用 float）
```

### 3.2 各类型范围

| 类型 | 最大值（约） | 什么时候用 |
|------|------------|-----------|
| `int` | **2.1×10⁹** | 默认，数据不超过 21 亿 |
| `long long` | **9.2×10¹⁸** | 超过 21 亿必须用 |
| `double` | 15 位精度 | 需要小数的计算 |
| `char` | 单个字符 | 读字符时用 |
| `bool` | true/false | 标记、判断结果 |
| `string` | 不限 | 字符串处理 |

### 3.3 整数除法——你最需要记住的

```cpp
// 核心规则：两个 int 相除 = int（截断小数）

// ❌ 错误：
int a=5, b=2;
double c = a / b;      // c = 2.0，不是 2.5！
double d = b / a;      // d = 0.0，不是 0.4！

// ✅ 正确（加 (double)）：
double c = (double)a / b;  // c = 2.5
double d = (double)b / a;  // d = 0.4
```

### 3.4 格式化输出（cout 版，你的习惯）

```cpp
#include<iomanip>  // 需要这个头文件！

// 保留 2 位小数
cout << fixed << setprecision(2) << x;   // 如 3.14

// 保留 6 位小数（CSP 常用）
cout << fixed << setprecision(6) << x;   // 如 3.141593

// 一次性设置（写在 main 开头，之后所有 cout 都生效）
cout << fixed << setprecision(6);

// 如果只是偶尔输出小数，不需要 fixed：
cout << x;  // 默认输出，如 3.14
```

---

## 四、数组创建（你的 new 写法）

### 4.1 一维数组（你最常用的写法）

```cpp
int n;
cin >> n;
int *a;
a = new int[n];          // 下标 0 ~ n-1，元素初始值随机

// 如果你希望多开一点防止越界：
int *a;
a = new int[n + 10];     // 多开 10 个，安全

// 遍历（你的风格：用下标）
for(int i=0; i<n; i++){
    cin >> a[i];
}
for(int i=0; i<n; i++){
    cout << a[i] << " ";
}
```

### 4.2 二维数组

```cpp
int n, m;
cin >> n >> m;

// 方法：new 一个指针数组
int **a;
a = new int*[n];
for(int i=0; i<n; i++){
    a[i] = new int[m];   // 每行 m 个元素
}

// 访问
a[i][j] = 值;

// 遍历
for(int i=0; i<n; i++){
    for(int j=0; j<m; j++){
        cin >> a[i][j];
    }
}
```

### 4.3 结构体数组（你的 class 写法）

```cpp
class Robot{
public:
    bool o;       // 0 灵活型，1 普通型
    int t, a, b;
    double pri;   // 效率 = b/a（注意用 double！）
};

int n;
cin >> n;
Robot *task;
task = new Robot[n];

for(int i=0; i<n; i++){
    cin >> task[i].o >> task[i].t >> task[i].a >> task[i].b;
    task[i].pri = (double)task[i].b / task[i].a;  // 注意强转！
}
```

### 4.4 用 sort 对结构体数组排序（替代手写排序）

```cpp
#include<algorithm>  // sort 需要这个

// 比较函数
bool cmp(Robot a, Robot b){
    if(a.pri != b.pri) return a.pri > b.pri;  // 效率高的在前
    return a.o > b.o;                          // 效率相同时普通型在前
}

// 排序（下标 0 到 n-1）
sort(task, task+n, cmp);
```

---

## 五、STL 容器速查（何时用哪个）

### 5.1 string（字符串处理）⭐⭐⭐⭐

> **什么时候用？** T1-T3 经常需要解析字符串、提取数字、查找子串。直接用 `string` 比 `char[]` 方便很多。

```cpp
#include<string>  // 需要这个头文件！

string s;
cin >> s;                     // 读单词（遇空格停止）
getline(cin, s);              // 读整行（含空格）

int len = s.length();         // 长度
s.empty();                    // 判空，空返回 true

// 拼接
s += "abc";
s.append("def");

// 取子串
string sub = s.substr(2, 3);  // 从位置 2 开始取 3 个字符
string sub = s.substr(2);     // 从位置 2 取到末尾

// 查找（找不到返回 string::npos，即 -1）
int pos = s.find("ab");       // 从头找 "ab"
int pos = s.find("ab", 3);    // 从位置 3 开始找 "ab"
if(pos != string::npos){ /* 找到了 */ }

// 数值转换
int x = stoi(s);              // string 转 int
long long x = stoll(s);       // string 转 long long
double x = stod(s);           // string 转 double
string s = to_string(123);    // 数字转 string

// 遍历每个字符
for(int i=0; i<s.length(); i++){
    char c = s[i];            // 你的风格：下标访问
}
```

### 5.2 sort（排序，替代手写）⭐⭐⭐⭐⭐

```cpp
#include<algorithm>

// 数组排序
int a[100];
sort(a, a+n);                   // 升序 [0, n)
sort(a, a+n, greater<int>());   // 降序（需要 #include<functional>）

// 结构体数组排序（用 new 创建的）
Robot *task = new Robot[n];
sort(task, task+n, cmp);        // cmp 是你写的比较函数

// vector 排序（如果你用 vector）
sort(v.begin(), v.end());

// 部分排序
sort(a+1, a+n+1);  // 对下标 [1, n] 排序（如果你的数据从 1 开始存）
```

### 5.3 queue（队列）⭐⭐⭐

> **什么时候用？** "先进先出"的场景——BFS、模拟排队、滑动窗口。

```cpp
#include<queue>

queue<int> q;
q.push(x);      // 入队
q.pop();        // 出队（不返回值！）
q.front();      // 队首元素
q.back();       // 队尾元素
q.empty();      // 判空
q.size();       // 大小
```

### 5.4 stack（栈）⭐⭐⭐

> **什么时候用？** "后进先出"——括号匹配、表达式求值。

```cpp
#include<stack>

stack<int> st;
st.push(x);     // 入栈
st.pop();       // 出栈（不返回值！）
st.top();       // 栈顶元素
st.empty();     // 判空
st.size();      // 大小
```

### 5.5 priority_queue（优先队列/堆）⭐⭐⭐⭐

> **什么时候用？** "每次取最大/最小"——动态维护最值、Dijkstra。

```cpp
#include<queue>

// 大根堆（默认）：top 是最大值
priority_queue<int> pq;

// 小根堆：top 是最小值
priority_queue<int, vector<int>, greater<int>> pq;

pq.push(x);     // 入堆
pq.pop();       // 删堆顶
pq.top();       // 取堆顶（最大值或最小值）
pq.empty();     // 判空
pq.size();      // 大小
```

### 5.6 map（有序映射）⭐⭐⭐⭐

> **什么时候用？** "统计次数""是否存在""一一对应"。

```cpp
#include<map>

map<int, int> mp;              // 键→值，按键升序排列

mp[key] = value;               // 插入/修改（key 不存在则自动创建，值默认 0）
mp[key]++;                     // 计数常用写法

// 查找
if(mp.find(key) != mp.end()){ /* key 存在 */ }
if(mp.count(key)){ /* key 存在，count 返回 0 或 1 */ }

// 遍历
// C++11 写法：
for(auto &p : mp){
    int k = p.first;           // 键
    int v = p.second;          // 值
}

// 传统写法（如果你的编译器不支持 auto）：
for(map<int,int>::iterator it=mp.begin(); it!=mp.end(); ++it){
    int k = it->first;
    int v = it->second;
}

mp.erase(key);                 // 删除
mp.size();                     // 大小
mp.clear();                    // 清空
```

### 5.7 set（有序集合）⭐⭐⭐⭐

> **什么时候用？** "去重 + 排序 + 快速查找"。

```cpp
#include<set>

set<int> s;                    // 升序、不重复

s.insert(x);                   // 插入 O(log n)
s.erase(x);                    // 删除
if(s.find(x) != s.end()){ /* x 存在 */ }
if(s.count(x)){ /* x 存在 */ }
s.size(); s.empty(); s.clear();

// 遍历（自动有序）
for(int x : s){ /* ... */ }
```

### 5.8 vector（动态数组）⭐⭐⭐

> **什么时候用？** 当你不想手动 `new` 管理数组时，用 vector 更安全（自动管理大小，不会忘 `delete`）。你也可以继续用你的 `new` 写法，两者都能过题。

```cpp
#include<vector>

vector<int> v;                 // 空
vector<int> v(n);              // n 个 0
vector<int> v(n, 1);           // n 个 1

v.push_back(x);                // 尾部添加
v.pop_back();                  // 尾部删除
int size = v.size();           // 大小

// 遍历（你的风格：下标访问）
for(int i=0; i<v.size(); i++){
    cout << v[i] << " ";
}

// 排序
sort(v.begin(), v.end());
```

---

## 六、算法选择决策树（看题选算法）

> **不会选算法？先看题目关键词，再对号入座。**

### 6.1 关键词 → 算法速查

| 题目关键词 | 大概率考点 | 跳转模板 |
|-----------|-----------|---------|
| "最短" / "最少步数" | **BFS** | §7.3 |
| "所有方案" / "全部排列" / n≤20 | **DFS 暴力** | §7.3 |
| "最大值最小" / "最小值最大" | **二分答案** | §7.2 |
| "选或不选" / "背包" / "容量" | **0-1 背包 DP** | §7.5 |
| "不限制数量选物品" | **完全背包 DP** | §7.5 |
| "最长递增子序列" | **LIS** | §7.5 |
| "连通块" / "朋友圈" / "分组" | **并查集** | §7.6 |
| "去重" / "是否存在" | **set** | §5.7 |
| "统计次数" / "频率" | **map** | §5.6 |
| "每次取最大/最小" | **priority_queue** | §5.5 |
| "贪心选择" / "排序后选最优" | **贪心** | §7.4 |
| "质数" / "因数" / "素数" | **数论** | §7.7 |
| "行列" / "网格" / "地图" | **网格 DFS/BFS** | §7.3 |
| "括号" / "表达式" | **栈** | §5.4 |
| "过期/时效" | **队列** | §5.3 |
| "区间查询" / "区间和" | **前缀和** | §9 |

### 6.2 看 n 范围 → 选算法

```
n ≤ 20     → DFS 暴力全排列 / 子集枚举
n ≤ 100    → O(n³) DP
n ≤ 1000   → O(n²) DP / 简单贪心
n ≤ 10⁵    → O(n log n) sort / 二分 / 堆 / 并查集 / 前缀和
n ≤ 10⁶    → O(n) 线性扫描 / 前缀和 / 埃筛
```

---

## 七、算法模板大全

### 7.1 排序（用 sort，别手写）

```cpp
#include<algorithm>

// 结构体多关键字排序
class Node{
public:
    int score, id;
};
bool cmp(Node a, Node b){
    if(a.score != b.score) return a.score > b.score;  // 分数降序
    return a.id < b.id;                                // id 升序
}
sort(arr, arr+n, cmp);
```

### 7.2 二分查找 ⭐⭐⭐⭐

> **适用条件**：数据有序，或者能判断"左边全满足、右边全不满足"。

```cpp
// 在有序数组中查找 target
int l=0, r=n-1, ans=-1;
while(l <= r){
    int mid = l + (r-l)/2;           // 防溢出
    if(a[mid] == target){ ans=mid; break; }
    if(a[mid] < target) l = mid+1;
    else r = mid-1;
}

// 二分答案：找满足条件的最小值
int l=0, r=1e9, ans=-1;
while(l <= r){
    int mid = l + (r-l)/2;
    if(check(mid)){ ans=mid; r=mid-1; }  // 满足，尝试更小
    else l = mid+1;
}

// 二分答案：找满足条件的最大值
int l=0, r=1e9, ans=-1;
while(l <= r){
    int mid = l + (r-l)/2;
    if(check(mid)){ ans=mid; l=mid+1; }  // 满足，尝试更大
    else r = mid-1;
}
```

### 7.3 搜索算法

> **适用条件**：DFS 用于枚举所有可能（n≤20），BFS 用于最短步数（每条边权值相同）。

#### DFS 回溯框架（重点！T3/T4 拿部分分靠它）

```cpp
int n;
int *a;         // 你的风格
bool *used;

void dfs(int depth){
    if(depth == n){
        // 找到一个完整方案，处理结果
        return;
    }
    for(int i=0; i<n; i++){
        if(used[i]) continue;
        used[i] = true;
        // 选择 a[i]
        dfs(depth+1);
        used[i] = false;    // 回溯（恢复状态）
    }
}

int main(){
    // ...
    a = new int[n];
    used = new bool[n];
    for(int i=0; i<n; i++) used[i] = false;  // 初始化！
    dfs(0);
}
```

#### 网格 DFS / BFS（四方向）

```cpp
int dx[] = {-1, 1, 0, 0};   // 上、下、左、右
int dy[] = {0, 0, -1, 1};
int n, m;
bool **vis;                  // 你的风格：二维数组

// 初始化 vis
vis = new bool*[n+2];
for(int i=0; i<n+2; i++){
    vis[i] = new bool[m+2];
    for(int j=0; j<m+2; j++) vis[i][j] = false;
}

// DFS
void dfs(int x, int y){
    if(x<0 || x>=n || y<0 || y>=m) return;  // 越界
    if(vis[x][y]) return;
    vis[x][y] = true;
    for(int i=0; i<4; i++){
        int nx = x + dx[i];
        int ny = y + dy[i];
        dfs(nx, ny);
    }
}
```

#### BFS 求最短步数

```cpp
#include<queue>

int **dist;  // 距离数组，-1 表示没访问过

int bfs(int sx, int sy, int tx, int ty){
    queue<pair<int,int>> q;  // C++11 写法
    // 如果你的编译器不支持 pair<int,int> 嵌套模板：
    // queue<int> qx, qy; 分别存 x 和 y
    q.push({sx, sy});  // C++11
    dist[sx][sy] = 0;
    while(!q.empty()){
        int x = q.front().first;   // C++11
        int y = q.front().second;
        q.pop();
        if(x==tx && y==ty) return dist[x][y];
        for(int i=0; i<4; i++){
            int nx = x + dx[i];
            int ny = y + dy[i];
            if(nx<0 || nx>=n || ny<0 || ny>=m) continue;
            if(dist[nx][ny] != -1) continue;
            dist[nx][ny] = dist[x][y] + 1;
            q.push({nx, ny});
        }
    }
    return -1;  // 不可达
}
```

### 7.4 贪心算法 ⭐⭐⭐⭐

> **适用条件**：排序后每一步选当前最优就能得到全局最优。

```cpp
// 经典框架：排序 + 逐个贪心选择
bool cmp(X a, X b){ /* 按某规则排序 */ }
sort(arr, arr+n, cmp);
for(int i=0; i<n; i++){
    if(arr[i] 满足条件){
        // 贪心选择它
    }
}

// 区间选点（经典例子）
class Interval{
public:
    int l, r;
};
bool cmp(Interval a, Interval b){ return a.r < b.r; }  // 按右端点排序
sort(intervals, intervals+n, cmp);
int cnt=0, last=-1e9;
for(int i=0; i<n; i++){
    if(intervals[i].l > last){
        cnt++;
        last = intervals[i].r;
    }
}
```

### 7.5 动态规划 ⭐⭐⭐⭐⭐

> **适用条件**：题目含"最优""最大/最小""方案数"，且能从**子问题推导**。

#### 0-1 背包（每个物品选或不选）

```cpp
int n, W;             // n 件物品，总容量 W
int *w, *v;           // 重量、价值
int *dp;              // dp[j] = 容量 j 时的最大价值

w = new int[n+1];
v = new int[n+1];
dp = new int[W+1];
for(int j=0; j<=W; j++) dp[j] = 0;  // 初始化！

for(int i=1; i<=n; i++){
    for(int j=W; j>=w[i]; j--){     // 倒序！
        if(dp[j-w[i]] + v[i] > dp[j])
            dp[j] = dp[j-w[i]] + v[i];
    }
}
int ans = dp[W];
```

> **记忆技巧**：0-1 背包倒序，完全背包正序。只差一个循环方向。

#### 完全背包（每种物品无限取）

```cpp
for(int j=0; j<=W; j++) dp[j] = 0;
for(int i=1; i<=n; i++){
    for(int j=w[i]; j<=W; j++){     // 正序！
        if(dp[j-w[i]] + v[i] > dp[j])
            dp[j] = dp[j-w[i]] + v[i];
    }
}
```

#### 最长上升子序列 LIS

```cpp
int n;
int *a;  // 输入数组
int *dp; // dp[i] = 以 a[i] 结尾的 LIS 长度

dp = new int[n];
for(int i=0; i<n; i++) dp[i] = 1;  // 初始化！每个元素自身构成长度 1

for(int i=0; i<n; i++){
    for(int j=0; j<i; j++){
        if(a[j] < a[i] && dp[j]+1 > dp[i])
            dp[i] = dp[j] + 1;
    }
}
int ans = 0;
for(int i=0; i<n; i++)
    if(dp[i] > ans) ans = dp[i];
```

#### 数字三角形（DP 入门经典）

```cpp
int n;
int **a, **dp;
// 读入 a[0..n-1][0..i]
// 自底向上 dp
for(int j=0; j<n; j++) dp[n-1][j] = a[n-1][j];
for(int i=n-2; i>=0; i--){
    for(int j=0; j<=i; j++){
        int left = dp[i+1][j];
        int right = dp[i+1][j+1];
        dp[i][j] = a[i][j] + (left > right ? left : right);
    }
}
int ans = dp[0][0];
```

### 7.6 图论 ⭐⭐⭐

#### 邻接表建图（最常用）

```cpp
#include<vector>
const int N = 1e5 + 10;
vector<pair<int,int>> g[N];  // g[u] = {v, w}

void addEdge(int u, int v, int w){
    g[u].push_back({v, w});
    // 无向图加：g[v].push_back({u, w});
}
```

#### Dijkstra 最短路（非负权）⭐⭐⭐⭐

```cpp
#include<queue>
#include<vector>

int *dist;
bool *vis;

void dijkstra(int s, int n){
    dist = new int[n+1];
    vis = new bool[n+1];
    for(int i=1; i<=n; i++){ dist[i]=2e9; vis[i]=false; }
    dist[s] = 0;

    priority_queue<pair<int,int>, vector<pair<int,int>>, greater<pair<int,int>>> pq;
    pq.push({0, s});

    while(!pq.empty()){
        int u = pq.top().second;
        int d = pq.top().first;
        pq.pop();
        if(vis[u]) continue;
        vis[u] = true;
        for(int i=0; i<g[u].size(); i++){
            int v = g[u][i].first;
            int w = g[u][i].second;
            if(dist[u] + w < dist[v]){
                dist[v] = dist[u] + w;
                pq.push({dist[v], v});
            }
        }
    }
}
```

#### 并查集 ⭐⭐⭐⭐

> **适用条件**："连通""分组""是否在同一集合"。T2/T3 常考。

```cpp
int *fa;

void init(int n){
    fa = new int[n+1];
    for(int i=1; i<=n; i++) fa[i] = i;
}

int find(int x){
    if(fa[x] == x) return x;
    return fa[x] = find(fa[x]);  // 路径压缩
}

void unite(int x, int y){
    fa[find(x)] = find(y);
}

bool same(int x, int y){
    return find(x) == find(y);
}
```

### 7.7 数学 & 数论 ⭐⭐⭐

```cpp
// 最大公约数
int gcd(int a, int b){
    if(b == 0) return a;
    return gcd(b, a%b);
}

// 最小公倍数（先除后乘防溢出）
int lcm(int a, int b){
    return a / gcd(a, b) * b;
}

// 快速幂（a^b % mod）
int qpow(int a, int b, int mod){
    int res = 1;
    while(b){
        if(b & 1) res = (long long)res * a % mod;  // 注意防溢出
        a = (long long)a * a % mod;
        b = b >> 1;
    }
    return res;
}

// 质数判断 O(√n)
bool isPrime(int x){
    if(x < 2) return false;
    for(int i=2; i*i<=x; i++){  // i*i 可能溢出，改用 i<=x/i
        if(x % i == 0) return false;
    }
    return true;
}

// 埃筛：标记 1~n 中所有质数
bool *notPrime;
notPrime = new bool[n+1];
for(int i=0; i<=n; i++) notPrime[i] = false;
notPrime[0] = notPrime[1] = true;
for(int i=2; i<=n; i++){
    if(!notPrime[i]){
        for(int j=i*2; j<=n; j+=i)
            notPrime[j] = true;
    }
}
```

### 7.8 字符串数字提取（T1-T3 常考）

```cpp
// 从字符串中提取所有数字
#include<string>

string s;
cin >> s;
int i = 0;
while(i < s.length()){
    if(s[i]>='0' && s[i]<='9'){  // 你的风格：不用 isdigit
        int num = 0;
        while(i < s.length() && s[i]>='0' && s[i]<='9'){
            num = num * 10 + (s[i] - '0');
            i++;
        }
        // num 就是提取出的数字
    }
    else{
        i++;
    }
}
```

---

## 八、五题策略 & 得分公式

| 题号 | 目标分 | 时间 | 典型考点 | 策略 |
|------|--------|------|----------|------|
| **T1** | **100** | ≤30min | 模拟、数学规律、简单字符串 | **必须满分**。找规律优于暴力，long long，特判边界 |
| **T2** | **100** | ≤50min | 排序、贪心、简单模拟 | **争取满分**。用 sort 别手写，注意整数除法强转 |
| **T3** | **50** | ≤80min | 字符串解析、搜索、简单DP | **写对部分分**。DFS 暴力能拿 30-50 分 |
| **T4** | **50** | ≤70min | 动态规划、数据结构 | **暴力/贪心骗分**。不会就写搜索拿部分分 |
| **T5** | **10** | ≤10min | 高级算法 | **骗分模板**：特判+输出样例 |
| 检查 | — | 10min | — | 逐项检查 |

### T1（满分策略）

- 直接 `int` 即可（数据通常 < 20 亿）
- 先想数学规律，不要无脑暴力循环
- 特判：n=0, n=1, 全相等, 全不同

### T2（满分策略）

- **用 `sort()` 替代手写排序**（避免越界）
- **整数除法必须 `(double)` 强转**（你最常犯的错）
- 贪心策略：按某种优先级排序后依次选
- 注意：`int sum` 还是 `double sum`？看题目输出是什么

### T3、T4（50分策略）

**拿部分分三板斧：**

```cpp
// 板斧1：DFS 暴力枚举（n≤20 时全对）
void dfs(int depth){ /* 全排列 / 子集枚举 */ }

// 板斧2：特判小数据范围
if(n <= 10){ /* 暴力 */ }
else{ /* 贪心近似 */ }

// 板斧3：输出样例碰运气
if(满足样例条件) cout << 样例答案 << endl;
```

### T5（10分策略）

```cpp
if(n == 1) cout << "合理答案" << endl;
else cout << "0" << endl;
```

---

## 九、你的习惯导致的常见报错 & 修复

### 9.1 WA（答案错误）

| 你的习惯 | 为什么 WA | 修复方式 |
|---------|----------|---------|
| `a/b` 两个 int 相除赋给 double | 结果是截断的整数 | `(double)a / b` |
| `int sum=0;` 但答案需要小数 | int 存不了小数 | 改用 `double sum=0.0;` |
| `int sum;` 不初始化 | 值是随机的垃圾值 | `int sum=0;` |
| `for(j=n; j>i; j--)` | j=n 时数组越界 | `for(j=n-1; j>i; j--)` |
| 手动排序嵌套 if-else | 逻辑绕，容易写错条件 | 用 `sort()` + `cmp()` |
| 循环中 `break` 后忘记处理剩余数据 | 剩余部分没计算 | 去掉 break，改成条件判断 |

### 9.2 RE（运行错误，最可能是数组越界）

| 你的习惯 | 为什么 RE | 修复方式 |
|---------|----------|---------|
| `a = new int[n];` 后访问 `a[n]` | 下标范围是 [0, n-1] | 循环边界设为 `i<n` 或 `j=n-1` |
| 循环从 `j=n` 开始 | 同上 | `j=n-1` |
| `new int[n]` 但 n=0 | 无法分配 | 先判断 n>0 |
| 递归太深（如 DFS 无终止条件） | 栈溢出 | 检查终止条件和剪枝 |

### 9.3 TLE（超时）

| 你的习惯 | 为什么 TLE | 修复方式 |
|---------|----------|---------|
| 手动冒泡排序 O(n²)，n=10⁵ | O(n²) 在 1 秒内处理不了 10⁵ | 用 `sort()` O(n log n) |
| 嵌套 for 循环 O(n²)，n=10⁵ | 同上 | 用 map/set/二分/前缀和优化 |
| DFS 没有剪枝，搜索空间太大 | 搜索了所有可能 | 加剪枝条件提前返回 |
| 每次都重新算 `f(n)`（如 T4 的递归 f） | 重复计算 | 用记忆化或找数学规律 |

### 9.4 CE（编译错误）

| 你的习惯 | 为什么 CE | 修复方式 |
|---------|----------|---------|
| `a[]` 作为函数参数 | `[]` 不能出现在调用中 | 传 `a` 即可 |
| 类名和变量名混淆（如 `op* mop` 但写 `op[i]`） | `op` 是类名不是变量 | 统一用变量名 `mop[i]` |
| 变量没声明就使用（如 `if(t==1)` 但 t 未定义） | 编译器找不到 t | 先声明再使用 |

### 9.5 输出格式错误

| 你的习惯 | 为什么错 | 修复方式 |
|---------|----------|---------|
| `cout << sum;` 但 sum 是 int | 输出整数而非要求的小数 | 用 `double`，加 `<< fixed << setprecision(6)` |
| 多输出了调试用的 `cout` | 干扰评测 | 提交前全部注释掉 |
| 忘记换行 | 多个答案挤在一行 | 每个答案后 `<< endl` |

---

## 十、时间复杂度速查

| n 的范围 | 可接受算法 | 常见算法 |
|----------|-----------|----------|
| n ≤ 10 | O(n!) | 全排列、DFS 暴力 |
| n ≤ 20 | O(2ⁿ) | 子集枚举、状态压缩 |
| n ≤ 100 | O(n³) | Floyd、区间 DP |
| n ≤ 1000 | O(n²) | 简单 DP、你的手动排序（但建议用 sort） |
| n ≤ 10⁵ | O(n log n) | sort、二分、并查集、堆 |
| n ≤ 10⁶ | O(n) | 线性扫描、前缀和、埃筛 |

> **经验法则**：CSP 中 1 秒约 10⁷~10⁸ 次基本操作。n=10⁵ 时 O(n²) 必超时（你的手动冒泡在 n=10⁵ 时跑不完）。

### 你的代码习惯对应的时间复杂度

| 你的写法 | 时间复杂度 | n 多大时安全 |
|---------|-----------|------------|
| 手动冒泡排序 | O(n²) | n ≤ 5000 |
| `sort()` | O(n log n) | n ≤ 10⁶ |
| 嵌套 for 循环 | O(n²) | n ≤ 5000 |
| map/set 操作 | O(log n) per op | 很安全 |
| new 数组 + 线性遍历 | O(n) | 很安全 |

---

## 📋 考试时间线

```
09:00  快速浏览 5 题（5min）
09:05  T1 开始（目标 30min，100 分）
09:35  T2 开始（目标 50min，100 分）
10:25  T3 开始（先写暴力拿部分分）
11:30  T4 开始（暴力 / DP，目标 50 分）
12:20  T5 骗分（特判 + 样例）
12:30  全面检查（freopen、文件名、输出格式、调试输出）
13:00  考试结束
```

## 🚨 最后 10 分钟检查清单

```
1. freopen 有没有？两行都写了吗？
2. 文件名和文件夹名对吗？
3. 调试 cout 删了吗？
4. 整数除法强转 (double) 了吗？
5. 局部变量初始化了吗？
6. 数组下标有没有越界（new int[n] 的访问范围是 [0, n-1]）？
7. 需要小数时 sum 是 double 不是 int？
```

---

*手册适配你的编程习惯：`#include<iostream>` + `new` 数组 + `cin/cout` + 0-based 索引*
*整理自 CSP-J/S 历年真题分析、CSDN 考前复习资料、GitHub @mingyush/csp 仓库*
*最后更新：2025年*
