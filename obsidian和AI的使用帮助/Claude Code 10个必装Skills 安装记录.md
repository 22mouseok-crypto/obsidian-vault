---
tags:
  - claude-code
  - skills
  - ai-tools
created: 2026-05-31
---

# Claude Code 10 个必装 Skills 安装记录

> 基于《Claude Code 10个必装的 Skills 完全指南（2026）》安装，安装日期：2026-05-31

---

## Skills 总览

| # | Skill | 来源 | 定位 | 安装方式 |
|---|-------|------|------|----------|
| 1 | pdf | 官方 | PDF 全能处理 | 插件市场 |
| 2 | xlsx | 官方 | Excel/表格处理 | 插件市场 |
| 3 | docx | 官方 | Word 文档处理 | 插件市场 |
| 4 | data-analysis | 社区 | 数据全链路分析 | 手动创建 |
| 5 | frontend-design | 官方 | 高质量前端界面 | 插件市场 |
| 6 | webapp-testing | 官方 | Web 应用自动化测试 | 插件市场 |
| 7 | ffmpeg-usage | 社区 | 音视频处理 | 手动创建 |
| 8 | mcp-builder | 官方 | 构建 MCP 服务器 | 插件市场 |
| 9 | feishu-card | 社区 | 飞书富文本卡片 | 手动创建 |
| 10 | skill-creator | 官方 | 创建自定义 Skills | 插件市场 |

---

## 逐一详情

### 1. pdf — PDF 全能处理

- **来源**：官方（Anthropic Skills 仓库，`document-skills` 插件包）
- **触发方式**：提到 `.pdf` 文件或希望输出 PDF 时自动激活；手动调用 `/pdf`
- **核心能力**：读取提取文字/表格、合并/拆分 PDF、添加水印、填写 PDF 表单、OCR 扫描件识别、加密解密
- **典型用例**：合同分析、研报提取、批量 PDF 合并、扫描件全文搜索

### 2. xlsx — Excel/表格处理

- **来源**：官方（Anthropic Skills 仓库，`document-skills` 插件包）
- **触发方式**：处理 `.xlsx`、`.xlsm`、`.csv`、`.tsv` 时自动激活；手动调用 `/xlsx`
- **核心能力**：读取修改电子表格、添加列/公式、数据清洗、制作图表、格式化、格式转换
- **典型用例**：财务报表清洗、数据汇总、预算表制作、多 sheet 合并

### 3. docx — Word 文档处理

- **来源**：官方（Anthropic Skills 仓库，`document-skills` 插件包）
- **触发方式**：处理 `.docx` 文件时自动激活；手动调用 `/docx`
- **核心能力**：创建/读取/编辑 `.docx` 文件、生成格式规范的 Word 文档、提取内容、修改样式
- **典型用例**：报告生成、合同起草、技术文档格式化、邮件附件制作

### 4. data-analysis — 数据全链路分析

- **来源**：社区（手动创建于 `~/.claude/skills/data-analysis/SKILL.md`）
- **触发方式**：提到数据分析、图表、统计、EDA、趋势、数据清洗时自动激活；手动调用 `/data-analysis`
- **核心能力**：强制四步工作流——
  1. **安全探查**：仅读取元数据和少量样本，防止 Token 溢出
  2. **质量体检**：自动检查缺失值、重复、一致性问题
  3. **代码执行**：基于 Python（Pandas/Matplotlib/Seaborn）清洗、统计、可视化
  4. **报告生成**：输出结论性洞察报告
- **支持格式**：CSV、Excel、PDF、DOCX、图像
- **典型用例**：探索性分析（EDA）、用户行为分析、财务数据可视化

### 5. frontend-design — 高质量前端界面

- **来源**：官方（Anthropic Skills 仓库，`example-skills` 插件包）
- **触发方式**：需要前端开发/设计时自动激活；手动调用 `/frontend-design`
- **核心能力**：生产级前端开发——网页组件、Landing Page、Dashboard、React 组件、HTML/CSS 布局；刻意规避"AI 审美"廉价感
- **典型用例**：落地页快速开发、组件原型、UI 改版、活动页制作

### 6. webapp-testing — Web 应用自动化测试

- **来源**：官方（Anthropic Skills 仓库，`example-skills` 插件包）
- **触发方式**：需要 Web 测试时自动激活；手动调用 `/webapp-testing`
- **核心能力**：基于 Playwright 与本地 Web 应用交互——验证前端功能、调试 UI 行为、截取浏览器截图、查看控制台日志；直接操控真实浏览器
- **典型用例**：端到端测试、功能验收、回归测试截图对比、UI Bug 复现

