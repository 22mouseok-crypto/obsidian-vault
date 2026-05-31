---
name: paper-to-ppt
description: |
  将学术论文深度分析后转换为汇报 PPT。读取论文 PDF 进行全方位理解，然后基于用户
  指定的 .pptx 模板逐页生成论文汇报演示文稿。保留模板的 Slide Master 设计风格，
  局部布局根据论文内容灵活适配。
  触发场景：用户提到"论文汇报"、"组会 PPT"、"答辩 PPT"、"把论文做成 PPT"、
  "paper presentation"、"journal club" 等，且涉及 .pdf 论文和 .pptx 模板。
allowed-tools: Read, Write, Edit, Bash, Glob, Grep, AskUserQuestion
---

# Paper-to-PPT：论文 → 汇报 PPT 智能转换

将学术论文（PDF）深度分析后，基于你的 PPT 模板逐页生成高质量汇报演示文稿。

本 Skill 作为**编排中心**，协调以下已安装的官方/社区 Skills 协同工作：

| 协同 Skill | 职责 | 调用时机 |
|------------|------|----------|
| **`pdf`** (官方) | PDF 文本/表格/图片提取 | Phase 1 — 论文读取 |
| **`pptx`** (官方) | 模板分析、OOXML 编辑、QA 验证 | Phase 2, 5, 7 |
| **`data-analysis`** (社区) | 论文实验数据深度分析 | Phase 2 — 数据分析 |
| **`frontend-design`** (官方) | 幻灯片视觉设计决策参考 | Phase 3, 5 |
| **`xlsx`** (官方) | 实验数据表格处理 | Phase 2 — 表格数据 |

## 核心原则

1. **深度理解先行**：不急于填充幻灯片，先全面理解论文的每个部分
2. **模板风格保留**：继承模板 Slide Master（背景、配色、字体），局部布局灵活适配
3. **内容驱动布局**：根据实际内容选择布局，不削足适履
4. **学术汇报标准**：遵循 Why → What → How → Results → Impact 叙事逻辑
5. **专业视觉品质**：应用官方 pptx skill 的设计规范（配色、字体、反模式避免）

## 工作流（7 步）

### Phase 1：论文读取与理解

1. 确认文件路径（`$ARGUMENTS` 或向用户询问）
2. **使用官方 `pdf` skill 提取文本**（pdfplumber 保留布局）：
   ```python
   import pdfplumber
   with pdfplumber.open("paper.pdf") as pdf:
       full_text = ""
       for page in pdf.pages:
           full_text += page.extract_text() + "\n"
   ```
3. 使用 `analyze_paper.py` 进行结构化分析（章节识别、图表检测）：
   ```bash
   python .claude/skills/paper-to-ppt/scripts/analyze_paper.py paper.pdf \
       --output paper_outline.json --extract-figures ./figures/
   ```
4. 同时使用官方 pdf skill 提取论文中的表格数据（如有）：
   ```python
   with pdfplumber.open("paper.pdf") as pdf:
       tables = [t for page in pdf.pages for t in page.extract_tables()]
   ```
5. 阅读 `paper_outline.json`，全面理解论文。确认你掌握了：
   - 研究的核心问题/动机
   - 提出的方法/创新点
   - 实验设计与关键结果
   - 主要贡献与局限性

### Phase 2：实验数据深度分析（如适用）

6. 如果论文包含实验数据表格，**使用 `data-analysis` skill** 进行深度分析：
   - 将提取的表格数据保存为 CSV
   - 调用 data-analysis 的 4 步工作流（探索→质检→分析→报告）
   - 生成关键对比图表（用于后续嵌入 PPT）
7. 如果数据是 Excel 格式，可协同使用 **`xlsx` skill** 进行表格处理

### Phase 3：模板分析

8. **使用官方 `pptx` skill 进行模板分析**：
   ```bash
   # 文本内容概览
   python -m markitdown template.pptx
   
   # 视觉缩略图预览
   python scripts/thumbnail.py template.pptx
   ```
   > 注：`thumbnail.py` 位于官方 pptx skill 的 scripts 目录中

9. 同时使用自定义 `fill_template.py` 提取结构化风格数据：
   ```bash
   python .claude/skills/paper-to-ppt/scripts/fill_template.py template.pptx \
       --extract-style template_style.json
   python .claude/skills/paper-to-ppt/scripts/fill_template.py template.pptx \
       --analyze-layouts
   ```
10. 综合两种分析结果，确认：
    - 可用布局类型和 placeholder 结构
    - 配色方案和字体设置
    - Slide Master 的背景样式

### Phase 4：内容-页面映射规划

11. 基于论文结构和模板分析，制定幻灯片方案。**参考官方 pptx skill 的设计规范**：

    **配色选择**：从官方 pptx skill 的 10 套配色方案中选择最匹配论文主题的（Midnight Executive 适合 AI/CS，Forest & Moss 适合生物/环境，Ocean Gradient 适合医疗/海洋等）

    **字体选择**：使用官方 pptx skill 的字体配对表，选择与模板兼容的搭配

    **排版规则**：
    - 标题 36-44pt bold，正文 14-16pt
    - 每页 ≤ 7 行正文，左对齐
    - 每页必须有视觉元素（图/表/图标），避免纯文字
    - **绝对不加标题下方的装饰线**（AI 生成 PPT 的标志性特征）
    - 0.5" 最小边距，内容块间距 0.3-0.5"

