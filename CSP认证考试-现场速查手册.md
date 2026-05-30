# CSP 认证考试 — 现场速查手册

> **目标分数**：T1满分(100) + T2满分(100) + T3(50) + T4(50) + T5(10) = **310 分**
> 打印双面携带，考前反复熟悉，考中快速定位。

---

## 目录速查

| 章节 | 内容 | 页码 |
|------|------|------|
| **零** | 防爆零检查清单（考前必读） | 1 |
| **一** | 模板头文件 & 文件IO | 1 |
| **二** | 变量类型速查 & 格式化输出 | 1-2 |
| **三** | STL 容器速查（含何时使用） | 2-4 |
| **四** | 算法选择决策树（看题选算法） | 4-5 |
| **五** | 算法模板大全 | 5-8 |
| **六** | 五题策略 & 得分公式 | 8-9 |
| **七** | 常见陷阱 & 调试技巧 | 9 |
| **八** | 时间复杂度速查 | 10 |

---

## 零、防爆零检查清单 ⚠️

**此为 0 分与 300+ 分的区别，考前逐条默念！**

### 提交前必查（逐题检查）

```
□ freopen("problem.in","r",stdin);   // 必须有！
□ freopen("problem.out","w",stdout);  // 必须有！
□ 文件名是否正确（严格大小写）
□ 文件夹命名：准考证号/T1英文名/T1英文名.cpp
□ 调试用的 cout/printf 是否已注释或删除
□ 考号、文件夹名是否正确
```

### 代码自查清单

```
□ 数组大小是否 ≥ 数据范围的 110%（const int N = 1e5+10）
□ 是否用了 long long（数据 > 2e9 时必用）
□ 局部变量是否初始化（int sum = 0）
□ 循环边界是否正确（0-based vs 1-based）
□ 输出格式：空格/换行是否与题目一致
```

### 文件模板（直接复制用）

```cpp
#include <bits/stdc++.h>
using namespace std;
#define int long long  // 全局开 long long 防溢出
const int N = 1e5 + 10;

signed main() {  // 用了 #define int long long 则必须 signed main
    freopen("problem.in", "r", stdin);
    freopen("problem.out", "w", stdout);

    // 代码...

    return 0;
}
```

---

## 一、模板头文件 & 常用宏

```cpp
#include <bits/stdc++.h>
using namespace std;
#define int long long
#define endl '\n'        // 比 endl 快（不强制刷新）
#define IOS ios::sync_with_stdio(false); cin.tie(0); cout.tie(0)

const int N = 1e5 + 10;
const int INF = 0x3f3f3f3f3f3f3f3f;  // long long 的无穷大
const int MOD = 1e9 + 7;

// 读入优化（数据量大时使用）
inline int read() {
    int x = 0, f = 1; char ch = getchar();
    while (ch < '0' || ch > '9') { if (ch == '-') f = -1; ch = getchar(); }
    while (ch >= '0' && ch <= '9') { x = x * 10 + ch - '0'; ch = getchar(); }
    return x * f;
}
```

> **注意**：使用 `IOS` 后不能混用 `scanf/printf` 和 `cin/cout`！大量数据优先用 `scanf/printf`。

---

## 二、变量类型速查 & 格式化输出

### 2.1 一句话选类型（经验法则）

```
数据范围 < 2×10⁹           →  int         （约 21 亿以内，直接 int）
数据范围 > 2×10⁹           →  long long   （必须！否则溢出 WA）
数据范围 > 10¹⁸            →  unsigned long long 或 __int128（CSP 几乎不考）

有小数的计算              →  double      （默认用 double，别用 float）
钱 / 精确小数（保留2位）  →  用整数做     （乘 100 转整数，输出时手动加小数点）
```

### 2.2 各类型范围对照表

| 类型 | 最大值（约） | 占字节 | 一句话 |
|------|------------|--------|--------|
| `int` | **2.1×10⁹** (2147483647) | 4 | CSP 最常用，**数据＜20亿用这个** |
| `long long` | **9.2×10¹⁸** | 8 | **超过 20亿必须用！防溢出神器** |
| `unsigned int` | 4.2×10⁹ | 4 | 不常用 |
| `unsigned long long` | 1.8×10¹⁹ | 8 | 极少用 |
| `float` | ~3.4×10³⁸ (6位精度) | 4 | **别用！精度不够** |
| `double` | ~1.7×10³⁰⁸ (15位精度) | 8 | **浮点数默认用这个** |
| `char` | -128 ~ 127 | 1 | 单个字符 |
| `bool` | true/false | 1 | 标记用 |
| `string` | 不限 | — | 字符串 |

### 2.3 格式化输出速查（printf 版，推荐）

