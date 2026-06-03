---
title: "Claude Code Skills 清单"
created: 2026-05-31
updated: 2026-06-03
auto-maintained: update-skill-inventory
tags:
  - claude-code
  - skills
  - 工具清单
---

# Claude Code Skills 清单

> 记录所有已安装的 Claude Code Skills，包括能力说明和自动触发条件。
> **本笔记由 `update-skill-inventory` Skill 自动维护**，安装/卸载 Skill 后自动更新，无需手动编辑。

---

## 📁 项目 Skills（仅当前项目）

| Skill | 能力 | 自动触发条件 |
|-------|------|-------------|
| — | *暂无项目专属 Skill* | — |

---

## 🏠 个人 Skills（所有项目通用）

| Skill | 能力 | 自动触发条件 |
|-------|------|-------------|
| **`data-analysis`** | 4 步数据分析：安全探索 → 质量检查 → 代码分析 → 洞察报告 | 提到数据分析、图表、统计、EDA、趋势、数据清洗 |
| **`feishu-card`** | 飞书/Lark 交互式富文本卡片消息：日报、告警、审批、数据播报 | 提到飞书、Lark、卡片消息、Bot 通知、发送到飞书群 |
| **`ffmpeg-usage`** | 音视频全链路处理：格式转换、拼接、压缩、GIF、字幕、转录 | 提到视频、音频、ffmpeg、mp4、gif、转码、媒体处理 |
| **`paper-to-ppt`** | 论文 → 汇报 PPT：深度分析 PDF 论文，基于模板逐页生成演示文稿 | 提到"论文汇报""组会 PPT""答辩PPT""paper presentation"，涉及 .pdf + .pptx |
| **`update-skill-inventory`** | 自动扫描所有 Skill 并更新此清单笔记 | 安装/卸载 Skill 时自动触发；手动调用刷新 |
| **`user-profile`** | 自进化个人画像：跨会话识别并记录用户信息到 "This is me" | 用户表达偏好、习惯、背景、兴趣等可记录信息 |
| **`agentmemory`** | 持久化记忆：跨会话记忆项目上下文、技术决策、代码约定 | 多会话切换项目、提到"上次说的"、"继续昨天的" |

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

### 🧠 记忆与推理类

| Skill | 能力 | 自动触发条件 |
|-------|------|-------------|
| **`deep-research`** | 深度研究：多源搜索、交叉验证、综合报告 | 需要深度调研、事实核查、多源综合 |

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

| 分类 | 数量 | 新增 |
|------|:--:|------|
| 项目 Skills | 0 | — |
| 个人 Skills | **9** | +4（agentmemory, user-profile, paper-to-ppt, update-skill-inventory） |
| 插件 Skills | 17 | 新增 8 个（pdf, docx, xlsx, pptx, frontend-design, mcp-builder, webapp-testing, skill-creator） |
| **总计** | **26** | +12 |

---

## 🔧 已安装的外部工具

| 工具 | 状态 | 备注 |
|------|:---:|------|
| `agentmemory` (npm) | ✅ 已安装 + Skill 封装 | MCP 服务器运行在端口 3111 |
| `local-deep-research` (Docker) | ⏳ 等待启动 Docker Desktop | Docker Compose 已下载 |
| `superpowers` (插件) | ❌ 需手动安装 | `/plugin install superpowers@claude-plugins-official` |

## 🔍 如何验证 Skill 是否被正确调用？

Claude Code 的 Skill 触发是内部决策，对话中不会直接显示"已启用 XX Skill"。以下方法可以验证：

### 1. 显式调用（最可靠）
直接输入 `/skill-name` 手动触发，不依赖自动匹配：
```
/paper-to-ppt 论文.pdf 模板.pptx
```

### 2. 问 Claude 用了哪些 Skill
在对话中直接问：
> "你刚才处理这个任务时，调用了哪些 Skill？"

或者对话一开始就问：
> "列出当前可用的 Skills，说明你会怎么处理我的需求。"

### 3. 检查 Skill 文件是否存在
```bash
# 检查某个 Skill 是否已安装
ls ~/.claude/skills/paper-to-ppt/SKILL.md && echo "已安装" || echo "未安装"
```

### 4. 测试自动触发
用明显应该触发某 Skill 的话术测试——如果 Claude 的处理方式不像该 Skill 的工作流，就说明没触发。

### 5. 观察 Claude 的工作方式
- 触发了 `pdf` skill → 会用 pdfplumber/pypdf 提取，不是直接 Read PDF
- 触发了 `pptx` skill → 会用 markitdown 或 OOXML 工具操作 .pptx
- 触发了 `paper-to-ppt` → 会先分析论文结构、再分析模板、确认方案后才填充

### 建议
- **重要任务**：显式 `/skill-name` 调用
- **日常操作**：信任自动触发（触发条件匹配时很准）
- **不确定时**：直接问 Claude "用了哪些 Skill？"

---

## 🔗 相关笔记

- [[Paper-to-PPT Skill 完整说明]] — 自定义 paper-to-ppt 的详细文档
- [[Clippings/Claude Code 10个必装的 Skills 完全指南（2026）]] — 参考文章
- [[笔记同步助手/2026-05-28/如何用Claude Skill 做高质量 PPT（附完整教程）]] — 参考文章
- `update-skill-inventory` — 自动维护本清单的 Skill（位于 `~/.claude/skills/update-skill-inventory/`）
