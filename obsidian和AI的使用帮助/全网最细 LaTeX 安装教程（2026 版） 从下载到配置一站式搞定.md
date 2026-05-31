---
title: "全网最细 LaTeX 安装教程（2026 版）| 从下载到配置一站式搞定"
source: "https://blog.csdn.net/m0_59559215/article/details/158886485"
author:
  - "[[m0_59559215]]"
published: 2026-03-10
created: 2026-05-27
description: "文章浏览阅读2.5w次，点赞69次，收藏164次。本文详细介绍了LaTeX在Windows系统下的安装配置指南，推荐使用TeXLive+VSCode组合方案。主要内容包括：TeXLive的下载安装方法（官网或镜像源）、环境变量配置；VSCode的LaTeX插件安装与关键配置；中文支持测试方法及常见问题解决方案。同时提供了macOS/Linux系统的适配说明，并给出进阶学习建议。该教程针对新手设计，强调完整安装和路径配置，确保一次成功搭建LaTeX工作环境。_latex安装教程"
tags:
  - "clippings"
---
LaTeX 作为专业的排版工具，在学术论文、书籍、简历等文档编写中应用广泛，但新手往往卡在 **安装配置** 这一步。本文将以 Windows 系统为例（附 macOS/Linux 适配说明），手把手教你完成 LaTeX 的完整安装与环境配置，全程无坑，新手也能一次成功！

### 一、为什么选择 TeX Live + VS Code？

LaTeX 的安装核心是「发行版 + 编辑器」的组合，新手首选这套搭配：

- **TeX Live** ：功能最全、跨平台、更新维护及时的 LaTeX 发行版（包含编译器、宏包等核心组件，无需额外下载依赖）；
- **VS Code** ：轻量、免费、插件生态丰富，搭配 LaTeX 插件可实现实时预览、语法高亮、一键编译，学习成本低。

### 二、Windows 系统完整安装步骤

#### 步骤 1：下载 TeX Live 安装包

TeX Live 有两种下载方式，优先选方式 1（更稳定）：

方式 1：官网下载（推荐）