```cpp
// 整数输出
printf("%d", x);          // int
printf("%lld", x);        // long long （注意是 %lld，不是 %d！）
printf("%u", x);          // unsigned int

// 小数输出（重点！）
printf("%.2f", x);        // 保留 2 位小数，例 3.14
printf("%.6f", x);        // 保留 6 位小数
printf("%.0f", x);        // 四舍五入到整数，例 3.0
printf("%f", x);          // 默认 6 位小数
printf("%.2lf", x);       // double 同理（%.2f 和 %.2lf 通用）

// 格式控制
printf("%5d", x);         // 右对齐占 5 格（不足补空格）
printf("%05d", x);        // 右对齐占 5 格（不足补 0），例 00042
printf("%-5d", x);        // 左对齐占 5 格

// 科学计数法
printf("%e", x);          // 例 1.234568e+03
```

### 2.4 格式化输出速查（cout 版）

```cpp
#include <iomanip>  // 必须加这个头文件！

cout << fixed << setprecision(2) << x;   // 保留 2 位小数，如 3.14
cout << fixed << setprecision(6) << x;   // 保留 6 位小数
cout << setw(5) << x;                    // 占 5 格右对齐
cout << setfill('0') << setw(5) << x;    // 占 5 格补 0

// 一次性设置所有小数格式（写在 main 开头即可）
cout << fixed << setprecision(2);
// 之后所有 cout 的小数都会保留 2 位
```

### 2.5 常见输出坑

```cpp
// ❌ 坑1：用 %d 输出 long long → WA
long long x = 1e10;
printf("%d", x);          // 错！输出乱码
printf("%lld", x);        // 对！

// ❌ 坑2：浮点数比较相等
double a = 0.1 + 0.2;
if (a == 0.3) ...         // 错！浮点精度问题
if (fabs(a - 0.3) < 1e-9) // 对！用差值小于极小值判断

// ❌ 坑3：整数除法结果当小数
int a = 5, b = 2;
double c = a / b;         // c = 2.0，不是 2.5！
double c = 1.0 * a / b;   // 对！c = 2.5
```

---

## 三、STL 容器速查（含何时使用）

### 3.1 vector（动态数组）⭐⭐⭐⭐⭐

> **什么时候用？** 90% 的情况都用它。存数据、DP 状态、图的邻接表、排序——统统 vector。它就是你的默认容器。

```cpp
// 初始化
vector<int> v;                  // 空
vector<int> v(n);               // n 个 0
vector<int> v(n, 1);            // n 个 1
vector<int> v{1,2,3,4,5};       // 列表初始化

// 常用操作
v.push_back(x);                 // 尾部加 O(1)
v.pop_back();                   // 尾部删 O(1)
v.size();                       // 大小 O(1)
v.empty();                      // 判空 O(1)
v.clear();                      // 清空 O(n)
v.front(); v.back();            // 首/尾 O(1)
v.insert(v.begin()+i, x);       // 位置 i 插入 O(n)
v.erase(v.begin()+i);           // 位置 i 删除 O(n)
v.resize(n, val);               // 改变大小，新元素=val

// 排序
sort(v.begin(), v.end());                       // 升序
sort(v.begin(), v.end(), greater<int>());       // 降序
sort(v.begin()+1, v.end());                     // 从下标1开始排序

// 遍历
for (int x : v) { /* ... */ }
for (auto it = v.begin(); it != v.end(); ++it) { int x = *it; }

// 去重（需先排序）
sort(v.begin(), v.end());
v.erase(unique(v.begin(), v.end()), v.end());
```

### 3.2 stack（栈）⭐⭐⭐

> **什么时候用？** "后进先出"的场景——括号匹配、表达式求值、DFS 非递归版。

```cpp
stack<int> st;
st.push(x);     // 入栈 O(1)
st.pop();       // 出栈 O(1)（不返回值）
st.top();       // 栈顶 O(1)
st.empty();     // 判空 O(1)
st.size();      // 大小 O(1)

// 遍历（边出栈边访问）
while (!st.empty()) { int tp = st.top(); st.pop(); /* ... */ }
```

### 3.3 queue（队列）⭐⭐⭐

> **什么时候用？** "先进先出"——BFS（最短步数）、模拟排队、滑动窗口（配合 deque）。

```cpp
queue<int> q;
q.push(x);      // 入队 O(1)
q.pop();        // 出队 O(1)
q.front();      // 队首 O(1)
q.back();       // 队尾 O(1)
q.empty();      // 判空 O(1)
q.size();       // 大小 O(1)
```

### 3.4 priority_queue（优先队列/堆）⭐⭐⭐⭐

> **什么时候用？** "每次取最大/最小"——动态维护最值、Dijkstra 最短路、合并多个有序序列。**看到"最大值""最小值""第 K 大"就想到它。**

