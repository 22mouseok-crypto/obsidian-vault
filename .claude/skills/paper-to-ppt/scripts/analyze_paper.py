#!/usr/bin/env python3
"""
论文深度分析脚本 — 从 PDF 论文提取结构化内容。

用法:
    python analyze_paper.py paper.pdf --output paper_outline.json
    python analyze_paper.py paper.pdf --output paper_outline.json --extract-figures ./figures/

功能:
    1. 提取全文文本（处理双栏排版）
    2. 识别论文结构（Title, Authors, Abstract, Sections...）
    3. 提取关键图表引用和页码
    4. 可选：导出图表区域截图
    5. 输出结构化 JSON
"""

import argparse
import json
import os
import re
import sys
from pathlib import Path
from typing import Any

try:
    import fitz  # PyMuPDF
except ImportError:
    print("Error: PyMuPDF (fitz) is required. Install: pip install PyMuPDF")
    sys.exit(1)


def extract_text_by_blocks(doc: fitz.Document) -> list[dict]:
    """
    提取 PDF 全文，按文本块组织。
    对双栏论文使用智能排序：先按垂直位置分组，再按水平位置排序。
    """
    blocks = []
    for page_num in range(len(doc)):
        page = doc[page_num]
        text_page = page.get_text("dict")

        page_width = text_page["width"]
        page_height = text_page["height"]

        page_blocks = []
        for block in text_page["blocks"]:
            if block["type"] != 0:  # 跳过图片块
                continue
            bbox = block["bbox"]
            text = ""
            for line in block.get("lines", []):
                for span in line.get("spans", []):
                    text += span["text"]
                text += "\n"

            if text.strip():
                page_blocks.append({
                    "bbox": bbox,
                    "text": text.strip(),
                    "x_center": (bbox[0] + bbox[2]) / 2,
                    "y_center": (bbox[1] + bbox[3]) / 2,
                })

        # 双栏检测：如果页面宽度 > 高度 且存在两个明显分离的水平区域
        if page_width > 400:
            mid_x = page_width / 2
            left_blocks = [b for b in page_blocks if b["x_center"] < mid_x]
            right_blocks = [b for b in page_blocks if b["x_center"] >= mid_x]

            # 如果左右两栏都有显著内容 → 双栏
            if len(left_blocks) > 2 and len(right_blocks) > 2:
                left_blocks.sort(key=lambda b: b["y_center"])
                right_blocks.sort(key=lambda b: b["y_center"])
                # 交错合并：先左栏后右栏（按垂直位置 interleave）
                sorted_blocks = _interleave_columns(left_blocks, right_blocks)
            else:
                sorted_blocks = sorted(page_blocks, key=lambda b: b["y_center"])
        else:
            sorted_blocks = sorted(page_blocks, key=lambda b: b["y_center"])

        for b in sorted_blocks:
            blocks.append({
                "page": page_num + 1,
                "text": b["text"],
                "bbox": b["bbox"],
            })

    return blocks


def _interleave_columns(
    left: list[dict], right: list[dict]
) -> list[dict]:
    """将双栏的文本块按垂直位置交错合并。"""
    result = []
    li, ri = 0, 0
    while li < len(left) and ri < len(right):
        if left[li]["y_center"] < right[ri]["y_center"]:
            result.append(left[li])
            li += 1
        else:
            result.append(right[ri])
            ri += 1
    result.extend(left[li:])
    result.extend(right[ri:])
    return result


