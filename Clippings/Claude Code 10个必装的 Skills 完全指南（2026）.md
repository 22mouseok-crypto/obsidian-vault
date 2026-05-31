---
title: "Claude Code 10个必装的 Skills 完全指南（2026）"
source: "https://www.cnblogs.com/qiniushanghai/p/19728076"
author:
  - "[[七牛云行业应用]]"
published: 2026-03-17
created: 2026-05-31
description: "Claude Code Skills 是可插拔的能力扩展包——每个 Skill 是一个 `SKILL.md` 文件夹，为 Claude 注入专项能力，用 `/skill-name` 即可调用，无需写代码、无需安装依赖。本文基于 Claude Code 2026 年 3 月官方文档及官方 Skills"
tags:
  - "clippings"
---
> **一句话定义：** Claude Code Skills 是可插拔的能力扩展包——每个 Skill 是一个 `SKILL.md` 文件夹，为 Claude 注入专项能力，用 `/skill-name` 即可调用，无需写代码、无需安装依赖。

![10个必装的skills-img1](https://img2024.cnblogs.com/blog/3674498/202603/3674498-20260317101432489-805492031.png)

---

## 什么是 Claude Code Skills？

Skills 是 Claude Code 的 **模块化能力扩展系统** （遵循 [AgentSkills.io](https://agentskills.io/) 开放标准）。每个 Skill 由一个 `SKILL.md` 文件定义，包含：

- `description` ：告诉 Claude 何时自动调用该 Skill
- 操作步骤/工具调用规则：定义 Skill 执行的具体行为
- 可选的脚本、模板、示例文件

**三种存储位置：**

| 位置 | 路径 | 作用域 |
| --- | --- | --- |
| 个人 Skills | `~/.claude/skills/` | 所有项目通用 |
| 项目 Skills | `.claude/skills/` | 仅当前项目 |
| 插件 Skills | 随插件安装 | 插件启用范围 |

Anthropic 官方提供了 17 个开源 Skills（ [github.com/anthropics/skills](https://github.com/anthropics/skills) ），社区生态已延伸至数十个功能领域。

---

## 如何安装 Skills？

**方式一：官方插件市场**

```bash
# 注册官方 Skills 仓库为插件源
/plugin marketplace add anthropics/skills

# 安装文档处理包（含 pdf/xlsx/docx/pptx）
/plugin install document-skills@anthropic-agent-skills
```

**方式二：手动安装**

```bash
# 1. 创建 Skill 目录
mkdir -p ~/.claude/skills/my-skill

# 2. 放入 SKILL.md 文件后即刻生效，无需重启
```

---

## 10 个必装 Skills 总览

![10个必装的skills-img2](https://img2024.cnblogs.com/blog/3674498/202603/3674498-20260317101516566-1938426143.png)

| # | Skill 名 | 核心能力 | 适合人群 |
| --- | --- | --- | --- |
| 1 | `pdf` | PDF全能处理 | 所有人 |
| 2 | `xlsx` | Excel/表格处理 | 数据/运营 |
| 3 | `docx` | Word文档生成 | 内容/职场 |
| 4 | `data-analysis` | 数据全链路分析 | 数据分析师 |
| 5 | `frontend-design` | 高质量前端界面 | 开发者/设计师 |
| 6 | `webapp-testing` | Web应用自动化测试 | 开发/QA |
| 7 | `ffmpeg-usage` | 音视频处理 | 创作者 |
| 8 | `mcp-builder` | 构建MCP服务器 | 开发者 |
| 9 | `feishu-card` | 飞书富文本卡片 | 企业用户 |
| 10 | `skill-creator` | 创建自定义Skills | 进阶用户 |

---

## 逐一详解：10 个必装 Skills

### 1\. pdf — PDF全能处理

**官方出品，Anthropic Skills 仓库**

涵盖一切 PDF 操作：读取提取文字/表格、合并/拆分 PDF、添加水印、填写 PDF 表单、OCR 扫描件识别、加密解密。只要你提到 `.pdf` 文件或希望输出 PDF，Claude 会自动激活。

```
/pdf 提取这份合同的所有条款，整理成表格
```

**典型用例：** 合同分析、研报提取、批量 PDF 合并、扫描件全文搜索。

---

### 2\. xlsx — Excel/表格处理

**官方出品，Anthropic Skills 仓库**

处理 `.xlsx` 、`.xlsm` 、`.csv` 、`.tsv` ：读取修改、添加列/公式、数据清洗、制作图表、格式化、转换格式。 **专为"输出必须是电子表格文件"的任务设计** ，不会输出 HTML 报告或 Python 脚本代替。

```
把这份 CSV 的日期列格式统一，去除重复行，按销售额降序排列，存回 xlsx
```

**典型用例：** 财务报表清洗、数据汇总、预算表制作、多 sheet 合并。

---

### 3\. docx — Word 文档处理

**官方出品，Anthropic Skills 仓库**

创建、读取、编辑 `.docx` 文件：生成格式规范的 Word 文档、提取内容、修改样式。与 `pdf` 配合可实现 Word → PDF 的完整文档流水线。

```
/docx 把这份 Markdown 技术规范转成 Word 格式，加上公司样式和页眉页脚
```

**典型用例：** 报告生成、合同起草、技术文档格式化、邮件附件制作。

---

### 4\. data-analysis — 数据全链路分析

**社区 Skill**

全链路数据分析工作流，强制遵循四步：

1. **安全探查** ：仅读取元数据和少量样本，防止 Token 溢出
2. **质量体检** ：自动检查缺失值、重复、一致性问题
3. **代码执行** ：基于 Python（Pandas/Matplotlib）清洗、统计、可视化
4. **报告生成** ：输出结论性洞察报告

支持 CSV、Excel、PDF、DOCX、图像等多格式输入。

```
分析这份电商销售数据，找出 GMV 最高的品类趋势，生成可视化图表和分析报告
```

**典型用例：** 探索性分析（EDA）、用户行为分析、财务数据可视化。

---

### 5\. frontend-design — 高质量前端界面

**官方出品，Anthropic Skills 仓库**

生产级前端开发：网页组件、Landing Page、Dashboard、React 组件、HTML/CSS 布局。 **刻意规避"AI 审美"的廉价感** ，输出有设计品质的代码。

```
/frontend-design 做一个 SaaS 产品定价页，三档套餐，现代极简风，带动效
```

**典型用例：** 落地页快速开发、组件原型、UI 改版、活动页制作。

---

### 6\. webapp-testing — Web 应用自动化测试

**官方出品，Anthropic Skills 仓库**

基于 Playwright 与本地 Web 应用交互：验证前端功能、调试 UI 行为、截取浏览器截图、查看控制台日志。 **直接操控真实浏览器** ，而非纸上谈兵地写 mock。

```
打开 localhost:3000，测试注册流程，截图记录每一步，报告发现的问题
```

**典型用例：** 端到端测试、功能验收、回归测试截图对比、UI Bug 复现。

---

### 7\. ffmpeg-usage — 音视频处理

**社区 Skill**

调用 FFmpeg 处理所有音视频任务：格式转换、视频拼接/合并、尺寸调整/压缩、GIF 制作、音频提取、字幕嵌入、文案转录。内置各社交平台（抖音/小红书/微信）的参数优化预设。

```
把这 10 段录屏拼成一个视频，压缩到 50MB 以内，输出 mp4 竖屏格式
```

**典型用例：** 内容创作后期、课程录屏处理、社交媒体视频适配。

---

### 8\. mcp-builder — 构建 MCP 服务器

**官方出品，Anthropic Skills 仓库**

MCP（Model Context Protocol）服务器开发指南，支持 Python（FastMCP）和 Node/TypeScript（MCP SDK）。帮助开发者将任何外部 API 或服务封装成 Claude 可直接调用的工具。

```
/mcp-builder 把公司的 CRM API 封装成 MCP 工具，让 Claude 能直接查询客户数据
```

**典型用例：** 接入公司内部系统、封装第三方 API、构建私有工具链。七牛云的 MCP 服务也遵循标准 MCP 协议，构建后即可与 Skills 体系无缝集成。

---

### 9\. feishu-card — 飞书富文本卡片

**社区 Skill**

通过飞书开放 API 发送交互式富文本卡片，支持 Markdown（代码块、表格）、标题、彩色卡头、按钮，可发送给指定用户或群组。

```
把今天的日报总结成飞书卡片发到团队群，高亮三个关键数字，加一个"查看详情"按钮
```

**典型用例：** 自动化日报/周报推送、告警通知、审批流触发、数据播报。

---

### 10\. skill-creator — 创建自定义 Skills

**官方出品，Anthropic Skills 仓库**

手把手引导创建高质量 Skills：如何写 frontmatter、如何设计 description 让 Claude 精准触发、如何添加辅助脚本和模板文件、如何控制调用权限。 **是让 Claude 真正"为你定制"的元能力。**

```
/skill-creator 帮我创建一个 code-review 技能，遵循我们团队的代码规范文档
```

**典型用例：** 团队规范固化、定制工作流 SOP、把反复使用的 Prompt 沉淀为可复用的 Skill。

---

## 进阶：更多值得关注的 Skills

安装完 10 个必装之后，根据使用场景可进一步扩充：

| 场景 | 推荐 Skill |
| --- | --- |
| 内容创作 | `baoyu-infographic` （信息图）、 `baoyu-article-illustrator` （文章配图） |
| 小红书运营 | `xiaohongshu-analyze` （爆款分析）、 `baoyu-xhs-images` （配图生成） |
| 开发者工具 | `webapp-testing` 、 `remotion-video` （代码生成视频） |
| AI 搜索优化 | `geo-article-generator` （GEO 文章生成） |
| 国际化 | `deepl` （DeepL 翻译） |

---

## 常见问题 Q&A

**Q：Skills 和普通 Prompt 有什么区别？**  
A：Skills 是 **持久化、可复用、可共享** 的能力模块。普通 Prompt 只在当前对话生效；Skills 存储在文件系统，每次启动都可用，还能跨项目共享。团队协作时，把 `.claude/skills/` 提交到 Git，所有成员自动共享相同能力。

**Q：Skills 会自动触发吗？还是需要手动调用？**  
A：两种方式都支持。带有 `description` 的 Skill，Claude 会根据上下文自动激活；加了 `disable-model-invocation: true` 的 Skill 只能手动用 `/skill-name` 触发。高风险操作（如部署、推送）建议设为手动触发。

**Q：Skills 能访问互联网吗？**  
A：取决于 Skill 的 `allowed-tools` 配置。可以允许 `WebFetch` 、 `Bash(curl *)` 等工具让 Skill 联网。企业环境下可通过 Managed Settings 统一限制网络访问范围。

**Q：一个 Skill 最多能有多少文件？**  
A：没有硬性限制，但官方建议 `SKILL.md` 保持在 500 行以内，将详细参考文档拆分到独立文件（ `reference.md` 、 `examples.md` ）按需加载，避免每次都占用过多 context。

**Q：免费用户能使用 Skills 吗？**  
A：Skills 本身不额外收费，是 Claude Code 的内置功能。Skills 执行时消耗的是普通的 Token 配额。

---

## 总结

Claude Code Skills 是把 Claude 从"对话助手"升级为"专业工具套件"的关键。按使用频率推荐安装优先级：

**第一梯队（通用型）：** `pdf` → `xlsx` → `docx` → `data-analysis`

**第二梯队（开发者型）：** `frontend-design` → `webapp-testing` → `mcp-builder`

**第三梯队（效率提升型）：** `ffmpeg-usage` → `feishu-card` → `skill-creator`

Skills 遵循 AgentSkills.io 开放标准，意味着你在 Claude Code 里创建的 Skill 未来可跨 AI 工具平台复用。 **今天花 10 分钟装好这 10 个 Skills，相当于给你的 Claude 配备了一整套专业工具箱。**

*本文基于 Claude Code 2026 年 3 月官方文档及官方 Skills 仓库（github.com/anthropics/skills）整理，Skills 生态持续扩展，建议关注官方动态。*

---

**延伸资源**

- Claude Code Skills 官方文档： [https://code.claude.com/docs/en/skills](https://code.claude.com/docs/en/skills)
- Anthropic 官方 Skills 仓库： [https://github.com/anthropics/skills](https://github.com/anthropics/skills)
- Skills 开放标准： [https://agentskills.io](https://agentskills.io/)
- 七牛云 Claude Code Skills 指南： [https://developer.qiniu.com/aitokenapi/13171/claude-code-skill-introduce](https://developer.qiniu.com/aitokenapi/13171/claude-code-skill-introduce)