```cpp
// 大根堆（默认）
priority_queue<int> pq;                           // top 是最大值

// 小根堆（两种写法）
priority_queue<int, vector<int>, greater<int>> pq; // top 是最小值
// 或用负值技巧：pq.push(-x); ans = -pq.top();

pq.push(x);     // 入堆 O(log n)
pq.pop();       // 删堆顶 O(log n)
pq.top();       // 堆顶 O(1)
pq.empty();     // 判空 O(1)
pq.size();      // 大小 O(1)

// 结构体优先队列（自定义比较）
struct Node { int val, idx; };
struct cmp { bool operator()(Node a, Node b) { return a.val > b.val; } };
priority_queue<Node, vector<Node>, cmp> pq;       // 小根堆
```

### 3.5 map（有序映射）⭐⭐⭐⭐

> **什么时候用？** "按键查找/计数"——统计频率、坐标压缩、两数之和、DNS 映射。**看到"统计次数""是否存在""一一对应"就用它。**

```cpp
map<int, int> mp;                // 按键升序，O(log n)
unordered_map<int, int> ump;     // 无序，O(1) 平均（CSP 慎用，可能被卡）

// 插入 & 访问
mp[key] = value;                 // 不存在则自动创建（值默认0）
mp.insert({key, value});

// 查找
if (mp.find(key) != mp.end()) { /* 存在 */ }
if (mp.count(key)) { /* 存在 */ }  // 返回 0 或 1

// 删除
mp.erase(key);                   // O(log n)
mp.erase(it);                    // O(1)

// 遍历
for (auto &p : mp) { int k = p.first, v = p.second; }
for (auto it = mp.begin(); it != mp.end(); ++it) { it->first; it->second; }

// 范围查询
auto it = mp.lower_bound(k);     // >= k 的第一个
auto it = mp.upper_bound(k);     // > k 的第一个

mp.size(); mp.clear(); mp.empty();
```

### 3.6 set（有序集合）⭐⭐⭐⭐

> **什么时候用？** "去重 + 排序 + 快速查找"——判断元素是否存在、范围查询。**看到"去重""不重复的元素""快速判断有没有"就用它。**

```cpp
set<int> s;                      // 升序、不重复 O(log n)
multiset<int> ms;                // 升序、可重复
set<int, greater<int>> s2;       // 降序

s.insert(x);                     // O(log n)
s.erase(x);                      // O(log n)，multiset 中删除所有 x
s.erase(s.find(x));              // multiset 中只删一个 x
s.find(x);                       // 返回迭代器，不存在返回 s.end()
s.count(x);                      // 是否存在（set 中为 0/1）
s.empty(); s.size(); s.clear();

// 范围查询
auto it = s.lower_bound(k);      // >= k 的第一个
auto it = s.upper_bound(k);      // > k 的第一个

// 遍历（自动有序）
for (int x : s) { /* ... */ }
```

### 3.7 pair ⭐⭐

> **什么时候用？** 两个值绑在一起——坐标 (x,y)、键值对 (id, score)、图里存 (邻节点, 边权)。

```cpp
pair<int, int> p = {1, 2};
p = make_pair(1, 2);
p.first; p.second;

// 排序：默认按 first 升序，first 相同按 second 升序
vector<pair<int,int>> vp;
sort(vp.begin(), vp.end());
```

### 3.8 string ⭐⭐⭐⭐

> **什么时候用？** 处理文本——解析输入、提取数字、查找子串、拼接字符串。**T1-T3 几乎必考字符串处理。**

```cpp
string s;
cin >> s;                        // 遇空格/回车停止
getline(cin, s);                 // 读整行（含空格）

s.length(); s.size();            // 长度
s.empty();                       // 判空
s += "abc"; s.append("abc");    // 拼接
s.push_back('a');                // 末尾加字符
s.substr(pos, len);              // 取子串，len 可省略（取到末尾）
s.find("ab"); s.find("ab", pos); // 查找子串，返回位置或 string::npos
s.rfind("ab");                   // 反向查找
s.replace(pos, len, str);        // 替换
s.erase(pos, len);               // 删除
s.insert(pos, str);              // 插入
s.clear();                       // 清空

// 数值转换
int x = stoi(s);                 // 字符串转 int
long long x = stoll(s);          // 字符串转 long long
string s = to_string(x);         // 数值转字符串

// 大小写转换
transform(s.begin(), s.end(), s.begin(), ::tolower);
transform(s.begin(), s.end(), s.begin(), ::toupper);

// 按 ASCII 排序
sort(s.begin(), s.end());

// 字符串分割（手动实现）
stringstream ss(str);
string token;
while (getline(ss, token, ',')) { /* 按逗号分割 */ }
```

### 3.9 algorithm 常用函数

> **这些函数都在 `#include <algorithm>` 和 `#include <bits/stdc++.h>` 中，直接用。**

