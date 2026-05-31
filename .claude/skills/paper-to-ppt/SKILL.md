---
name: paper-to-ppt
description: |
  将学术论文深度分析后转换为汇报 PPT。读取论文 PDF 进行全方位理解（结构、方法、
  实验、贡献），然后基于用户指定的 .pptx 模板逐页生成论文汇报演示文稿。保留模板的
  Slide Master 设计风格（背景、配色、字体），局部布局根据论文内容灵活适配。
  触发场景：用户提到"论文汇报"、"组会 PPT"、"答辩 PPT"、"把论文做成 PPT"、
  "paper presentation"、"journal club" 等，且涉及 .pdf 论文和 .pptx 模板文件。
allowed-tools: Read, Write, Edit, Bash, Glob, Grep, AskUserQuestion
---

# Paper-to-PPT：论文 → 汇报 PPT 智能转换

将一篇学术论文（PDF）深度分析后，基于你的 PPT 模板逐页生成高质量汇报演示文稿。

## 核心原则

1. **深度理解先行**：不急于填充幻灯片，先全面理解论文的每个部分
2. **模板风格保留**：继承模板的 Slide Master（背景、配色、字体），局部布局灵活适配
3. **内容驱动布局**：根据每页的实际内容选择合适的布局，不削足适履
4. **学术汇报标准**：遵循学术汇报的叙事逻辑（Why → What → How → Results → Impact）

## 工作流

### Phase 1：论文读取与理解

1. 确认论文文件和模板文件路径（通过 `$ARGUMENTS` 或向用户询问）
2. 使用 Python 脚本提取论文全文：
   ```
   python .claude/skills/paper-to-ppt/scripts/analyze_paper.py [paper.pdf] --output paper_outline.json
   ```
3. 读取输出的 `paper_outline.json`，全面理解论文内容
4. 如 JSON 分析不够深入（某些论文格式特殊），额外使用 Read 工具直接阅读 PDF 原文
5. 确认你对以下内容有清晰的理解：
   - 研究的核心问题/动机是什么？
   - 提出的方法/方案是什么？有何创新？
   - 实验如何设计？关键结果是什么？
   - 论文的主要贡献和局限性

### Phase 2：模板分析

6. 提取模板的设计系统：
   ```
   python .claude/skills/paper-to-ppt/scripts/fill_template.py [template.pptx] --extract-style template_style.json
   ```
7. 分析模板布局：
   ```
   python .claude/skills/paper-to-ppt/scripts/fill_template.py [template.pptx] --analyze-layouts
   ```
8. 阅读 `template_style.json` 和布局分析输出，了解：
   - 有哪些可用的幻灯片布局（标题页、内容页、节标题、空白页等）
   - 配色方案（主题色、强调色）
   - 字体设置（标题字体、正文字体）
   - 每个布局的 placeholder 结构

### Phase 3：内容-页面映射

9. 基于论文结构和模板布局，制定幻灯片方案。向用户展示计划并确认：
   ```
   建议的幻灯片结构：
   第1页：标题页 — 论文标题、作者、发表信息
   第2页：大纲 — 汇报内容概览
   第3页：研究背景与动机 — 为什么做这个研究
   第4页：问题定义 — 要解决什么问题
   第5-7页：方法 — 核心方案（可拆分多页）
   第8-9页：实验与结果 — 关键数据和图表
   第10页：讨论与分析
   第11页：贡献与总结
   第12页：Q&A
   
   每页将使用模板的哪些布局？是否有需要动态调整的？
   ```
10. 如用户无异议，将幻灯片方案写入 `slide_plan.json`

### Phase 4：逐页生成

11. 执行填充脚本：
    ```
    python .claude/skills/paper-to-ppt/scripts/fill_template.py [template.pptx] --fill slide_plan.json --paper-outline paper_outline.json --output [论文简称]_汇报.pptx
    ```
12. 脚本会：
    - 逐页创建/编辑幻灯片
    - 保留模板的 Slide Master 样式
    - 根据内容选择合适的模板布局
    - 填充标题、正文、图表
    - 从论文 PDF 中提取图表并嵌入

### Phase 5：质量验证

13. 检查输出文件：
    - 幻灯片页数是否合理（学术汇报一般 10-20 页）
    - 每页内容是否适量（标题 + ≤7 行要点）
    - 配色/字体是否与模板一致
    - 论文图表是否正确嵌入
14. 如发现问题，直接用 python-pptx 进行微调

## slide_plan.json 格式

向脚本传递幻灯片方案时，使用以下 JSON 格式：

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
        "bullets": [
          "研究背景与动机",
          "核心方法与创新",
          "实验设计与结果",
          "贡献与讨论"
        ]
      }
    },
    {
      "page": 3,
      "type": "content",
      "layout_index": 2,
      "content": {
        "title": "研究背景",
        "bullets": [
          "要点1：...",
          "要点2：..."
        ],
        "notes": "演讲备注（可选）"
      }
    }
  ]
}
```

## 图表处理策略

- **论文中的图表**：脚本会自动从 PDF 中检测图表区域并提取截图
- **优先级**：只在幻灯片中嵌入关键图表（支撑核心论点的），避免每张图都放
- **图表标题**：在幻灯片中用简洁的标注说明图表内容
- **无法提取时**：用文字描述替代，标注 "(详见论文 Figure X)"

## 学术汇报排版规则

参考 `references/slide-design-rules.md`。关键要点：
- 标题简洁（≤15 字），每页 ≤7 行正文
- 使用模板的主题色强调关键数据
- 图表放大到可读尺寸，不要缩太小
- 方法部分用流程图/架构图最好（可口头描述）
- 总结页用 3-5 个 take-away 要点

## 故障排查

- **PDF 无法解析**：尝试用 Read 工具直接阅读，提取关键段落
- **模板无合适布局**：使用空白布局 + 动态创建文本框
- **图表提取失败**：跳过该图表，在幻灯片中标注论文中的图表编号
- **中文论文**：PyMuPDF 对中文 PDF 支持良好，但注意编码问题
