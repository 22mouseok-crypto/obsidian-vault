# -*- coding: utf-8 -*-
"""
Generate FHE presentation PPT by MODIFYING (not replacing) the template slides.
Preserves ALL visual elements: logos, sidebar TOC, decorative graphics, etc.
Only replaces text content.
"""
import copy
import os
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN
from lxml import etree

TEMPLATE = r"C:\Users\14090\Documents\我的第一个知识库\抗量子密码\论文汇报\汇报模板.pptx"
OUTPUT   = r"C:\Users\14090\Documents\我的第一个知识库\抗量子密码\论文汇报\FHE_from_LWE_汇报.pptx"

# Copy template to output
import shutil
shutil.copy2(TEMPLATE, OUTPUT)

prs = Presentation(OUTPUT)

def get_all_text_shapes(slide):
    """Return all shapes that have text frames, with their text."""
    result = []
    for shape in slide.shapes:
        if shape.has_text_frame:
            texts = []
            for para in shape.text_frame.paragraphs:
                t = para.text.strip()
                if t:
                    texts.append(t)
            if texts:
                result.append((shape, texts))
    return result

def clear_and_fill(shape, paragraphs):
    """
    Clear a shape's text frame and fill with new paragraphs.
    paragraphs: list of (text, font_size, bold, color, font_name, alignment)
    """
    tf = shape.text_frame
    # Clear existing text
    for para in tf.paragraphs:
        para.clear()
    # Also remove extra paragraphs
    while len(tf.paragraphs) > len(paragraphs):
        p = tf.paragraphs[-1]
        p.getparent().remove(p)

    for i, para_data in enumerate(paragraphs):
        if i == 0:
            p = tf.paragraphs[0]
        else:
            p = tf.add_paragraph()

        text, size, bold, color, font, align = para_data
        run = p.add_run()
        run.text = text
        run.font.size = Pt(size)
        run.font.bold = bold
        if color:
            run.font.color.rgb = color
        if font:
            run.font.name = font
        p.alignment = align if align else PP_ALIGN.LEFT

def find_shape_by_name(slide, name):
    """Find a shape by name on a slide."""
    for shape in slide.shapes:
        if shape.name == name:
            return shape
    return None

def update_textbox_text(slide, shape_name, new_text, size=14, bold=False, color=None, font=None, align=None):
    """Update a textbox's text content."""
    shape = find_shape_by_name(slide, shape_name)
    if shape and shape.has_text_frame:
        for para in shape.text_frame.paragraphs:
            para.clear()
        p = shape.text_frame.paragraphs[0]
        run = p.add_run()
        run.text = new_text
        run.font.size = Pt(size)
        run.font.bold = bold
        if color:
            run.font.color.rgb = color
        if font:
            run.font.name = font
        if align:
            p.alignment = align
        return shape
    return None

def clone_slide(prs, source_slide_idx):
    """Clone a slide and return the new slide."""
    source_slide = prs.slides[source_slide_idx]
    # Get the source slide's layout
    layout = source_slide.slide_layout
    # Add a new slide with the same layout
    new_slide = prs.slides.add_slide(layout)

    # Copy all shapes from source to new
    # Remove default shapes from new slide
    for shape in list(new_slide.shapes):
        sp = shape._element
        sp.getparent().remove(sp)

    # Copy shapes from source
    for shape in source_slide.shapes:
        el = copy.deepcopy(shape._element)
        new_slide.shapes._spTree.append(el)

    # Copy image relationships
    for rel in source_slide.part.rels.values():
        if "image" in rel.reltype or "media" in rel.reltype:
            try:
                new_slide.part.rels.get_or_add(rel.reltype, rel.target_part)
            except:
                pass

    return new_slide

# ================================================================
# SLIDE 1: TITLE SLIDE - Update to FHE paper
# ================================================================
slide = prs.slides[0]
# Update title text
update_textbox_text(slide, "文本框 2",
    "Efficient Fully Homomorphic Encryption\nfrom (Standard) LWE",
    size=28, bold=True, color=RGBColor(0x1B,0x3A,0x5C), font="Calibri", align=PP_ALIGN.CENTER)
# Update subtitle
update_textbox_text(slide, "文本框 4",
    "Zvika Brakerski (Weizmann)  |  Vinod Vaikuntanathan (U. Toronto)\nFOCS 2011  |  抗量子密码组会汇报",
    size=13, bold=False, color=RGBColor(0x33,0x33,0x33), font="Microsoft YaHei", align=PP_ALIGN.CENTER)

# ================================================================
# SLIDE 2: SECTION DIVIDER - "Introduction" -> "Background & Motivation"
# ================================================================
slide = prs.slides[1]
update_textbox_text(slide, "TextBox 4",
    "Background &\nMotivation",
    size=40, bold=True, color=RGBColor(0x1B,0x3A,0x5C), font="Calibri")

# ================================================================
# SLIDE 3: CONTENT - Keep structure, change text
# ================================================================
slide = prs.slides[2]
# Update the title bar (组合 3)
g3 = find_shape_by_name(slide, "组合 3")
if g3 and g3.shape_type == 6:  # GROUP
    # Try to find text in group
    for child in g3.shapes:
        if child.has_text_frame:
            for para in child.text_frame.paragraphs:
                if para.text.strip():
                    para.clear()
                    run = para.add_run()
                    run.text = "什么是全同态加密 (FHE) ?"
                    run.font.size = Pt(28)
                    run.font.bold = True
                    run.font.color.rgb = RGBColor(0x1B,0x3A,0x5C)
                    run.font.name = "Microsoft YaHei"
                    break
            break

# Update sidebar table with section info
t482 = find_shape_by_name(slide, "table 482")
if t482 and t482.has_table:
    tbl = t482.table
    for row_idx in range(tbl.rows.__len__()):
        for col_idx in range(len(tbl.columns)):
            cell = tbl.cell(row_idx, col_idx)
            cell.text = ""

# Update the content group and callout shapes
# Group 54 (main content area)
g54 = find_shape_by_name(slide, "组合 54")
if g54 and g54.shape_type == 6:
    for child in g54.shapes:
        if child.has_text_frame:
            for para in child.text_frame.paragraphs:
                if para.text.strip():
                    para.clear()

# Group 1 (bottom callout)
g1 = find_shape_by_name(slide, "组合 1")
if g1 and g1.shape_type == 6:
    for child in g1.shapes:
        if child.has_text_frame:
            for para in child.text_frame.paragraphs:
                if para.text.strip():
                    para.clear()

# Add new text boxes for content
tb(slide, 2.8, 1.4, 9.5, 0.7, [
    [{"text": "什么是全同态加密 (FHE) ?", "size": 28, "bold": True, "color": DARK_BLUE, "font": TITLE_FONT}]
])

print("Slides 1-3 updated. Continuing with remaining slides...")

# For now, let's just modify the most visible text content
# and keep the visual structure

prs.save(OUTPUT)
print(f"Saved to: {OUTPUT}")
print(f"Total slides: {len(prs.slides)}")