```cpp
sort(a, a+n);                    // 数组排序 [0, n)
sort(v.begin(), v.end());        // vector 排序
reverse(a, a+n);                 // 翻转
reverse(v.begin(), v.end());
max(a, b); min(a, b);            // 两个值
max({a, b, c});                  // 多个值
swap(a, b);                      // 交换
unique(v.begin(), v.end());      // 去重（需先排序）+ 配合 erase
lower_bound(a, a+n, x);          // >= x 的第一个位置
upper_bound(a, a+n, x);          // > x 的第一个位置
binary_search(a, a+n, x);        // 是否存在 x
next_permutation(a, a+n);        // 下一个排列（全排列枚举）
fill(a, a+n, val);               // 填充值
memset(a, 0, sizeof a);          // 字节填充（仅 0 和 -1 正确）
__gcd(a, b);                     // GCC 内置最大公约数
abs(x);                          // 绝对值，long long 用 llabs
```

---

## 四、算法选择决策树（看题选算法）

> **不会选算法？先看题目的"关键词"，再对号入座。**

### 4.1 看题选算法——关键词速查

| 题目关键词 / 描述 | 大概率考点 | 跳转到模板 |
|---|---|---|
| "最短" / "最少步数" / "最少次数" | **BFS**（网格最短路）或 **Dijkstra**（带权最短路） | §5.3 BFS / §5.6 Dijkstra |
| "所有方案" / "全部排列" / "全部组合" / n≤20 | **DFS 暴力枚举** | §5.3 DFS 回溯 |
| "最大值最小" / "最小值最大" / "满足条件的最大/小值" | **二分答案** | §5.2 二分 |
| "选或不选" / "装入背包" / "有限容量" | **0-1 背包 DP** | §5.5 0-1 背包 |
| "不限制数量"选物品（每种无限） | **完全背包 DP** | §5.5 完全背包 |
| "最长/最大递增" / "子序列" | **LIS（最长上升子序列）** | §5.5 LIS |
| "前 i 个和后 j 个的 LCS" | **LCS（最长公共子序列）** | §5.5 LCS |
| "连通块" / "朋友圈" / "是否属于同一组" | **并查集** | §5.6 并查集 |
| "去重" / "是否存在" / "快速查找" | **set** | §3.6 |
| "统计次数" / "频率" / "一一映射" | **map** | §3.5 |
| "每次取最大/最小" / "第 K 大" | **priority_queue** | §3.4 |
| "贪心选择" / "局部最优" / "排序后贪心" | **贪心** | §5.4 |
| "质数" / "因数" / "素数" | **数论（筛法、质数判断）** | §5.7 |
| "行列" / "网格" / "地图" | **网格 DFS/BFS** | §5.3 网格搜索 |
| "括号" / "表达式" | **栈** | §3.2 |
| "先到先服务" / "缓存 / 过期" | **队列** | §3.3 |
| "前缀区间查询" | **前缀和** | §7.3 |

### 4.2 算法选择三步法

```
第一步：看 n 的范围
  n ≤ 20     → DFS 暴力全排列 / 子集枚举（稳拿部分分）
  n ≤ 100    → O(n³) DP / Floyd
  n ≤ 1000   → O(n²) DP / 简单贪心
  n ≤ 10⁵    → O(n log n) 排序 / 二分 / 堆 / 并查集 / 前缀和
  n ≤ 10⁶    → O(n) 线性扫描 / 前缀和 / 埃筛

第二步：看题目问法
  "最优解/最大值/最小值"   → DP 或 贪心 或 二分
  "是否存在" / "判断"      → set / map / 并查集
  "计数/方案数"            → DP 或 DFS
  "路径/最短/最少步数"     → BFS / Dijkstra

第三步：看数据特征
  有排序需求          → sort + 贪心
  有"时效性"数据      → queue（过期出队）
  有序数组中查找      → 二分
  多个互斥状态         → DP
```

---

## 五、算法模板大全

### 3.1 排序算法

```cpp
// 结构体多关键字排序
struct Node { int score, id; };
bool cmp(Node a, Node b) {
    if (a.score != b.score) return a.score > b.score;  // 分数降序
    return a.id < b.id;                                 // id 升序
}
sort(arr, arr+n, cmp);
```

### 3.2 二分查找 ⭐⭐⭐⭐

