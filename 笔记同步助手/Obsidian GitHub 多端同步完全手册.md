---
title: Obsidian GitHub 多端同步完全手册
author: 自建
tags:
  - 笔记同步助手
  - GitHub
  - Git
  - Obsidian
created: 2026-05-27
updated: 2026-05-27
---

# Obsidian GitHub 多端同步完全手册

> **适用场景**：多台电脑（办公/家里/笔记本）同步 Obsidian 笔记库
> **核心技术**：Obsidian Git 插件 + GitHub 私有仓库
> **账号信息**：
> - GitHub 用户名：`22mouseok-crypto`
> - GitHub 邮箱：`22mouse.ok@gmail.com`

---

## 📋 目录

1. [前置准备](#-前置准备)
2. [第一次完整同步（全新开始）](#-第一次完整同步全新开始)
3. [第二台电脑同步（已有仓库）](#-第二台电脑同步已有仓库)
4. [日常上传云端（Push）](#-日常上传云端push)
5. [日常拉取云端（Pull）](#-日常拉取云端pull)
6. [自动同步设置](#-自动同步设置)
7. [修改同步账号](#-修改同步账号)
8. [回退版本](#-回退版本)
9. [常见版本错误处理](#-常见版本错误处理)
10. [.gitignore 配置（防曝隐私）](#-gitignore-配置防曝隐私)
11. [完整指令速查表](#-完整指令速查表)

---

## 🧰 前置准备

| 项目 | 说明 | 下载地址 |
|------|------|---------|
| **Git** | 版本控制工具 | https://git-scm.com/download/win |
| **Obsidian** | 笔记软件 | https://obsidian.md |
| **Obsidian Git 插件** | Obsidian 第三方插件 | Obsidian → 设置 → 第三方插件 → 社区插件 → 搜索 "Git" |
| **GitHub 账号** | 已在用 | `22mouseok-crypto` |

### 安装 Git

1. 访问 https://git-scm.com/download/win 下载 Windows 版本
2. 一路默认安装（如非特殊需求无需改动选项）
3. 安装完成后，在桌面**右键**菜单中会出现 **Open Git Bash here** 或 **Git Bash Here** 选项
4. 验证安装：打开命令提示符（Win+R → 输入 `cmd`），执行：
   ```bash
   git --version
   ```
   显示版本号即安装成功

---

## 🚀 第一次完整同步（全新开始）

> 场景：你有一台电脑，里面有 Obsidian 笔记库，想第一次同步到 GitHub

### Step 1：在 GitHub 上创建私有仓库

1. 浏览器打开 https://github.com 并登录（账号：`22mouseok-crypto`）
2. 点击右上角 **+** 号 → **New repository**
3. 填写：
   - **Repository name**：`obsidian-vault`（或你喜欢的名字，如 `my-notes`）
   - **Description**：可选，如 "我的 Obsidian 笔记库"
   - **Visibility**：选择 **Private**（❗务必选私有，你的笔记是私密的）
   - **Initialize this repository with**：**不要勾选**任何选项（空仓库）
4. 点击 **Create repository**
5. 创建后页面会显示仓库地址，格式如下：
   ```
   https://github.com/22mouseok-crypto/obsidian-vault.git
   ```

### Step 2：本地初始化 Git 并推送

1. 打开你的 Obsidian 笔记库文件夹（即本 vault 根目录：`D:\耗吧那就\Documents\我的第一个知识库`）
2. 在文件夹空白处**右键** → **Open Git Bash here**
3. 依次执行以下命令（**一行一回车**）：

```bash
# ① 初始化 Git 仓库
git init

# ② 关联远程 GitHub 仓库（替换成你实际的仓库地址）
git remote add origin https://github.com/22mouseok-crypto/obsidian-vault.git

# ③ 设置 Git 用户信息（第一次用 Git 需要）
git config --global user.email "22mouse.ok@gmail.com"
git config --global user.name "22mouseok-crypto"

# ④ 拉取远程仓库（首次为空，用于建立连接）
git pull origin main --allow-unrelated-histories
# 如果上面这行报错说 main 分支不存在，跳过这步即可

# ⑤ 添加所有文件到暂存区
git add .

# ⑥ 首次提交
git commit -m "🎉 首次提交：初始化 Obsidian 笔记库"

# ⑦ 推送到 GitHub
git push -u origin main
```

4. 执行 `git push` 时，会弹出 GitHub 登录窗口：
   - **方式一（推荐）**：选择 **Sign in with your browser** → 浏览器登录 GitHub 账号
   - **方式二**：输入用户名 `22mouseok-crypto` 和密码（如开启了两步验证，需使用 **Personal Access Token** 代替密码，详见下方说明）

5. 看到以下信息即成功：
   ```
   branch 'main' set up to track 'origin/main'.
   ```

> 💡 **Personal Access Token 获取方式**（如果密码登录失败）：
> 1. GitHub → 右上角头像 → Settings → Developer settings → Personal access tokens → Tokens (classic)
> 2. Generate new token (classic)
> 3. 勾选 `repo` 全部权限
> 4. 生成后复制 token（只会显示一次），在 Git 登录时用这个 token 当密码

### Step 3：在 Obsidian 中配置 Git 插件

1. Obsidian → 设置（左下角齿轮）→ **第三方插件** → **社区插件** → **浏览**
2. 搜索 **Git** → 安装 **Obsidian Git** 插件 → **启用**
3. 进入插件设置页面，推荐配置如下：

| 设置项 | 推荐值 | 说明 |
|--------|--------|------|
| **Auto backup after file change** | 关闭（推荐手动） | 每次修改文件自动提交 |
| **Auto backup interval (minutes)** | `60` | 每 60 分钟自动备份 |
| **Auto pull interval (minutes)** | `60` | 每 60 分钟自动拉取 |
| **Commit message** | `auto-sync: {{date}}` | 自动提交的备注信息 |
| **Pull changes before push** | ✅ 开启 | 推前先拉，减少冲突 |
| **Push on backup** | ✅ 开启 | 备份时同时推到 GitHub |

---

## 💻 第二台电脑同步（已有仓库）

> 场景：你已经在电脑 A 上完成了第一次同步，现在想在电脑 B（如公司电脑）上也同步同一个笔记库

### Step 1：安装 Git（如未安装）

同"前置准备"部分，下载安装 Git。

### Step 2：克隆仓库到新电脑

1. 在电脑 B 上打开 Obsidian，先创建一个**空 vault**（位置随意，可以就叫 `我的第一个知识库`）
2. 直接**删除这个空文件夹**（我们用 GitHub 的仓库来替代它）
3. 在想放笔记库的文件夹位置（如 `D:\耗吧那就\Documents\`）**右键** → **Git Bash here**
4. 执行克隆命令：

```bash
git clone https://github.com/22mouseok-crypto/obsidian-vault.git "我的第一个知识库"
```

5. 等待下载完成（取决于笔记库大小）
6. 打开 Obsidian → **管理 vault** → **打开本地文件夹** → 选择刚下载的 `我的第一个知识库` 文件夹

### Step 3：安装并配置 Obsidian Git 插件

同"第一次完整同步"的 Step 3，安装并配置好 Git 插件。

### ✅ 大功告成

现在两台电脑都连接到同一个 GitHub 仓库，可以开始同步了！

---

## ⬆️ 日常上传云端（Push）

> 场景：你在本地修改了笔记，想提交并上传到 GitHub

### 方法一：Obsidian 内操作（推荐）

- **快捷键**：`Ctrl + P` 打开命令面板，输入 `Git: commit and sync`，回车
- **状态栏**：Obsidian 右下角状态栏有 Git 图标，点击可看到 **Push** 按钮
- **自动**：设置了自动备份间隔后，到时间会自动推送

### 方法二：Git Bash 命令行

在 vault 根目录打开 Git Bash，执行：

```bash
git add .
git commit -m "更新笔记：添加了 xxx 内容"
git push
```

### 方法三：一键推送脚本（懒人专用）

在 vault 根目录创建 `sync.bat` 文件（Windows 批处理），内容如下：

```batch
@echo off
cd /d "D:\耗吧那就\Documents\我的第一个知识库"
git add .
git commit -m "sync: %date% %time%"
git push
echo 同步完成！
pause
```

以后双击这个文件即可一键推送。

---

## ⬇️ 日常拉取云端（Pull）

> 场景：你在电脑 A 上修改了笔记，想在电脑 B 上获取最新内容

### 方法一：Obsidian 内操作（推荐）

- **快捷键**：`Ctrl + P` → 输入 `Git: pull` → 回车
- **状态栏**：点击 Git 图标 → **Pull** 按钮
- **自动拉取**：设置了 Auto pull interval 后，到时间会自动拉取

### 方法二：Git Bash 命令行

```bash
git pull
```

### ⚠️ 重要习惯

> **在任何一台电脑开始写笔记前，先执行一次 Pull 操作！** 这能大幅减少冲突。

---

## 🔄 自动同步设置

如果想让 Obsidian 在你工作时完全无感同步，按以下配置：

### Obsidian Git 插件设置

| 设置项 | 值 | 说明 |
|--------|-----|------|
| **Auto backup interval (minutes)** | `30` | 每 30 分钟自动提交+推送 |
| **Auto pull interval (minutes)** | `30` | 每 30 分钟自动拉取 |
| **Pull changes before push** | ✅ 开启 | 关键设置，防止冲突 |
| **Push on backup** | ✅ 开启 | 自动推送到 GitHub |
| **Commit message** | `auto-sync: {{date}}` | 自动提交信息 |

### 工作流建议

```
开始工作 → Pull 拉取最新 → 编辑笔记 → 自动 Push（30分钟后）
                                        ↕
开始工作 → Pull 拉取最新 → 编辑笔记 → 自动 Push（30分钟后）
```

> 如果你频繁切换设备，可将间隔设为 `10-15` 分钟。如果仅作备份用途，设为 `60-120` 分钟即可。

---

## 🔑 修改同步账号

> 场景：你换了 GitHub 账号，或者想改用 Token 认证

### 方法一：修改远程仓库地址

```bash
# 查看当前远程地址
git remote -v

# 修改远程地址（换了 GitHub 账号时）
git remote set-url origin https://github.com/22mouseok-crypto/obsidian-vault.git

# 如果用了 Token 认证，地址格式为：
git remote set-url origin https://YOUR_TOKEN@github.com/22mouseok-crypto/obsidian-vault.git
```

### 方法二：清除本地凭据（换账号登录）

当 Git 记住了旧账号密码，无法切换账号时：

```bash
# 方法 A：清除 Windows 凭据管理器
# 控制面板 → 用户账户 → 凭据管理器 → Windows 凭据 →
# 找到 git:https://github.com → 展开 → 移除

# 方法 B：命令行清除
git config --global --unset credential.helper
```

清除后，下次执行 `git push/pull` 会重新弹出登录窗口，输入新账号信息即可。

### 方法三：修改本地 Git 用户信息（影响 commit 记录里的作者名）

```bash
git config --global user.name "新用户名"
git config --global user.email "新邮箱@example.com"
```

---

## ⏪ 回退版本

> 场景：你不小心删除了重要笔记，或者修改错了想还原

### 方法一：通过 GitHub 网页回退（推荐新手）

1. 浏览器打开你的仓库：https://github.com/22mouseok-crypto/obsidian-vault
2. 点击 **Commits**（提交历史）
3. 找到你想回退到的那一个版本
4. 点击版本号右边的 `<>`（浏览此版本时的仓库状态）
5. 确认文件正确后，点击右上角 **Code** → **Download ZIP** 手动下载
6. 或点击 `<>` 左侧的 **······** → **Revert**（生成一个新的回退提交）

### 方法二：命令行回退（本地操作）

```bash
# ① 查看提交历史，找到要回退到的版本的 commit id
git log --oneline

# 输出示例：
# a1b2c3d 自动同步: 2026-05-27
# e4f5g6h 更新笔记：添加了 xxx
# i7j8k9l 🎉 首次提交

# ② 回退到指定版本（保留修改内容）
git reset --soft e4f5g6h

# ③ 或者强硬回退（直接丢弃之后的所有修改）
git reset --hard e4f5g6h

# ④ 强制推送到 GitHub（注意：会覆盖远程记录）
git push --force
```

### 方法三：恢复某个被删除的文件

```bash
# 查看文件历史
git log -- path/to/deleted-file.md

# 从指定版本恢复该文件
git checkout e4f5g6h -- path/to/deleted-file.md
```

### ⚠️ 回退安全提示

| 操作 | 风险 | 推荐场景 |
|------|------|---------|
| `git revert` | ⭐ 低（会生成新提交，不改变历史） | **新手首选** |
| `git reset --soft` | ⭐⭐ 中（仅移动指针） | 合并多次提交 |
| `git reset --hard` | ⭐⭐⭐ 高（会丢失未提交的修改） | 确定不需要了 |
| `git push --force` | ⭐⭐⭐⭐⭐ 极高（覆盖远程历史） | 只有你一个用时才安全 |

> 💡 **安全做法**：回退前先把当前整个 vault 复制一份到别处做备份！

---

## ⚠️ 常见版本错误处理

### 错误 1：推送上被拒（Push rejected）

**错误信息**：
```
! [rejected] main -> main (fetch first)
error: failed to push some refs to 'github.com:...'
```

**原因**：远程仓库有比你本地更新的提交，Git 不允许覆盖

**解决方法**：
```bash
# 正确做法：先拉取，再推送
git pull --rebase
git push
```

**更详细的步骤**：
```bash
# 1. 拉取最新远程内容
git pull origin main

# 2. 如果拉取后有冲突，先解决冲突（见下文）

# 3. 重新推送
git push
```

---

### 错误 2：合并冲突（Merge conflict）

**错误信息**：
```
Auto-merging xxx.md
CONFLICT (content): Merge conflict in xxx.md
Automatic merge failed; fix conflicts and then commit the result.
```

**原因**：你和远程同时修改了同一个文件的同一位置

**解决方法**：

**方式 A：在 Obsidian 中解决**
1. 用 Obsidian 打开冲突文件，会看到这样的内容：
   ```
   <<<<<<< HEAD
   你在本地写的内容
   =======
   远程仓库上的内容
   >>>>>>> origin/main
   ```
2. 手动编辑保留正确的内容，**删除所有 `<<<<<<<`、`=======`、`>>>>>>>` 标记**
3. 保存文件
4. 命令面板 → `Git: commit and sync`

**方式 B：命令行解决**
```bash
# 1. 查看哪些文件冲突
git status

# 2. 手动编辑冲突文件（同上），保存

# 3. 标记为解决
git add 冲突的文件.md

# 4. 提交合并
git commit -m "解决合并冲突"

# 5. 推送
git push
```

**方式 C：放弃自己的修改，用远程版本覆盖（最省事）**
```bash
# 以远程版本为准，放弃本地所有修改
git reset --hard origin/main
```

---

### 错误 3：Git 未安装或找不到命令

**错误信息**：
```
'git' 不是内部或外部命令，也不是可运行的程序
```

**解决方法**：
1. 检查 Git 是否安装：访问 https://git-scm.com/download/win 下载安装
2. 安装后重启 Obsidian
3. 在 Obsidian Git 插件设置中，检查 **Git 路径** 是否正确（通常是自动识别的）

---

### 错误 4：认证失败（Authentication failed）

**错误信息**：
```
remote: Support for password authentication was removed on August 13, 2021.
fatal: Authentication failed for 'https://github.com/...'
```

**原因**：GitHub 已不支持直接用密码认证

**解决方法**：

```bash
# 方案一：使用 Personal Access Token（推荐）
git remote set-url origin https://YOUR_TOKEN@github.com/22mouseok-crypto/obsidian-vault.git

# 方案二：使用 SSH（更安全，但设置稍复杂）
```

**如何创建 Token**：
1. GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Generate new token (classic)
3. 勾选 `repo`（全部子选项）
4. 生成并复制 token
5. 在 Git 操作时，用户名输 `22mouseok-crypto`，密码输这个 token

---

### 错误 5：分支名称不匹配

**错误信息**：
```
fatal: 'main' does not appear to be a git repository
fatal: Could not read from remote repository.
```

**原因**：GitHub 仓库默认分支可能是 `master` 而非 `main`，或反之

**解决方法**：
```bash
# 查看远程仓库的所有分支
git branch -r

# 如果是 master，则用 master
git push -u origin master

# 或者将本地分支重命名
git branch -m main master
git push -u origin master
```

---

### 错误 6：提交信息写错了想改

```bash
# 修改最近一次提交的信息
git commit --amend -m "新的提交信息"
```

注意：如果已经推送了，需要 `git push --force` 才能覆盖远程，请确保只有你一个人在用！

---

### 错误 7：断电/中断导致 Git 被锁

**错误信息**：
```
Another git process seems to be running in this repository
```

**解决方法**：
在 vault 根目录打开 Git Bash，执行：
```bash
rm -f .git/index.lock
```

---

## 🙈 .gitignore 配置（防曝隐私）

某些文件不应该上传到 GitHub（比如插件配置、缓存等）。在 vault 根目录创建 `.gitignore` 文件：

```gitignore
# 系统文件
Thumbs.db
.DS_Store

# Obsidian 工作区配置（不同电脑屏幕不同，不通用）
.obsidian/workspace.json
.obsidian/workspace-mobile.json

# Obsidian 插件缓存（可选，建议保留以同步插件设置）
# .obsidian/plugins/
# .obsidian/snippets/

# 不想同步的大文件或隐私文件夹
# 比如：private/  secrets.md
```

需要同步的关键文件（**不要**写在 .gitignore 中）：
- ✅ 所有 `.md` 笔记文件
- ✅ `.obsidian/app.json`（应用设置）
- ✅ `.obsidian/community-plugins.json`（插件列表）
- ✅ `.obsidian/core-plugins.json`（核心插件）
- ✅ `.obsidian/appearance.json`（外观设置）
- ✅ `.obsidian/hotkeys.json`（快捷键设置）（可选）

> 💡 `.obsidian/workspace.json` 记录了你关闭 Obsidian 时打开的标签页，不同电脑屏幕不一样，建议忽略。

---

## 📋 完整指令速查表

### Git Bash 基础指令

| 操作 | 命令 |
|------|------|
| 查看仓库状态 | `git status` |
| 查看本地修改 | `git diff` |
| 查看提交历史 | `git log --oneline` |
| 添加到暂存区 | `git add .`（全部）或 `git add 文件名.md` |
| 提交修改 | `git commit -m "说明"` |
| 推送到远程 | `git push` |
| 拉取远程更新 | `git pull` |
| 一键提交+推送 | `git add . && git commit -m "说明" && git push` |

### Obsidian 命令面板快捷键

| 操作 | 搜索关键词 |
|------|-----------|
| 提交并同步 | `Git: commit and sync` |
| 仅提交 | `Git: commit` |
| 仅推送 | `Git: push` |
| 仅拉取 | `Git: pull` |
| 查看历史 | `Git: view history` |
| 列出所有备份 | `Git: list backup` |

### 首次安装完整流程

```bash
# 电脑 A - 首次推送（在 vault 根目录执行）
git init
git remote add origin https://github.com/22mouseok-crypto/obsidian-vault.git
git config --global user.email "22mouse.ok@gmail.com"
git config --global user.name "22mouseok-crypto"
git add .
git commit -m "🎉 首次提交"
git push -u origin main

# 电脑 B - 克隆仓库
git clone https://github.com/22mouseok-crypto/obsidian-vault.git "我的第一个知识库"
```

---

## 🎯 最佳实践总结

```
日常流程                         紧急流程
─────────                       ─────────
1. 打开 Obsidian                 1. 笔记冲突 → 打开文件
2. Ctrl+P → Git: pull              删除 <<<< ==== >>>>
3. 正常写笔记                    2. 保存 → Ctrl+P → commit
4. 写完后 Ctrl+P → commit       3. Ctrl+P → push
5. 到另一台电脑 → pull           
  即可看到最新内容                文件删了 → 用 git log
                                 → git checkout 版本 -- 文件
```

---

### 🔗 相关链接

- Git 下载：https://git-scm.com/download/win
- GitHub：https://github.com/22mouseok-crypto
- 你的仓库：https://github.com/22mouseok-crypto/obsidian-vault
- Obsidian Git 插件文档：https://github.com/denolehov/obsidian-git
- Personal Access Token：https://github.com/settings/tokens

---

> 📝 **最后提醒**：Git 同步虽然强大，但它不是实时同步（不像 iCloud/OneDrive）。在切换设备前，养成 **先 commit + push，再到另一台设备 pull** 的习惯，就基本不会出问题。
