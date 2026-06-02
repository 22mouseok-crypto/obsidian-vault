---
title: "Paper-to-PPT Skill 完整说明"
created: 2026-05-31
tags:
  - claude-code
  - skill
  - paper-to-ppt
  - 论文汇报
  - PPT
---

# Paper-to-PPT Skill 完整说明

## 一句话概述

> **将学术论文 PDF 自动转换为高质量汇报 PPT**——深度理解论文内容，基于你的模板逐页生成专业演示文稿。

---

## 能力总览

```
/paper-to-ppt paper.pdf template.pptx
         │
    ┌────▼────┐  📄 论文读取    ← 【协同: 官方 pdf skill + 自定义脚本】
    │ Phase 1 │  PDF 全文提取 + 章节结构识别 + 图表捕获
    └────┬────┘
    ┌────▼────┐  📊 数据深挖    ← 【协同: data-analysis skill】
    │ Phase 2 │  实验数据可视化 + 关键对比图表生成
    └────┬────┘
    ┌────▼────┐  🎨 模板分析    ← 【协同: 官方 pptx skill】
    │ Phase 3 │  布局识别 + 配色提取 + 缩略图预览
    └────┬────┘
    ┌────▼────┐  🗺️ 内容映射    ← 【Claude 推理编排】
    │ Phase 4 │  论文结构 → PPT 叙事结构
    └────┬────┘
    ┌────▼────┐  ✏️ 逐页生成    ← 【自定义 python-pptx 脚本】
    │ Phase 5 │  模板风格保留 + 局部布局动态适配
    └────┬────┘
    ┌────▼────┐  ✅ 质量验证    ← 【协同: 官方 pptx skill QA 流程】
    │ Phase 6 │  markitdown 内容检查 + thumbnail 视觉验证
    └────┬────┘
    ┌────▼────┐  🎯 输出交付
    │ Phase 7 │  [论文简称]_汇报.pptx + 汇报建议
    └─────────┘
```

---

## 与 10 个 Skills 的协同关系

本 Skill 的设计核心是**编排协同**——它不重复造轮子，而是将你已安装的 10 个 Skills 的能力串联为一个完整工作流：

| # | Skill | 来源 | 在 paper-to-ppt 中的作用 | 调用阶段 |
|---|-------|------|--------------------------|----------|
| 1 | **`pdf`** | 官方 Anthropic | PDF 文本提取（pdfplumber）、表格数据提取、图片导出 | Phase 1, 2 |
| 2 | **`xlsx`** | 官方 Anthropic | 论文实验数据表格的读写与格式化 | Phase 2 |
| 3 | **`docx`** | 官方 Anthropic | 当论文是 Word 格式时的内容读取 | Phase 1 |
| 4 | **`data-analysis`** | 社区 | 实验数据 4 步深度分析（探索→质检→分析→报告） | Phase 2 |
| 5 | **`frontend-design`** | 官方 Anthropic | 幻灯片设计创意参考（大胆配色、独特排版） | Phase 3, 5 |
| 6 | `webapp-testing` | 官方 Anthropic | （非直接使用） | — |
| 7 | `ffmpeg-usage` | 社区 | （非直接使用） | — |
| 8 | `mcp-builder` | 官方 Anthropic | （非直接使用） | — |
| 9 | `feishu-card` | 社区 | 完成后可选：飞书推送汇报通知 | Phase 7 |
| 10 | `skill-creator` | 官方 Anthropic | 持续优化本 Skill 的结构和质量 | 维护阶段 |

### 关键协同点详解

#### 🔗 与官方 `pptx` skill 的深度整合
- **模板分析**：使用 `python -m markitdown` 读取模板文本 + `thumbnail.py` 生成缩略图
- **设计规范**：全面采纳官方 pptx skill 的 10 套配色方案、8 组字体配对、排版间距规则
- **QA 流程**：采纳官方的双重验证法（markitdown 内容检查 + thumbnail 视觉审查）
- **反模式清单**：严格执行"标题不加装饰线""避免纯文字页""不重复布局"等专业规范

#### 🔗 与 `pdf` + `data-analysis` 的数据管线
- 论文表格 → pdfplumber 提取 → CSV → data-analysis 4 步分析 → 可视化图表 → 嵌入 PPT

#### 🔗 与 `frontend-design` 的审美注入
- 借鉴其"大胆美学方向"理念（brutally minimal / maximalist / editorial）
- 避免"AI 审美"廉价感（不用 Inter/Roboto，不用紫色渐变白底）

---

## 技术架构

### 三层结构

```
┌─────────────────────────────────────────────┐
│  SKILL.md (编排层)                           │
│  ─ 7 步工作流定义                            │
│  ─ 10 个协同 Skills 的调用逻辑               │
│  ─ 设计规范引用 (来自官方 pptx skill)         │
│  ─ 故障排查指南                              │
├─────────────────────────────────────────────┤
│  Python 脚本 (执行层)                        │
│  ├── analyze_paper.py  ─ PDF 结构化分析      │
│  │   · 双栏排版智能处理                      │
│  │   · 章节自动识别 (中英文)                  │
│  │   · 图表检测与导出                        │
│  └── fill_template.py  ─ PPT 模板操作        │
│      · 风格提取 (配色/字体/布局)              │
│      · 幻灯片内容填充 (保留模板格式)           │
│      · 图表嵌入 + 动态布局调整                │
├─────────────────────────────────────────────┤
│  参考文档 (知识层)                           │
│  └── slide-design-rules.md                  │
│      · 整合官方 pptx skill 设计规范           │
│      · 学术汇报叙事框架                      │
│      · AI 风格避免清单                       │
└─────────────────────────────────────────────┘
```