```cpp
// 在有序数组 [l, r] 中找 target 的下标，找不到返回 -1
int binarySearch(int arr[], int n, int target) {
    int l = 0, r = n - 1;
    while (l <= r) {
        int mid = l + (r - l) / 2;   // 防溢出
        if (arr[mid] == target) return mid;
        if (arr[mid] < target) l = mid + 1;
        else r = mid - 1;
    }
    return -1;
}

// 二分答案：找满足条件的最小值（左边界模板）
int l = 0, r = 1e9, ans = -1;
while (l <= r) {
    int mid = l + (r - l) / 2;
    if (check(mid)) { ans = mid; r = mid - 1; }  // 满足，尝试更小
    else l = mid + 1;
}

// 二分答案：找满足条件的最大值（右边界模板）
int l = 0, r = 1e9, ans = -1;
while (l <= r) {
    int mid = l + (r - l) / 2;
    if (check(mid)) { ans = mid; l = mid + 1; }  // 满足，尝试更大
    else r = mid - 1;
}

// 浮点数二分（精度控制）
double l = 0, r = 1e9;
while (r - l > 1e-6) {  // 迭代 60 次也可
    double mid = (l + r) / 2.0;
    if (check(mid)) r = mid; else l = mid;
}
```

### 3.3 搜索算法

#### DFS（深度优先搜索）⭐⭐⭐⭐

```cpp
int n, ans;
bool vis[N];
vector<int> g[N];  // 邻接表

void dfs(int u) {
    vis[u] = true;
    for (int v : g[u]) {
        if (!vis[v]) dfs(v);
    }
}

// DFS 回溯框架（排列/组合/子集）
void dfs(int depth) {
    if (depth == n) {
        // 处理结果
        return;
    }
    for (int i = 0; i < n; i++) {
        if (used[i]) continue;
        // 可选：剪枝判断
        used[i] = true;
        path.push_back(a[i]);
        dfs(depth + 1);
        path.pop_back();         // 回溯
        used[i] = false;
    }
}

// 网格 DFS（四方向）
int dx[] = {-1, 1, 0, 0};
int dy[] = {0, 0, -1, 1};
int n, m;
bool vis[1010][1010];

void dfs(int x, int y) {
    if (x < 1 || x > n || y < 1 || y > m) return;  // 越界
    if (vis[x][y]) return;                           // 已访问
    vis[x][y] = true;
    for (int i = 0; i < 4; i++) {
        int nx = x + dx[i], ny = y + dy[i];
        dfs(nx, ny);
    }
}
```

#### BFS（广度优先搜索）⭐⭐⭐⭐

```cpp
// 网格 BFS 求最短步数
int dx[] = {-1, 1, 0, 0}, dy[] = {0, 0, -1, 1};
int dist[1010][1010];
memset(dist, -1, sizeof dist);

int bfs(int sx, int sy, int tx, int ty) {
    queue<pair<int,int>> q;
    q.push({sx, sy});
    dist[sx][sy] = 0;
    while (!q.empty()) {
        auto [x, y] = q.front(); q.pop();
        if (x == tx && y == ty) return dist[x][y];
        for (int i = 0; i < 4; i++) {
            int nx = x + dx[i], ny = y + dy[i];
            if (nx < 1 || nx > n || ny < 1 || ny > m) continue;
            if (dist[nx][ny] != -1) continue;
            dist[nx][ny] = dist[x][y] + 1;
            q.push({nx, ny});
        }
    }
    return -1;  // 不可达
}
```

#### BFS 常用技巧：记忆化搜索 ⭐⭐⭐

```cpp
map<pair<int,int>, int> memo;  // 或 map<string, int>

int dfs(int pos, int state) {
    auto key = make_pair(pos, state);
    if (memo.count(key)) return memo[key];
    // 计算结果...
    return memo[key] = result;
}
```

### 3.4 贪心算法 ⭐⭐⭐⭐

```cpp
// 经典贪心框架：排序 + 逐个选最优
sort(arr, arr+n, cmp);  // 按某种规则排序
for (int i = 0; i < n; i++) {
    if (arr[i] 满足条件)  // 贪心选择
        // 处理...
}

// 区间选点问题（选最少的点覆盖所有区间）
struct Interval { int l, r; };
bool cmp(Interval a, Interval b) { return a.r < b.r; }  // 按右端点排序
sort(intervals, intervals+n, cmp);
int cnt = 0, last = -INF;
for (int i = 0; i < n; i++) {
    if (intervals[i].l > last) {
        cnt++;
        last = intervals[i].r;
    }
}
```

### 3.5 动态规划 ⭐⭐⭐⭐⭐

#### 0-1 背包

```cpp
// dp[j] = 容量为 j 时的最大价值
int n, W;  // n 件物品，容量 W
int w[N], v[N];  // 重量，价值
int dp[N];       // 一维滚动数组

memset(dp, 0, sizeof dp);
for (int i = 1; i <= n; i++) {
    for (int j = W; j >= w[i]; j--) {  // 倒序！
        dp[j] = max(dp[j], dp[j - w[i]] + v[i]);
    }
}
int ans = dp[W];
```

#### 完全背包