1. 访问 TeX Live 官方下载页： [https://www.tug.org/texlive/acquire-netinstall.html](https://www.tug.org/texlive/acquire-netinstall.html "https://www.tug.org/texlive/acquire-netinstall.html")
2. 下载「install-tl-windows.exe」（网络安装版，约 5MB，安装时自动下载完整组件）
	> 💡 注意：避免下载「ISO 镜像」（约 4GB），新手易出挂载、解压问题。

方式 2：国内镜像源（提速）

如果官网下载慢，推荐清华镜像：

- 地址： [https://mirrors.tuna.tsinghua.edu.cn/CTAN/systems/texlive/tlnet/](https://mirrors.tuna.tsinghua.edu.cn/CTAN/systems/texlive/tlnet/ "https://mirrors.tuna.tsinghua.edu.cn/CTAN/systems/texlive/tlnet/")
- 直接下载「install-tl-windows.exe」即可（和官网文件一致，下载速度更快）。

#### 步骤 2：安装 TeX Live

1. 右键「以管理员身份运行」 `install-tl-windows.exe` ，等待加载完成后进入安装界面；
2. 点击「Advanced」（高级设置），建议修改以下选项：
	- **安装路径** ：默认 `C:\texlive\2026` ，若 C 盘空间不足，可改到 D 盘（如 `D:\texlive\2026` ）， **路径不要含中文 / 空格 / 特殊字符** ！
		- **安装组件** ：保持默认（Full scheme），新手不建议精简，避免后续缺失宏包。
3. 点击「Install」开始安装，全程约 10-30 分钟（取决于网速），安装完成后会提示「TeX Live 2026 is installed」。

#### 步骤 3：验证 TeX Live 安装

1. 按下 `Win+R` ，输入 `cmd` 打开命令提示符；
2. 输入以下命令，若返回版本信息则安装成功：

bash

运行

```sql
latex --version

pdflatex --version
```

> ❌ 若提示「不是内部或外部命令」，说明环境变量未自动配置，手动添加：
> 
> 1. 右键「此电脑」→「属性」→「高级系统设置」→「环境变量」；
> 2. 在「系统变量」的「Path」中添加： `D:\texlive\2026\bin\win32` （替换为你的安装路径）；
> 3. 重启 cmd 后重新验证。

#### 步骤 4：安装 VS Code 并配置 LaTeX 插件

1. 下载 VS Code： [https://code.visualstudio.com/](https://code.visualstudio.com/ "https://code.visualstudio.com/") （直接下载 Windows 版，一路下一步安装即可）；
2. 安装 LaTeX 核心插件：
	- 打开 VS Code，左侧点击「扩展」（快捷键 `Ctrl+Shift+X` ）；
		- 搜索「LaTeX Workshop」，点击「安装」（这是唯一核心插件，无需安装其他冗余插件）；
3. 配置 LaTeX Workshop（关键！）：
	- 按下 `Ctrl+Shift+P` ，输入「Preferences: Open Settings (JSON)」，打开设置文件；
		- 将以下配置粘贴到文件中（ **替换路径为你的 TeX Live 安装路径** ）：

json

```swift
{

    // LaTeX编译器配置

    "latex-workshop.latex.tools": [

        {

            "name": "pdflatex",

            "command": "D:\\texlive\\2026\\bin\\win32\\pdflatex.exe",

            "args": [

                "-synctex=1",

                "-interaction=nonstopmode",

                "-file-line-error",

                "%DOCFILE%"

            ]

        },

        {

            "name": "xelatex",

            "command": "D:\\texlive\\2026\\bin\\win32\\xelatex.exe",

            "args": [

                "-synctex=1",

                "-interaction=nonstopmode",

                "-file-line-error",

                "%DOCFILE%"

            ]

        },

        {

            "name": "bibtex",

            "command": "D:\\texlive\\2026\\bin\\win32\\bibtex.exe",

            "args": [

                "%DOCFILE%"

            ]

        }

    ],

    // 编译链配置（优先xelatex，支持中文）

    "latex-workshop.latex.recipes": [

        {

            "name": "XeLaTeX",

            "tools": [

                "xelatex"

            ]

        },

        {

            "name": "XeLaTeX -> BibTeX -> XeLaTeX*2",

            "tools": [

                "xelatex",

                "bibtex",

                "xelatex",

                "xelatex"

            ]

        }

    ],

    // 保存时自动编译

    "latex-workshop.latex.autoBuild.run": "onSave",

    // 内置PDF预览（无需额外软件）

    "latex-workshop.view.pdf.viewer": "tab",

    // 编译后清理临时文件

    "latex-workshop.latex.clean.fileTypes": [

        "*.aux",

        "*.bbl",

        "*.blg",

        "*.idx",

        "*.ind",

        "*.lof",

        "*.lot",

        "*.out",

        "*.toc",

        "*.log"

    ]

}
```
1. 保存配置文件，重启 VS Code 生效。

#### 步骤 5：测试 LaTeX 环境

1. 在 VS Code 中新建文件夹，创建 `test.tex` 文件，粘贴以下测试代码：

latex

```cobol
\documentclass{article}

% 引入中文支持宏包

\usepackage{ctex}

% 文档标题、作者、日期

\title{LaTeX测试文档}

\author{CSDN测试}

\date{\today}

\begin{document}

\maketitle

 

\section{一级标题}

这是中文测试内容，LaTeX安装成功！

 

\subsection{二级标题}

数学公式测试：$E=mc^2$

 

\end{document}
```
1. 按下 `Ctrl+S` 保存，VS Code 会自动编译，右侧弹出 PDF 预览窗口；
2. 若能正常显示中文、公式，说明环境配置完全成功！

### 三、macOS/Linux 适配说明

#### macOS 系统

1. 下载 TeX Live： [https://www.tug.org/texlive/acquire.html](https://www.tug.org/texlive/acquire.html "https://www.tug.org/texlive/acquire.html") （选择 macOS 版）；
2. 安装方式：双击 `install-tl.pkg` ，按提示完成（路径建议 `/usr/local/texlive/2026` ）；
3. VS Code 配置：仅需将 `command` 路径改为 `/usr/local/texlive/2026/bin/universal-darwin/pdflatex` （其余配置不变）。

#### Linux 系统（以 Ubuntu 为例）

1. 终端执行命令安装 TeX Live（无需手动下载）：

bash

运行

```sql
sudo apt update

sudo apt install texlive-full
```
1. VS Code 配置： `command` 路径改为 `/usr/bin/pdflatex` （系统默认路径）。

### 四、常见问题解决

#### 问题 1：编译时提示「找不到 ctex 宏包」

- 原因：TeX Live 安装时未选 Full scheme，缺少中文宏包；
- 解决：打开 TeX Live Manager（tlmgr），搜索 `ctex` 并安装，或重新安装 TeX Live 并勾选 Full。

#### 问题 2：VS Code 预览 PDF 空白

- 原因：编译器选择错误（未用 xelatex）；
- 解决：在 VS Code 右下角点击「LaTeX Workshop: Recipe」，选择「XeLaTeX」重新编译。

#### 问题 3：中文显示乱码

- 原因：编码或编译器问题；
- 解决：
	1. 确保使用 `xelatex` 编译（而非 pdflatex）；
		2. VS Code 中设置文件编码为 UTF-8（右下角可直接修改）。

### 五、进阶建议

1. 宏包管理：使用 tlmgr 命令行管理宏包（如 `tlmgr install xxx` 安装宏包， `tlmgr update all` 更新所有组件）；
2. 模板推荐：Overleaf（ [https://www.overleaf.com/](https://www.overleaf.com/ "https://www.overleaf.com/") ）提供大量学术模板（论文、简历、幻灯片），可直接复制使用；
3. 学习资源：《LaTeX 入门》（刘海洋）、CTAN 官网（ [https://www.ctan.org/](https://www.ctan.org/ "https://www.ctan.org/") ）、CSDN LaTeX 专栏。

---

#### 总结

1. LaTeX 安装核心是「TeX Live 发行版 + VS Code 编辑器」，优先选择 Full scheme 完整安装，避免后续缺宏包；
2. Windows 需手动配置环境变量和 VS Code 插件路径，macOS/Linux 仅需适配编译器路径；
3. 中文支持的关键是使用 `xelatex` 编译器 + `ctex` 宏包，编译时选择对应编译链即可。

如果本文对你有帮助，欢迎点赞 + 收藏～有任何问题，评论区留言！