def identify_structure(blocks: list[dict]) -> dict:
    """
    从文本块中识别论文结构：标题、作者、章节等。
    使用启发式规则匹配学术论文的典型模式。
    """
    full_text = "\n".join(b["text"] for b in blocks)

    # 常见章节标题模式（中英文）
    section_patterns = [
        (r"(?i)^\s*(?:abstract|摘要)\s*$", "abstract"),
        (r"(?i)^\s*(?:\d+\.?\s*)?(?:introduction|引言|绪论)\s*$", "introduction"),
        (r"(?i)^\s*(?:\d+\.?\s*)?(?:related\s*work|相关工作|文献综述)\s*$", "related_work"),
        (r"(?i)^\s*(?:\d+\.?\s*)?(?:background|preliminar|背景|预备知识)\s*$", "background"),
        (r"(?i)^\s*(?:\d+\.?\s*)?(?:method|approach|proposed|方法|提出|方案|模型)\s*$", "methodology"),
        (r"(?i)^\s*(?:\d+\.?\s*)?(?:experiment|evaluation|实验|评估|结果)\s*$", "experiments"),
        (r"(?i)^\s*(?:\d+\.?\s*)?(?:result|finding|结果分析)\s*$", "results"),
        (r"(?i)^\s*(?:\d+\.?\s*)?(?:discussion|讨论|分析)\s*$", "discussion"),
        (r"(?i)^\s*(?:\d+\.?\s*)?(?:conclusion|总结|结论)\s*$", "conclusion"),
        (r"(?i)^\s*(?:\d+\.?\s*)?(?:future\s*work|未来工作|展望)\s*$", "future_work"),
        (r"(?i)^\s*(?:\d+\.?\s*)?(?:acknowledgment|致谢)\s*$", "acknowledgments"),
        (r"(?i)^\s*references?\s*$", "references"),
    ]

    lines = full_text.split("\n")
    sections = []
    current_section = None
    current_lines = []
    line_index = 0

    # 提取标题（假设在论文开头，且字体较大/篇幅较短）
    title_candidates = []
    for i, line in enumerate(lines[:30]):
        line = line.strip()
        if line and len(line) > 20 and len(line) < 200:
            title_candidates.append((i, line))

    title = title_candidates[0][1] if title_candidates else "Unknown Title"
    title_end_line = title_candidates[0][0] + 1 if title_candidates else 5

    # 提取作者（标题后的 1-5 行，通常较短且包含逗号/分号分隔）
    authors = ""
    author_lines = []
    for i in range(title_end_line, min(title_end_line + 10, len(lines))):
        line = lines[i].strip()
        if not line:
            continue
        if len(line) < 150 and (
            "," in line or ";" in line or "and" in line.lower() or "·" in line
        ):
            author_lines.append(line)
        elif author_lines:
            break
    authors = " ".join(author_lines) if author_lines else "Unknown Authors"

    # 提取章节
    section_start_line = title_end_line + len(author_lines) + 2

    for i in range(section_start_line, len(lines)):
        line = lines[i].strip()
        if not line:
            continue

        matched = False
        for pattern, section_type in section_patterns:
            if re.match(pattern, line):
                if current_section and current_lines:
                    sections.append({
                        "heading": current_section,
                        "content": "\n".join(current_lines).strip(),
                    })
                current_section = section_type
                current_lines = []
                matched = True
                break

        # 也检测编号章节（如 "3. Method", "4.1 Overview"）
        if not matched and re.match(r"^\d+(\.\d+)*\s+\w+", line):
            # 可能是一个子章节标题
            current_lines.append(f"[SUBHEADING] {line}")
        elif not matched:
            current_lines.append(line)

    # 保存最后一个章节
    if current_section and current_lines:
        sections.append({
            "heading": current_section,
            "content": "\n".join(current_lines).strip(),
        })

    return {
        "title": title,
        "authors": authors,
        "total_pages": len(set(b["page"] for b in blocks)),
        "sections": sections,
    }