```cpp
// 每件物品可无限次取
memset(dp, 0, sizeof dp);
for (int i = 1; i <= n; i++) {
    for (int j = w[i]; j <= W; j++) {  // 正序！
        dp[j] = max(dp[j], dp[j - w[i]] + v[i]);
    }
}
```

#### 多重背包（二进制优化）

```cpp
// 第 i 种物品有 s[i] 件，重量 w[i]，价值 v[i]
vector<int> new_w, new_v;
for (int i = 1; i <= n; i++) {
    int k = 1;
    while (s[i] >= k) {
        new_w.push_back(w[i] * k);
        new_v.push_back(v[i] * k);
        s[i] -= k;
        k *= 2;
    }
    if (s[i] > 0) {
        new_w.push_back(w[i] * s[i]);
        new_v.push_back(v[i] * s[i]);
    }
}
// 转成 0-1 背包
for (int i = 0; i < new_w.size(); i++)
    for (int j = W; j >= new_w[i]; j--)
        dp[j] = max(dp[j], dp[j - new_w[i]] + new_v[i]);
```

#### 最长上升子序列 LIS

```cpp
// O(n log n) 贪心+二分
vector<int> tails;
for (int x : arr) {
    auto it = lower_bound(tails.begin(), tails.end(), x);
    if (it == tails.end()) tails.push_back(x);
    else *it = x;
}
int ans = tails.size();
```

#### 最长公共子序列 LCS

```cpp
// O(n*m)，dp[i][j] = a 前 i 和 b 前 j 的 LCS 长度
int dp[N][N];
for (int i = 1; i <= la; i++) {
    for (int j = 1; j <= lb; j++) {
        if (a[i] == b[j]) dp[i][j] = dp[i-1][j-1] + 1;
        else dp[i][j] = max(dp[i-1][j], dp[i][j-1]);
    }
}
```

#### 数字三角形（经典 DP）

```cpp
// 从顶向下，求最大路径和
int a[N][N], dp[N][N];
for (int i = 1; i <= n; i++)
    for (int j = 1; j <= i; j++)
        cin >> a[i][j];

// 自底向上
for (int j = 1; j <= n; j++) dp[n][j] = a[n][j];
for (int i = n-1; i >= 1; i--)
    for (int j = 1; j <= i; j++)
        dp[i][j] = a[i][j] + max(dp[i+1][j], dp[i+1][j+1]);

int ans = dp[1][1];
```

### 3.6 图论 ⭐⭐⭐

#### 建图

```cpp
// 邻接矩阵：int g[N][N]; （n <= 5000 可用）
// 邻接表：vector<pair<int,int>> g[N];  // g[u] = {v, w}
vector<pair<int,int>> g[N];  // 最常用
void addEdge(int u, int v, int w) {
    g[u].push_back({v, w});
    // 无向图加：g[v].push_back({u, w});
}
```

#### Dijkstra 最短路（非负权）⭐⭐⭐⭐

```cpp
int dist[N];
bool vis[N];

void dijkstra(int s) {
    memset(dist, 0x3f, sizeof dist);
    memset(vis, 0, sizeof vis);
    dist[s] = 0;
    // 小根堆：{距离, 节点}
    priority_queue<pair<int,int>, vector<pair<int,int>>, greater<>> pq;
    pq.push({0, s});

    while (!pq.empty()) {
        auto [d, u] = pq.top(); pq.pop();
        if (vis[u]) continue;
        vis[u] = true;
        for (auto [v, w] : g[u]) {
            if (dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w;
                pq.push({dist[v], v});
            }
        }
    }
}
```

#### SPFA（带负权边，慎用）⭐⭐

```cpp
int dist[N], cnt[N];  // cnt 判负环
bool inq[N];

bool spfa(int s) {
    memset(dist, 0x3f, sizeof dist);
    memset(cnt, 0, sizeof cnt);
    memset(inq, 0, sizeof inq);
    queue<int> q;
    dist[s] = 0; q.push(s); inq[s] = true;

    while (!q.empty()) {
        int u = q.front(); q.pop(); inq[u] = false;
        for (auto [v, w] : g[u]) {
            if (dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w;
                cnt[v] = cnt[u] + 1;
                if (cnt[v] >= n) return false;  // 负环
                if (!inq[v]) { q.push(v); inq[v] = true; }
            }
        }
    }
    return true;
}
```

#### 拓扑排序 ⭐⭐

```cpp
vector<int> g[N];
int indeg[N];  // 入度
vector<int> topo;

bool topological_sort(int n) {
    queue<int> q;
    for (int i = 1; i <= n; i++)
        if (indeg[i] == 0) q.push(i);

    while (!q.empty()) {
        int u = q.front(); q.pop();
        topo.push_back(u);
        for (int v : g[u])
            if (--indeg[v] == 0) q.push(v);
    }
    return topo.size() == n;  // true 表示无环
}
```