12. 向用户展示幻灯片方案并确认：
    ```
    建议幻灯片结构（共 N 页）：
    第1页：标题页 — 论文标题、作者、发表信息
    第2页：大纲 — 汇报内容概览
    第3-4页：研究背景与动机
    第5-X页：核心方法（按子模块拆分）
    第X-Y页：实验与结果（嵌入关键图表）
    ... 
    第Z页：贡献与总结
    ```

13. 用户确认后，将方案写入 `slide_plan.json`

### Phase 5：逐页生成

14. 执行填充脚本：
    ```bash
    python .claude/skills/paper-to-ppt/scripts/fill_template.py template.pptx \
        --fill slide_plan.json \
        --paper-outline paper_outline.json \
        --figures-dir ./figures/ \
        --output [论文简称]_汇报.pptx
    ```

15. 脚本处理逻辑：
    - 保留模板 Slide Master（背景、配色、字体）
    - 每页选择最匹配的模板布局 → 填充内容
    - 必要时动态调整局部布局（移动/新增文本框、调整占位符）
    - 嵌入从论文 PDF 提取的图表
    - 添加演讲备注（如有）

### Phase 6：质量验证（采用官方 pptx skill 的 QA 流程）

16. **内容 QA** — 使用官方 pptx skill 的方法：
    ```bash
    # 提取输出 PPT 的文本内容
    python -m markitdown [论文简称]_汇报.pptx
    
    # ⚠️ 检查模板残留文本
    python -m markitdown [论文简称]_汇报.pptx | grep -iE "xxxx|lorem|ipsum|this.*(page|slide).*layout|click.*add|单击|在此"
    ```
    如果 grep 有结果 → 修复后重新验证

17. **视觉 QA** — 参照官方 pptx skill 的 checklist：
    - 元素是否重叠/溢出？
    - 边距是否足够（≥0.5"）？
    - 文字对比度是否足够？
    - 各页是否避免了重复布局？
    - **特别检查：是否有标题下方的装饰线？**（必须移除）
    - 图表是否可读（不过小、不过密）？

18. **问题修复循环**：发现问题 → 修复 → 重新验证，直到通过

### Phase 7：输出交付

19. 最终输出文件：`[论文简称]_汇报.pptx`
20. 提供汇报建议：
    - 预估汇报时长（按每页 1-2 分钟估算）
    - 标注需要重点讲解的页面
    - 提醒可能被提问的关键点

## slide_plan.json 格式

```json
{
  "slides": [
    {
      "page": 1,
      "type": "title",
      "layout_index": 0,
      "content": {
        "title": "论文完整标题",
        "subtitle": "作者 · 发表会议/期刊 · 年份",
        "extra": "汇报人信息（可选）"
      }
    },
    {
      "page": 2,
      "type": "outline",
      "layout_index": 1,
      "content": {
        "title": "汇报大纲",
        "bullets": ["研究背景与动机", "核心方法与创新", "实验设计与结果", "贡献与讨论"]
      }
    },
    {
      "page": 3,
      "type": "content",
      "layout_index": 2,
      "content": {
        "title": "研究背景",
        "bullets": ["关键要点 1", "关键要点 2"],
        "image": "figures/background_diagram.png",
        "notes": "演讲备注：这部分可以用领域共识引入"
      }
    }
  ]
}
```

## 图表处理

- 使用官方 `pdf` skill 的 `pdfplumber` 提取图表引用
- 使用 `analyze_paper.py --extract-figures` 导出图表截图
- 只嵌入支撑核心论点的关键图表（通常 3-6 张）
- 无法提取时标注"(详见论文 Figure X)"

## 10 个协同 Skills 的作用总结

| # | Skill | 在本工作流中的作用 |
|---|-------|-------------------|
| 1 | `pdf` | PDF 论文文本/表格/图片提取 |
| 2 | `xlsx` | 实验数据表格处理 |
| 3 | `docx` | 如果论文是 Word 格式的读取 |
| 4 | `data-analysis` | 实验数据深度分析+可视化 |
| 5 | `frontend-design` | 幻灯片视觉设计灵感 |
| 6 | `webapp-testing` | （非直接使用） |
| 7 | `ffmpeg-usage` | （非直接使用） |
| 8 | `mcp-builder` | （非直接使用） |
| 9 | `feishu-card` | 完成后可选飞书推送汇报通知 |
| 10 | `skill-creator` | 用于持续优化本 Skill |

## 故障排查

| 问题 | 解决方案 |
|------|----------|
| PDF 文本提取不完整 | 切换到官方 pdf skill 的 pypdf 或 OCR 模式 |
| 模板解析失败 | 使用官方 pptx skill 的 `inventory.py` 深入分析 OOXML |
| 中文论文的章节识别失败 | 检查 `analyze_paper.py` 中的中文章节正则模式 |
| 图表提取质量差 | 使用官方 pdf skill 的 `pdfimages` 工具提取 |
| 输出 PPT 格式错乱 | 回退到 OOXML 直接编辑模式（官方 pptx skill 的 unpack/edit/pack） |