def extract_figures(doc: fitz.Document, output_dir: str) -> list[dict]:
    """从 PDF 中检测并提取图表区域。"""
    os.makedirs(output_dir, exist_ok=True)
    figures = []

    for page_num in range(len(doc)):
        page = doc[page_num]
        # 获取页面上的所有图片
        image_list = page.get_images(full=True)
        for img_idx, img in enumerate(image_list):
            xref = img[0]
            base_image = doc.extract_image(xref)
            image_bytes = base_image["image"]
            image_ext = base_image["ext"]

            # 过滤太小的图标（通常 < 10KB 的是 logo、图标等）
            if len(image_bytes) < 10000:
                continue

            filename = f"fig_p{page_num+1}_{img_idx}.{image_ext}"
            filepath = os.path.join(output_dir, filename)
            with open(filepath, "wb") as f:
                f.write(image_bytes)

            # 尝试找到最近的 caption
            caption = _find_nearest_caption(page, img)

            figures.append({
                "page": page_num + 1,
                "index": img_idx,
                "caption": caption,
                "filename": filename,
                "filepath": filepath,
                "size_kb": len(image_bytes) // 1024,
            })

    return figures


def _find_nearest_caption(page: fitz.Page, img: tuple) -> str:
    """在图片附近搜索 Figure/Table caption。"""
    text = page.get_text()
    # 简单启发式：找包含 Figure/Fig/Table 的行
    patterns = [
        r"(?i)(?:figure|fig\.?)\s*\d+[.:]?\s*(.+?)(?:\n|$)",
        r"(?i)(?:table)\s*\d+[.:]?\s*(.+?)(?:\n|$)",
        r"(?i)图\s*\d+[.:]?\s*(.+?)(?:\n|$)",
        r"(?i)表\s*\d+[.:]?\s*(.+?)(?:\n|$)",
    ]
    for pattern in patterns:
        match = re.search(pattern, text)
        if match:
            return match.group(0).strip()
    return ""


def summarize_sections(structure: dict) -> dict:
    """对每个章节生成简要摘要（关键点提取）。"""
    for section in structure["sections"]:
        content = section["content"]
        # 提取关键句（以大写字母开头、以句号结尾的句子）
        sentences = re.findall(r"[A-Z][^.!?]*[.!?]", content)
        # 提取加粗或特别标记的文本
        key_phrases = re.findall(r"(?:importantly|notably|key|critical)[^.]*\.", content, re.I)

        section["summary"] = " ".join(sentences[:5]) if sentences else content[:500]
        section["key_points"] = [k.strip() for k in key_phrases[:5]]

    return structure


def main():
    parser = argparse.ArgumentParser(description="深度分析学术论文 PDF")
    parser.add_argument("paper", help="论文 PDF 文件路径")
    parser.add_argument("--output", "-o", default="paper_outline.json", help="输出 JSON 文件路径")
    parser.add_argument("--extract-figures", help="图表导出目录（可选）")
    args = parser.parse_args()

    if not os.path.exists(args.paper):
        print(f"Error: File not found: {args.paper}")
        sys.exit(1)

    print(f"📄 读取论文: {args.paper}")
    doc = fitz.open(args.paper)

    # 1. 提取文本块
    print("📝 提取文本（处理双栏排版）...")
    blocks = extract_text_by_blocks(doc)

    # 2. 识别结构
    print("🔍 识别论文结构...")
    structure = identify_structure(blocks)

    # 3. 生成摘要
    print("📊 生成章节摘要...")
    structure = summarize_sections(structure)

    # 4. 提取图表
    figures = []
    if args.extract_figures:
        print(f"🖼️  提取图表到 {args.extract_figures} ...")
        figures = extract_figures(doc, args.extract_figures)

    # 5. 输出
    output = {
        "title": structure["title"],
        "authors": structure["authors"],
        "total_pages": structure["total_pages"],
        "sections": structure["sections"],
        "figures": figures,
        "tables": [f for f in figures if "table" in f.get("caption", "").lower()],
    }

    with open(args.output, "w", encoding="utf-8") as f:
        json.dump(output, f, ensure_ascii=False, indent=2)

    print(f"\n✅ 分析完成！输出: {args.output}")
    print(f"   • 标题: {output['title'][:80]}...")
    print(f"   • 章节数: {len(output['sections'])}")
    print(f"   • 图表数: {len(figures)}")
    print(f"   • 总页数: {output['total_pages']}")


if __name__ == "__main__":
    main()