#### 并查集 ⭐⭐⭐⭐

```cpp
int fa[N];

void init(int n) { for (int i = 1; i <= n; i++) fa[i] = i; }

int find(int x) {
    return fa[x] == x ? x : fa[x] = find(fa[x]);  // 路径压缩
}

void unite(int x, int y) {
    fa[find(x)] = find(y);
}

bool same(int x, int y) {
    return find(x) == find(y);
}
```

### 3.7 数学 & 数论 ⭐⭐⭐

```cpp
// 最大公约数（辗转相除/欧几里得）
int gcd(int a, int b) { return b == 0 ? a : gcd(b, a % b); }
// 或直接用 __gcd(a, b)

// 最小公倍数（先除后乘防溢出）
int lcm(int a, int b) { return a / gcd(a, b) * b; }

// 快速幂
int qpow(int a, int b, int mod = MOD) {
    int res = 1;
    while (b) {
        if (b & 1) res = res * a % mod;
        a = a * a % mod;
        b >>= 1;
    }
    return res;
}

// 质数判断 O(√n)
bool isPrime(int x) {
    if (x < 2) return false;
    for (int i = 2; i * i <= x; i++)
        if (x % i == 0) return false;
    return true;
}

// 埃筛（标记 1~n 中的质数）O(n log log n)
bool notPrime[N];
vector<int> primes;
void sieve(int n) {
    notPrime[0] = notPrime[1] = true;
    for (int i = 2; i <= n; i++) {
        if (!notPrime[i]) {
            primes.push_back(i);
            for (int j = i * 2; j <= n; j += i)
                notPrime[j] = true;
        }
    }
}

// 组合数 C(n, k) （小范围）
int C(int n, int k) {
    if (k > n) return 0;
    int res = 1;
    for (int i = 1; i <= k; i++)
        res = res * (n - k + i) / i;  // 可整除
    return res;
}
```

### 3.8 字符串处理 ⭐⭐⭐⭐

```cpp
// 字符串数字解析（提取数字）
vector<int> extractNumbers(string s) {
    vector<int> nums;
    int i = 0;
    while (i < s.length()) {
        if (isdigit(s[i])) {
            int num = 0;
            while (i < s.length() && isdigit(s[i]))
                num = num * 10 + (s[i++] - '0');
            nums.push_back(num);
        } else i++;
    }
    return nums;
}

// 字符串转小写（快速）
for (char &c : s) c = tolower(c);
```

---

## 四、五题策略 & 得分公式

| 题号 | 目标分 | 时间 | 典型考点 | 策略 |
|------|--------|------|----------|------|
| **T1** | **100** | ≤30min | 模拟、数学规律、简单字符串 | **必须满分**。找规律优于暴力，特判边界，long long |
| **T2** | **100** | ≤50min | 排序、贪心、简单模拟+优化 | **争取满分**。STL 解决，注意时间复杂度 |
| **T3** | **50** | ≤80min | 字符串解析、栈/队列、搜索 | **写对部分分**。暴力能拿 30-50 分 |
| **T4** | **50** | ≤70min | 动态规划、图论、树 | **DP暴力/贪心骗分**。不会就写搜索拿部分分 |
| **T5** | **10** | ≤10min | 高级算法、复杂DP | **骗分模板**。特判 + 输出样例碰运气 |
| 检查 | — | 10min | — | 逐项检查文件IO和格式 |

### T1（满分策略）

- 开 `long long`，不要手软
- 先想数学规律，不要无脑暴力循环
- 特判：n=1, n=0, 全相等, 全不同
- 常见坑：整除取整、浮点精度（用整数做乘除）

### T2（满分策略）

- 排序是万能钥匙：`sort()` 能解决一半 T2 题
- 贪心策略：排序后贪心选最优
- 队列/栈维护时效性数据（如过期优惠券用 queue）
- 方向数组处理网格题：`int dx[]={0,1,0,-1}, dy[]={1,0,-1,0}`

### T3、T4（50分策略）

**拿部分分三板斧：**

```cpp
// 板斧1：暴力 DFS 枚举所有情况（数据范围 n≤20 时全对）
void dfs(int depth) { /* ... 全排列 / 子集枚举 */ }

// 板斧2：特判小数据范围 + 贪心混分
if (n <= 10) { /* 暴力 */ }
else { /* 贪心近似 */ }

// 板斧3：输出样例碰运气（至少 0 分变 5-10 分）
if (n == 样例中的值) cout << 样例答案 << endl;
```

### T5（10分策略）

```cpp
// 保底模板
if (n == 1) cout << "答案" << endl;   // 特判最简单情况
else cout << "0" << endl;              // 输出一个合理猜测
```

