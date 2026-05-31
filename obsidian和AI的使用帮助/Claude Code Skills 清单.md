---
title: "Claude Code Skills 清单"
created: 2026-05-31
updated: 2026-06-01
tags:
  - claude-code
  - skills
  - 工具清单
---

# Claude Code Skills 清单

> 记录所有已安装的 Claude Code Skills，包括能力说明和自动触发条件。
> **维护规则**：每次安装新 Skill 时同步更新此笔记。

---

## 📁 项目 Skills（仅当前项目）

| Skill              | 能力                                      | 自动触发条件                                                       |
| ------------------ | --------------------------------------- | ------------------------------------------------------------ |
| **`paper-to-ppt`** | 论文 → 汇报 PPT 转换：深度分析 PDF 论文，基于模板逐页生成演示文稿 | 提到"论文汇报""组会 PPT""答辩PPT""paper presentation"，且涉及 .pdf + .pptx |

---

## 🏠 个人 Skills（所有项目通用）

| Skill | 能力 | 自动触发条件 |
|-------|------|-------------|
| **`data-analysis`** | 4 步数据分析：安全探索 → 质量检查 → 代码分析 → 洞察报告 | 提到数据分析、图表、统计、EDA、趋势、数据清洗 |
| **`feishu-card`** | 飞书/Lark 交互式富文本卡片消息：日报、告警、审批、数据播报 | 提到飞书、Lark、卡片消息、Bot 通知、发送到飞书群 |
| **`ffmpeg-usage`** | 音视频全链路处理：格式转换、拼接、压缩、GIF、字幕、转录 | 提到视频、音频、ffmpeg、mp4、gif、转码、媒体处理 |

---

## 🔌 插件 Skills（Anthropic 官方 document-skills）

### 📄 文档处理类

| Skill | 能力 | 自动触发条件 |
|-------|------|-------------|
| **`pdf`** | PDF 全能处理：读取/提取/合并/拆分/水印/OCR/加密 | 涉及 .pdf 文件的任何操作 |
| **`docx`** | Word 文档创建/编辑：格式化报告、模板、替换、批注 | 涉及 Word 文档/.docx/报告/备忘录/信函 |
| **`pptx`** | PPT 创建/编辑：幻灯片、模板、演讲备注、OOXML 操作 | 涉及 .pptx/幻灯片/deck/presentation |
| **`xlsx`** | Excel 表格处理：读写/公式/图表/清洗/格式转换 | 涉及 .xlsx/.csv/.tsv 的创建或编辑 |

### 🎨 创意设计类

| Skill | 能力 | 自动触发条件 |
|-------|------|-------------|
| **`frontend-design`** | 高质量前端界面：网页/组件/Landing Page/Dashboard | 提到网页、组件、HTML/CSS、React、UI 美化 |
| **`canvas-design`** | 视觉设计：海报、艺术作品、静态设计（PNG/PDF） | 提到海报、设计、艺术作品、静态视觉 |
| **`algorithmic-art`** | 代码生成艺术：p5.js 流场、粒子系统、生成式艺术 | 提到生成艺术、算法艺术、流场、粒子系统 |
| **`theme-factory`** | 主题样式工具包：10 套预设主题，可应用于幻灯片/文档/网页 | 提到应用主题、风格统一、配色方案 |

### 🛠️ 开发工具类

| Skill | 能力 | 自动触发条件 |
|-------|------|-------------|
| **`claude-api`** | Claude API/SDK 开发：缓存、模型迁移、工具调用优化 | 代码中导入 `anthropic` 或 `@anthropic-ai/sdk` |
| **`mcp-builder`** | MCP 服务器构建：Python (FastMCP) / Node (MCP SDK) | 提到构建 MCP 服务器、封装 API 为工具 |
| **`webapp-testing`** | Web 应用 Playwright 自动化测试：截图、调试、验证 | 提到测试 Web 应用、浏览器截图、UI 调试 |
| **`skill-creator`** | Skill 创建/优化/评测：从零创建、改进触发、基准测试 | 提到创建 Skill、优化 Skill、测量 Skill 性能 |

### 📝 内容写作类

| Skill | 能力 | 自动触发条件 |
|-------|------|-------------|
| **`doc-coauthoring`** | 结构化文档协作写作：提案、技术规范、决策文档 | 提到写文档、创建提案、起草规范 |
| **`internal-comms`** | 内部通讯写作：状态报告、Newsletter、FAQ、项目更新 | 提到内部通讯、状态报告、Newsletter、3P 更新 |

### 🎬 其他工具类

| Skill | 能力 | 自动触发条件 |
|-------|------|-------------|
| **`brand-guidelines`** | Anthropic 品牌色彩/字体应用到任意产出物 | 提到品牌色、风格指南、公司设计标准 |
| **`slack-gif-creator`** | Slack 专用动画 GIF 创建 | 提到"为 Slack 做 GIF" |
| **`web-artifacts-builder`** | 复杂 Web 构件：React + Tailwind + shadcn/ui | 提到复杂 Web 构件、React 应用、shadcn/ui |

---

## 📊 统计

| 分类 | 数量 |
|------|:--:|
| 项目 Skills | 1 |
| 个人 Skills | 3 |
| 插件 Skills | 17 |
| **总计** | **21** |

---

## 🔗 相关笔记

- [[Paper-to-PPT Skill 完整说明]] — 自定义 paper-to-ppt 的详细文档
- [[Clippings/Claude Code 10个必装的 Skills 完全指南（2026）]] — 参考文章
- [[笔记同步助手/2026-05-28/如何用Claude Skill 做高质量 PPT（附完整教程）]] — 参考文章
