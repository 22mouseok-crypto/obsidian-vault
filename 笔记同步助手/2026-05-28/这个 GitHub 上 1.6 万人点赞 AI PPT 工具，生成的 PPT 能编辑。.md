---
author: 逛逛
source: 微信公众号
url: https://mp.weixin.qq.com/s?__biz=MzUxNjg4NDEzNA==&mid=2247533700&idx=1&sn=c2ec1dc4e0b48c74944aa7117558a1ce&chksm=f8a9c53620f0a2768ae59ea386e6e5fdaf437624b782aaa0c3aa28ae701c6f2a3492240bd974&mpshare=1&scene=1&srcid=0528ql6f2jhb5y3ccaJWlr02&sharer_shareinfo=08c482b97fb4b3b5c1cd0aa62de61d81&sharer_shareinfo_first=08c482b97fb4b3b5c1cd0aa62de61d81#rd
saved: 2026-05-28 21:36:32
tags:
  - 笔记同步助手
id: ac4a8226-74b2-49bf-848e-f3acd655e9cc
---

公众号名称：逛逛GitHub

作者名称：逛逛

发布时间：2026-05-16 12:02

这个叫 PPT Master 的开源项目，是一个让你拿到手真正能改的 AI PPT 方案。

![[笔记同步助手/images/bf668c4362dcaccc98fb34ca5c547363_MD5.png]]

AI 生成 PPT 这件事，折腾了快两年了，说来说去大概有四条路线。

**第一条：套模板。**

换换文字、换换图标，效率确实高，但做出来的东西千篇一律。

而且很依赖模板的资源。

**第二条：HTML 渲染然后转 PPTX。**

在浏览器里看着挺精美，导出成 PPT 之后，布局走样、字体丢失、元素全被压扁。

Gamma、Tome 走的就是这条路，好看是好看，但导出来就变形。

**第三条：用 python-pptx 直接生成。**

这种方式元素确实可以编辑，但 AI 缺乏复杂设计的训练数据，做出来的就是文本框加列表，跟审美基本不沾边。

ChatGPT 生成 PPT 走的好像就是这条路。

**第四条路就是今天要聊的：AI 生成 SVG，然后脚本把 SVG 转成 PowerPoint 原生对象。**

这条路目前走的人不多，PPT Master 就是其中一个。