---

## 五、常见陷阱 & 调试技巧

### 5.1 十个高频 Bug

| # | 问题 | 后果 | 解决方法 |
|---|------|------|----------|
| 1 | `int` 溢出 | WA | 全局 `#define int long long` |
| 2 | 数组越界 | RE/WA | `const int N = 最大范围 + 10` |
| 3 | 忘初始化 | WA | 局部变量 `=` 0，全局自动 0 |
| 4 | `freopen` 被注释 | 爆零/0分 | 提交前 Ctrl+F 搜 `freopen` |
| 5 | 循环边界错 | WA | 确认 0-based / 1-based |
| 6 | `memset` 用错 | WA | 只对 `0` 和 `-1` 可靠 |
| 7 | 多测不清空 | WA | 每组数据前重置全局数组 |
| 8 | 输出多余空格 | WA（格式错） | 检查换行和空格 |
| 9 | `if(x=0)` | 逻辑错 | 必须 `if(x==0)` |
| 10 | DFS 不回溯 | WA | 递归返回时恢复状态 |

### 5.2 调试三板斧

```cpp
// 1. 打印中间变量（提交前注释掉！）
cerr << "Debug: i=" << i << " sum=" << sum << endl;

// 2. 断点 / assert 检查
assert(i >= 0 && i < n);  // 不满足则直接崩溃，快速定位

// 3. 边界测试（自己构造）
// n=1, n=最大值, 全0, 全相同, 严格升序/降序
```

### 5.3 时间复杂度自救

```cpp
// 如果 O(n²) 超时，想想：
// 1. 能排序后贪心吗？  → O(n log n)
// 2. 能用 map/set 吗？   → O(n log n)
// 3. 能二分答案吗？     → O(n log V)
// 4. 能用双指针吗？     → O(n)
// 5. 能用前缀和吗？     → O(n) 预处理 O(1) 查询

// 前缀和模板
int pre[N];
for (int i = 1; i <= n; i++) pre[i] = pre[i-1] + a[i];
int sumLR = pre[R] - pre[L-1];  // O(1) 区间和

// 差分（区间加）
int diff[N];
void add(int l, int r, int v) { diff[l] += v; diff[r+1] -= v; }
// 最终还原：for i=1..n: a[i] = a[i-1] + diff[i];
```

---

## 六、时间复杂度速查

| n 的范围 | 可接受算法 | 常见算法 |
|----------|-----------|----------|
| n ≤ 10 | O(n!) | 全排列、DFS 暴力 |
| n ≤ 20 | O(2ⁿ) | 状态压缩 DP、子集枚举 |
| n ≤ 100 | O(n³) | Floyd、区间 DP |
| n ≤ 1000 | O(n²) | 简单 DP、插入排序 |
| n ≤ 10⁵ | O(n log n) | sort、二分、Dijkstra、并查集 |
| n ≤ 10⁶ | O(n) | 线性扫描、前缀和、桶排序 |
| n ≤ 10⁷ | O(n) 常数小 | 埃筛、输入输出优化 |

> **经验法则**：CSP 中 1 秒约 10⁷~10⁸ 次基本操作。n=10⁵ 时 O(n²) 必超时。

### 常用 STL 时间复杂度

| 操作 | vector | stack/queue | set/map | priority_queue |
|------|--------|-------------|---------|----------------|
| 插入 | 尾 O(1), 中 O(n) | O(1) | O(log n) | O(log n) |
| 删除 | 尾 O(1), 中 O(n) | O(1) | O(log n) | O(log n) |
| 查找 | O(n) | — | O(log n) | — |
| 访问顶/首 | O(1) | O(1) | — | O(1) |
| 排序 | O(n log n) | — | 自动有序 | — |

---

## 📋 考试过程时间线

```
08:30  进入考场，熟悉环境
09:00  开考，快速浏览 5 题（5min）→ 判断难度
09:05  T1 开始（目标 30min 内 100 分）
09:35  T2 开始（目标 50min 内 100 分）
10:25  T3 开始（先写暴力拿部分分，再优化）
11:30  T4 开始（暴力 / DP，目标 50 分）
12:20  T5 骗分（特判 + 输出样例）
12:30  全面检查（freopen、文件名、输出格式）
13:00  考试结束
```

---

## 🚨 最后 10 分钟终极检查

```
1. 每道题的 .cpp 文件中是否有 freopen？
2. 文件名和文件夹名是否与题目英文名完全一致？
3. 是否删除了所有 cerr/cout 调试输出？
4. 每道题是否至少过了样例？
5. 考号/文件夹名是否正确？
```

---

*手册整理自 CSP-J/S 历年真题分析、CSDN 考前复习资料、GitHub @mingyush/csp 仓库*
*最后更新：2025年*