### 文件位置

```
.claude/skills/paper-to-ppt/
├── SKILL.md                          # Skill 定义与编排逻辑
├── scripts/
│   ├── requirements.txt              # python-pptx, PyMuPDF, Pillow
│   ├── analyze_paper.py              # 论文深度分析脚本
│   └── fill_template.py              # 模板分析与填充脚本
└── references/
    └── slide-design-rules.md         # 学术汇报设计规范
```

---

## 使用指南

### 基础用法

```bash
# 在 Claude Code 中直接对话即可（Skill 会自动触发）
"帮我把这篇论文做成组会汇报 PPT，用实验室的模板。"
```

或显式调用：
```bash
/paper-to-ppt Attention_is_All_You_Need.pdf lab_template.pptx
```

### Skill 自动触发条件

当你的消息同时满足以下条件时，`paper-to-ppt` 会自动激活：
- 提到论文（.pdf 文件）
- 提到 PPT/模板（.pptx 文件）
- 提到"汇报"、"组会"、"答辩"、"presentation"、"slides"等关键词

### 交互流程

1. **你提供**：论文 PDF + PPT 模板文件
2. **Claude 分析**：提取论文结构、分析模板风格
3. **Claude 确认**：展示幻灯片计划，等你确认
4. **Claude 生成**：逐页填充 PPT
5. **Claude 验证**：内容 + 视觉双重 QA
6. **输出**：`论文名_汇报.pptx` + 汇报建议

### 模板要求

- 格式：`.pptx`（PowerPoint 2007+）
- 建议包含：标题页布局、内容页布局、节标题布局、空白布局
- 模板的 Slide Master 设计（背景、配色）会被完整保留
- 局部布局可根据论文内容灵活调整

### 论文格式支持

- ✅ **PDF**（主要支持）— 含双栏排版处理
- ✅ 中文论文
- ✅ 英文论文
- 🔄 Word（通过协同 `docx` skill）
- 🔄 扫描版（通过协同 `pdf` skill 的 OCR 模式）

---

## 设计哲学

### 为什么不是从零生成，而是编辑模板？

> **模板承载了实验室/公司/个人的视觉品牌。** 从零生成虽然快，但每次产出的风格不一致。编辑模板确保：
> - 每次汇报的视觉风格统一
> - 实验室/公司 Logo 和配色自动继承
> - 不必每次重新设计

### 为什么是"编排协同"而不是"大而全的单体"？

> Claude Code Skills 的最佳实践是**小而专、可组合**。本 Skill 的独特价值在于**编排**——将 PDF 读取、数据分析、PPT 编辑、设计审查等能力串联为一个流畅的论文汇报工作流，而非重复实现已有能力。

### 与现有 PPT 方案的区别

| 方案 | 方式 | 模板编辑 | 论文理解 | 产出格式 |
|------|------|:---:|:---:|------|
| **axi-front-design-skill** | HTML→PPT | ❌ 从零生成 | 基础 | HTML 渲染 |
| **官方 pptx skill** | OOXML/pptxgenjs | ✅ | ❌ 不涉及 | .pptx |
| **paper-to-ppt (本方案)** | 编排协同 + python-pptx | ✅ 保留模板 | ✅ 深度分析 | .pptx |

---

## 常见问题

**Q：和官方 pptx skill 冲突吗？**
A：不冲突，而是互补。本 Skill 负责论文理解和流程编排，官方 pptx skill 提供底层工具和分析能力。两者在 Phase 3 和 Phase 6 中协同工作。

**Q：模板的动画和过渡效果会被保留吗？**
A：由于 python-pptx 的限制，动画和过渡效果可能在编辑过程中丢失。建议在模板中主要依赖静态设计（配色、字体、背景），最后在 PowerPoint 中手动添加动画。

**Q：能处理多少页论文？**
A：理论上不限。但论文越长，分析时间越长。建议 8-20 页的典型会议/期刊论文效果最佳。

**Q：生成的 PPT 需要多少人工修改？**
A：目标是 90% 自动化。通常只需：
- 微调几页的布局（5 分钟）
- 确认图表清晰度
- 添加个性化的演讲备注

---

## 版本信息

- **版本**：v1.0
- **创建日期**：2026-05-31
- **依赖**：
  - Python 3.10+ with `python-pptx`, `PyMuPDF`, `Pillow`
  - Claude Code 官方 document-skills 插件（`pdf`, `pptx`, `xlsx`, `docx`）
  - 社区 `data-analysis` skill
- **参考文章**：
  - [[Clippings/Claude Code 10个必装的 Skills 完全指南（2026）.md]]
  - [[笔记同步助手/2026-05-28/如何用Claude Skill 做高质量 PPT（附完整教程）.md]]