> 📹 此处为视频内容（vid: wxv\_4488505415965835266），未能直接提取，请前往原文查看：[在公众号原文中观看](https://mp.weixin.qq.com/s?__biz=MzUxNjg4NDEzNA==&mid=2247533700&idx=1&sn=c2ec1dc4e0b48c74944aa7117558a1ce&chksm=f8a9c53620f0a2768ae59ea386e6e5fdaf437624b782aaa0c3aa28ae701c6f2a3492240bd974&mpshare=1&scene=1&srcid=0528ql6f2jhb5y3ccaJWlr02&sharer_shareinfo=08c482b97fb4b3b5c1cd0aa62de61d81&sharer_shareinfo_first=08c482b97fb4b3b5c1cd0aa62de61d81#rd)

01

**PPT Master 是什么**

PPT Master 是一套在 AI 编辑器里运行的开源工作流，你不需要写任何代码。

说白了，你把 PDF、Word、网页链接、Markdown 这些材料丢给它，在 Claude Code 聊天框里跟 AI 说一句用这份文档做一份 PPT，它就帮你生成了一个真正的 .pptx 文件。

![[笔记同步助手/images/e1bffb17abd62df2b998731b849a1482_MD5.png]]

拿到手的文件里，每个形状、文本框、渐变、阴影都是原生的 PowerPoint 对象。

点哪里改哪里，跟你手工做出来的一样。

```
GitHub 地址：https://github.com/hugohe3/ppt-master
```

为什么 SVG 转 DrawingML 这条路走得通

PPT Master 的核心思路是让 AI 先生成 SVG，然后用脚本把 SVG 转成 PowerPoint 的 DrawingML 格式。

这条路走得通的原因其实很简单：**SVG 和 DrawingML 本质上是同一类东西，都是基于绝对坐标的 2D 矢量格式。**

矩形、路径、渐变、阴影这些概念一一对应，转换就是方言翻译，不是格式代沟。

所以最终输出的 PPTX 里面，每个元素都能直接点击修改。文字可以改，颜色可以换，形状可以调。

不是截图，不是图片嵌入，是真正的 PowerPoint 对象。

**这个差异化其实非常关键。** 如果一个文件在 PowerPoint 里打开放不了、改不了，那它凭什么叫 PPT？

![[笔记同步助手/images/1058bc6c6ca2485f8321dfbb60232af9_MD5.png]]

![[笔记同步助手/images/88dba66979199cd885922b89474ca396_MD5.png]]

![[笔记同步助手/images/7ad7a9cd371fb0c1cc0388f7683eb056_MD5.png]]

你能在 Claude Code、Cursor、VS Code Copilot、Codebuddy 都能用 PPT Master。

**模型不限。**

Claude 效果最好，但 GPT、Gemini、Kimi、MiniMax 都能驱动，只是布局精度有差异。

你的文件全程在自己电脑上处理，唯一的外部通信是你和 AI 编辑器之间的对话，这跟你平时用编辑器没有区别。

**成本也极低。**

用 VS Code Copilot 的话，生成一份 PPT 最低 $0.08。

对比一下，Gamma 订阅 $8 到 $20 一个月，Beautiful.ai $12 到 $45 一个月，微软 Copilot 大约 $30 一个月。

设计效果

PPT Master 内建了好几套设计风格：通用灵活的培训分享风、商业报告用的咨询风、还有 MBB 级别的顶级咨询风。

![[笔记同步助手/images/64b3326ddc9e602f61c3499360be9b19_MD5.png]]

![[笔记同步助手/images/84d248d6879a555a3ca3fee87e84e45c_MD5.png]]![[笔记同步助手/images/76fad967894400c5c3a478cb5ae87b4d_MD5.png]]

examples 目录里有 15 个示例项目、229 页，覆盖了政府财政分析、AI 架构设计、像素风、禅意风、发布会风等各种风格。

而且输出尺寸也不止 16:9，小红书 3:4、朋友圈 1:1、竖版 Story 9:16、A4 打印，同一套流水线指定格式就行。

![[笔记同步助手/images/941a88aeef2d3f50bf305bd890ed43da_MD5.png]]

02

**说实话的短板**

有个说法叫说清楚自己不适合什么，比说自己能干什么更重要。

PPT Master 有几个明显的短板：

**需要配置环境。** 得装 Python、clone 仓库、装依赖。不是打开浏览器就能用的体验，首次配置大约需要 15 分钟。

**生成速度不算快。**

一份 10 页的 PPT大概需要 10 到 20 分钟，因为它逐页串行生成保证跨页一致性。SaaS 工具几秒就能出，但那个质量你也知道。

**没有可视化拖拽界面。** 全部通过和 AI 对话来操作，没有画布可以拖拽。

**图表是视觉形状。** 好看但不是 Excel 数据绑定对象，没法动态更新数据。

所以如果你要的是零配置、浏览器里秒出幻灯片，Gamma 和 Canva 确实更合适。

但如果你要的是**原生可编辑、成本可控、数据本地化、不被锁定**，PPT Master 干的就是这件事。

03

**怎么上手**

整个过程非常直接：

**第一步：** 装 Python 3.10 以上版本。

**第二步：** 从 GitHub 下载或者 clone 仓库。

```
git clone https://github.com/hugohe3/ppt-master.git
cd ppt-masterpip install -r requirements.txt
```

**第三步：** 打开你的 Claude Code，在聊天框里把文件路径丢给它。

```
请用 projects/report.pdf 这份文件生成一份 PPT
```

```
然后 AI 会先跟你确认设计规范，确认完就开始生成了。
```

首次配置大约 15 分钟，之后每份 PPT 大概 10 到 20 分钟的聊天时间。

Windows 用户有一份专门的手把手安装指南，在仓库的 docs 目录下。

PPT Master 的作者是一名投融资领域的从业者，注册会计师、资产评估师，日常工作就是做 PPT、看 PPT、改 PPT。

这个项目来源于一个很真实的痛点：市面上的 AI PPT 工具导出的都是图片，不是可编辑的元素。

对于他这种每天都需要点击进去修改内容的人来说，完全不可接受。

所以他花了很多时间打磨了这个开源工具。

如果一份 AI 生成的 PPT，打开放不了、改不了，那它就不应该叫 PPT。

04

**点击下方卡片，关注逛逛 GitHub**

这个公众号历史发布过很多有趣的开源项目，如果你懒得翻文章一个个找，你直接关注微信公众号：逛逛 GitHub ，后台对话聊天就行了：

![[笔记同步助手/images/d4a5cc67ea6474599b76e537904f937b_MD5.png]]

---

![[笔记同步助手/images/8bd6f4ea8b5a5800f5d55465f3d7ca9e_MD5.jpg|cover_image]]

Original 逛逛 逛逛GitHub

---

内容效果不满意？[点此反馈](https://feedback.notebooksyncer.com/feedback/0eb9f306_1779975388256?u=https%3A%2F%2Fmp.weixin.qq.com%2Fs%3F__biz%3DMzUxNjg4NDEzNA%3D%3D%26mid%3D2247533700%26idx%3D1%26sn%3Dc2ec1dc4e0b48c74944aa7117558a1ce%26chksm%3Df8a9c53620f0a2768ae59ea386e6e5fdaf437624b782aaa0c3aa28ae701c6f2a3492240bd974%26mpshare%3D1%26scene%3D1%26srcid%3D0528ql6f2jhb5y3ccaJWlr02%26sharer_shareinfo%3D08c482b97fb4b3b5c1cd0aa62de61d81%26sharer_shareinfo_first%3D08c482b97fb4b3b5c1cd0aa62de61d81%23rd&s=obsidian)