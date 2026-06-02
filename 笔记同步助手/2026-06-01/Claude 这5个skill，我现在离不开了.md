---
author: AI增长观察室
source: 微信公众号
url: https://mp.weixin.qq.com/s?__biz=MzYzMTc4NTIwMQ==&mid=2247483783&idx=1&sn=de36ece2f08ac588a38a264bb29fdf65&chksm=f14e2afccfcafac1b5be5b95a794857af3d143c434f717f3d76a236f489e49ef4b8a41d1aa25&mpshare=1&scene=1&srcid=0601oMv62u2sqDIeswSYqHTA&sharer_shareinfo=2dcf3ab2ddea90f83304391a464e2c76&sharer_shareinfo_first=2dcf3ab2ddea90f83304391a464e2c76#rd
saved: 2026-06-01 21:37:41
tags:
  - 笔记同步助手
id: e6727079-71e6-4fee-bcbf-3706485957ba
---

公众号名称：AI增长观察室

作者名称：

发布时间：2026-05-01 12:53

大多数人用 Claude，只会让它帮你聊天和写文案。

但这 5 个 Skills，才是真正让效率翻倍的隐藏武器。

来，一个一个看。

> Skills 是 Claude 官方推出的技能扩展系统，目前对 Pro、Max、Team 和 Enterprise 用户开放。本质上是一个文件夹，里面包含 Claude 按需加载的指令和脚本，不用的时候不占上下文，用的时候自动调用。

**安装方式有两种：**

方式一（推荐）：通过插件市场安装，在 Claude Code 中执行：

claude /plugin marketplace add anthropics/skills

方式二：手动安装，将 Skill 文件夹放入 ～/.claude/skills/（全局生效）或 项目/.claude/skills/（仅对该项目生效）。

官方 Skills 库地址：github.com/anthropics/skills

---

## 01 文档三件套

Word · Excel · PPT · PDF 全搞定

说清楚你要什么，Claude 直接读取和生成带格式的文件，含公式的 Excel、带样式的 Word、可填写的 PDF，下载即用。

**安装方式：**在终端输入以下命令

npx skills-installer install @anthropics/claude-code/document-skills --client claude-code

**怎么用：**安装后直接说「帮我做一份季度汇报 Excel」或「把这份数据整理成 Word」，它自动调用技能生成文件。

> 天天跟 Office 打交道的打工人，这个必须收藏。

---

## 02 Skill Creator

造工具的工具

这是 Anthropic 官方提供的「元技能」，专门用来帮你开发自己的 Skill。把常用工作流程打包成专属技能，以后一键调用，再也不用每次重新喂提示词。

**安装方式：**在 Claude Code 中依次执行

claude /plugin marketplace add anthropics/skills

claude /plugin install skill-creator

**怎么用：**启动后告诉它你想创建什么技能，它自动帮你生成 SKILL.md 和必要的脚本文件，安装即可使用。

> 你踩过的坑、摸索出来的习惯，全都可以打包成技能，永久复用。

---

## 03 Find Skills

技能导航仪

Skills 市场里的技能越来越多，不知道该用哪个？Find Skills 帮你精准匹配。描述你的需求，它从已安装的技能里找到最合适的那个。

**安装方式：**在 Claude Code 中依次执行

claude /plugin marketplace add anthropics/skills

claude /plugin install find-skills

新手入门首选，老手提速利器。不用记住每个技能的名字，说需求就够了。

---

## 04 Agent Browser

AI 替你上网

自动打开网页、抓取信息、填表单……你只说目标，它帮你做完。比价、调研、收集数据，全程不用动手。

**安装方式：**在 Claude Code 中依次执行

claude /plugin marketplace add anthropics/skills

claude /plugin install agent-browser

**怎么用：**「帮我对比这三款产品的价格和评价」「抓取这个页面的所有联系方式」，直接说目标，它自动跑完流程。

> 这个是用了之后感受最强烈的一个，真的太爽了。

---

## 05 Frontend Design

不会写代码也能做界面

描述你想要的样式和功能，直接生成可用的前端代码，配色、布局一步到位。支持 React、Next.js、Vue、Tailwind 等主流技术栈。

**安装方式：**在终端输入以下命令

npx skills-installer install @anthropics/claude-code/frontend-design --client claude-code

> 独立开发者和小团队的救星，设计和开发一个人扛下来不是梦。

---

## 5 个 Skill，5 种超能力

📄 **文档三件套**：Word / Excel / PPT / PDF 下载即用

🔧 **Skill Creator**：把工作流打包成专属技能

🧭 **Find Skills**：描述需求，精准匹配技能

🌐 **Agent Browser**：AI 替你上网搞定一切

🎨 **Frontend Design**：不写代码也能做界面

哪个最戳你？评论区告诉我——下期深挖你最想看的那个。

---

既然看到这里了，如果觉得不错

随手点个「赞」「在看」「转发」三连吧 👇

想第一时间收到推送，也可以给我个 **星标 ⭐**

谢谢你看我的文章，我们，下次再见。

  

---

内容效果不满意？[点此反馈](https://feedback.notebooksyncer.com/feedback/933d8e79_1780321055954?u=https%3A%2F%2Fmp.weixin.qq.com%2Fs%3F__biz%3DMzYzMTc4NTIwMQ%3D%3D%26mid%3D2247483783%26idx%3D1%26sn%3Dde36ece2f08ac588a38a264bb29fdf65%26chksm%3Df14e2afccfcafac1b5be5b95a794857af3d143c434f717f3d76a236f489e49ef4b8a41d1aa25%26mpshare%3D1%26scene%3D1%26srcid%3D0601oMv62u2sqDIeswSYqHTA%26sharer_shareinfo%3D2dcf3ab2ddea90f83304391a464e2c76%26sharer_shareinfo_first%3D2dcf3ab2ddea90f83304391a464e2c76%23rd&s=obsidian)