### 7. ffmpeg-usage — 音视频处理

- **来源**：社区（手动创建于 `~/.claude/skills/ffmpeg-usage/SKILL.md`）
- **触发方式**：提到视频、音频、ffmpeg、mp4、gif、转码、媒体处理时自动激活；手动调用 `/ffmpeg-usage`
- **核心能力**：格式转换、视频拼接/合并、尺寸调整/压缩、GIF 制作、音频提取、字幕嵌入、文案转录
- **特色功能**：内置各社交平台参数预设——
  - 抖音/TikTok（9:16 竖屏）
  - 小红书（4:5 或 1:1）
  - 微信视频号（16:9）
- **典型用例**：内容创作后期、课程录屏处理、社交媒体视频适配

### 8. mcp-builder — 构建 MCP 服务器

- **来源**：官方（Anthropic Skills 仓库，`example-skills` 插件包）
- **触发方式**：需要构建 MCP 服务器/封装 API 时自动激活；手动调用 `/mcp-builder`
- **核心能力**：MCP（Model Context Protocol）服务器开发指南，支持 Python（FastMCP）和 Node/TypeScript（MCP SDK）；帮助将外部 API 或服务封装成 Claude 可直接调用的工具
- **典型用例**：接入公司内部系统、封装第三方 API、构建私有工具链

### 9. feishu-card — 飞书富文本卡片

- **来源**：社区（手动创建于 `~/.claude/skills/feishu-card/SKILL.md`）
- **触发方式**：提到飞书、Lark、卡片消息、机器人通知时自动激活；手动调用 `/feishu-card`
- **核心能力**：通过飞书开放 API 发送交互式富文本卡片，支持 Markdown（代码块、表格）、标题、彩色卡头、按钮，可发送给指定用户或群组
- **需要配置**：
  - `FEISHU_APP_ID` — 飞书应用 ID
  - `FEISHU_APP_SECRET` — 飞书应用密钥
  - 应用需开启 `im:message:send_as_bot` 权限
- **典型用例**：自动化日报/周报推送、告警通知、审批流触发、数据播报

### 10. skill-creator — 创建自定义 Skills

- **来源**：官方（Anthropic Skills 仓库，`example-skills` 插件包）
- **触发方式**：需要创建新 Skill 时自动激活；手动调用 `/skill-creator`
- **核心能力**：手把手引导创建高质量 Skills——如何写 frontmatter、如何设计 description 让 Claude 精准触发、如何添加辅助脚本和模板文件、如何控制调用权限
- **典型用例**：团队规范固化、定制工作流 SOP、把反复使用的 Prompt 沉淀为可复用的 Skill

---

## 插件信息

安装的两个官方插件包：

```
document-skills@anthropic-agent-skills  (v da20c92503b2, user scope, enabled)
example-skills@anthropic-agent-skills   (v da20c92503b2, user scope, enabled)
```

这两个插件包实际包含了超过 17 个 Skills（含 pptx、canvas-design、claude-api、slack-gif-creator 等），本文档只列出指南推荐的 10 个。

---

## 存储位置

| 类型 | 路径 |
|------|------|
| 官方插件 Skills | `~/.claude/plugins/cache/anthropic-agent-skills/` |
| 手动创建的社区 Skills | `~/.claude/skills/data-analysis/SKILL.md` |
|  | `~/.claude/skills/ffmpeg-usage/SKILL.md` |
|  | `~/.claude/skills/feishu-card/SKILL.md` |

---

## 使用技巧

- **自动激活**：在对话中提到相关关键词（如 PDF、Excel、视频、飞书），Claude 会自动加载对应 Skill
- **手动调用**：使用 `/skill-name` 格式直接调用，如 `/pdf`、`/xlsx`、`/frontend-design`
- **查看帮助**：在 Claude Code 中输入 `/help` 查看所有可用 Skills
- **禁用不需要的**：`claude plugin disable <plugin-name>` 可禁用整个插件包；Skill 级别的禁用需在插件设置中配置

---

## 参考来源

- Claude Code Skills 官方文档：https://code.claude.com/docs/en/skills
- Anthropic 官方 Skills 仓库：https://github.com/anthropics/skills
- Skills 开放标准：https://agentskills.io
- 原指南文章：https://www.cnblogs.com/qiniushanghai/p/19728076
