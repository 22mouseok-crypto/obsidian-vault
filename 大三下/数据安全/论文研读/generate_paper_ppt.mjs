import fs from "node:fs/promises";
import path from "node:path";
import os from "node:os";
import { createRequire } from "node:module";
import { pathToFileURL } from "node:url";

const projectRoot = process.cwd();
const finalPptx = path.join(projectRoot, "论文研读", "I_Know_What_You_Said_论文汇报.pptx");
const sourcePdf = path.join(projectRoot, "论文研读", "i know what you said.pdf");
const skillDir = "C:\\Users\\14090\\.codex\\plugins\\cache\\openai-primary-runtime\\presentations\\26.614.11602\\skills\\presentations";
const bundledModules =
  process.env.CODEX_NODE_MODULES ||
  process.env.MODS ||
  "C:\\Users\\14090\\.cache\\codex-runtimes\\codex-primary-runtime\\dependencies\\node\\node_modules";

const requireFromRuntime = createRequire(path.join(bundledModules, "noop.js"));
const artifactToolPath = requireFromRuntime.resolve("@oai/artifact-tool");
const { Presentation, PresentationFile } = await import(pathToFileURL(artifactToolPath).href);

const threadId = process.env.CODEX_THREAD_ID || "manual-paper-ppt";
const workspace = path.join(os.tmpdir(), "codex-presentations", threadId, "i-know-what-you-said");
const tmpDir = path.join(workspace, "tmp");
const previewDir = path.join(tmpDir, "preview");
const layoutDir = path.join(tmpDir, "layout");
const qaDir = path.join(tmpDir, "qa");

const W = 1280;
const H = 720;
const PAGE = { left: 70, top: 62, width: 1140, height: 590 };
const FONT = "Microsoft YaHei";
const HEAD = "Microsoft YaHei UI";

const C = {
  ink: "#13211F",
  ink2: "#213732",
  surface: "#F5F7F4",
  card: "#FFFFFF",
  muted: "#66736D",
  line: "#D6DDD6",
  teal: "#0E7C7B",
  teal2: "#BFE8E1",
  amber: "#F2A541",
  amber2: "#FFE3A8",
  red: "#C44536",
  red2: "#FFD7D2",
  green: "#35B779",
  blue: "#4267AC",
  violet: "#6457A6",
};

function noLine() {
  return { style: "solid", fill: "none", width: 0 };
}

function line(fill = C.line, width = 1) {
  return { style: "solid", fill, width };
}

function addText(slide, text, position, style = {}) {
  const shape = slide.shapes.add({
    geometry: "textbox",
    position,
    fill: "none",
    line: noLine(),
  });
  shape.text = text;
  shape.text.style = {
    typeface: style.typeface || FONT,
    fontSize: style.fontSize ?? 24,
    color: style.color || C.ink,
    bold: style.bold || false,
    italic: style.italic || false,
    alignment: style.alignment || "left",
  };
  return shape;
}

function addBox(slide, position, opts = {}) {
  return slide.shapes.add({
    geometry: opts.geometry || "roundRect",
    position,
    fill: opts.fill || C.card,
    line: opts.line === false ? noLine() : opts.line || line(C.line, 1),
    borderRadius: opts.radius || "rounded-xl",
    shadow: opts.shadow || "shadow-sm",
  });
}

function addPill(slide, text, x, y, w, fill = C.teal2, color = C.ink) {
  const pill = addBox(
    slide,
    { left: x, top: y, width: w, height: 34 },
    { fill, line: line(fill, 1), radius: "rounded-full", shadow: "shadow-none" },
  );
  addText(slide, text, { left: x + 12, top: y + 6, width: w - 24, height: 22 }, {
    fontSize: 14,
    color,
    bold: true,
    alignment: "center",
  });
  return pill;
}

function addFooter(slide, pageNo, dark = false) {
  addText(
    slide,
    "Source: Gao et al., USENIX Security 2025",
    { left: 70, top: 674, width: 560, height: 22 },
    { fontSize: 11, color: dark ? "#BFD1CB" : C.muted },
  );
  addText(
    slide,
    String(pageNo).padStart(2, "0"),
    { left: 1152, top: 670, width: 60, height: 28 },
    { fontSize: 14, color: dark ? "#D8EDE7" : C.muted, bold: true, alignment: "right" },
  );
}

function addHeader(slide, n, title, kicker = "") {
  slide.background.fill = C.surface;
  addText(slide, String(n).padStart(2, "0"), { left: 70, top: 32, width: 48, height: 28 }, {
    fontSize: 13,
    color: C.teal,
    bold: true,
  });
  addText(slide, title, { left: 126, top: 26, width: 760, height: 48 }, {
    typeface: HEAD,
    fontSize: 29,
    color: C.ink,
    bold: true,
  });
  if (kicker) {
    addText(slide, kicker, { left: 900, top: 35, width: 310, height: 28 }, {
      fontSize: 13,
      color: C.muted,
      alignment: "right",
    });
  }
  addFooter(slide, n, false);
}

function addBullets(slide, bullets, position, opts = {}) {
  return addText(
    slide,
    bullets.map((b) => `• ${b}`).join("\n"),
    position,
    {
      fontSize: opts.fontSize || 20,
      color: opts.color || C.ink,
      bold: opts.bold || false,
    },
  );
}

function addBulletRows(slide, bullets, x, y, width, opts = {}) {
  const fontSize = opts.fontSize || 18;
  const gap = opts.gap || 52;
  const dot = opts.dot || C.teal;
  const color = opts.color || C.ink;
  bullets.forEach((text, i) => {
    const top = y + i * gap;
    slide.shapes.add({
      geometry: "ellipse",
      position: { left: x, top: top + 8, width: 7, height: 7 },
      fill: dot,
      line: false,
    });
    addText(slide, text, { left: x + 18, top, width: width - 18, height: gap - 4 }, {
      fontSize,
      color,
      bold: opts.bold || false,
    });
  });
}

function addMetric(slide, label, value, note, x, y, w, fill = C.card, accent = C.teal) {
  addBox(slide, { left: x, top: y, width: w, height: 134 }, { fill, line: line("#D9E2DA", 1) });
  addText(slide, value, { left: x + 22, top: y + 18, width: w - 44, height: 48 }, {
    typeface: HEAD,
    fontSize: 39,
    color: accent,
    bold: true,
  });
  addText(slide, label, { left: x + 22, top: y + 72, width: w - 44, height: 26 }, {
    fontSize: 17,
    color: C.ink,
    bold: true,
  });
  addText(slide, note, { left: x + 22, top: y + 101, width: w - 44, height: 22 }, {
    fontSize: 12,
    color: C.muted,
  });
}

function addNode(slide, text, x, y, w, h, fill = C.card, border = C.teal, style = {}) {
  const node = addBox(slide, { left: x, top: y, width: w, height: h }, {
    fill,
    line: line(border, style.lineWidth || 1.6),
    radius: style.radius || "rounded-xl",
    shadow: style.shadow || "shadow-sm",
  });
  addText(slide, text, { left: x + 14, top: y + 12, width: w - 28, height: h - 20 }, {
    fontSize: style.fontSize || 17,
    color: style.color || C.ink,
    bold: style.bold ?? true,
    alignment: style.alignment || "center",
  });
  return node;
}

function connect(slide, from, to, fromSide = "right", toSide = "left", color = C.teal) {
  return slide.shapes.connect(from, to, {
    kind: "straight",
    fromSide,
    toSide,
    line: line(color, 2.2),
    tail: { type: "arrow", width: "med", length: "med" },
  });
}

function addTinyGrid(slide, dark = false) {
  const stroke = dark ? "#24463E" : "#DDE5DE";
  for (let x = 80; x <= 1200; x += 80) {
    slide.shapes.add({
      geometry: "line",
      position: { left: x, top: 86, width: 0, height: 560 },
      fill: "none",
      line: { style: "solid", fill: stroke, width: 0.5 },
    });
  }
  for (let y = 100; y <= 640; y += 80) {
    slide.shapes.add({
      geometry: "line",
      position: { left: 70, top: y, width: 1140, height: 0 },
      fill: "none",
      line: { style: "solid", fill: stroke, width: 0.5 },
    });
  }
}

function addSparkline(slide, x, y, w, h, color = C.teal) {
  const points = [0.7, 0.62, 0.78, 0.38, 0.47, 0.22, 0.57, 0.3, 0.42, 0.18, 0.34];
  for (let i = 0; i < points.length - 1; i++) {
    const x1 = x + (w / (points.length - 1)) * i;
    const x2 = x + (w / (points.length - 1)) * (i + 1);
    const y1 = y + h * points[i];
    const y2 = y + h * points[i + 1];
    slide.shapes.add({
      geometry: "line",
      position: { left: x1, top: y1, width: x2 - x1, height: y2 - y1 },
      fill: "none",
      line: line(color, 3),
    });
  }
}

function addNotes(slide, lines) {
  slide.speakerNotes.textFrame.setText(lines);
  slide.speakerNotes.setVisible(true);
}

async function writeBlob(filePath, blob) {
  await fs.writeFile(filePath, new Uint8Array(await blob.arrayBuffer()));
}

async function ensureDirs() {
  for (const dir of [workspace, tmpDir, previewDir, layoutDir, qaDir]) {
    await fs.mkdir(dir, { recursive: true });
  }
}

function slide1(p) {
  const slide = p.slides.add();
  slide.background.fill = C.ink;
  addTinyGrid(slide, true);
  addPill(slide, "USENIX Security 2025", 72, 64, 230, C.amber2, C.ink);
  addText(slide, "论文汇报", { left: 1030, top: 70, width: 180, height: 28 }, {
    fontSize: 18,
    color: "#D8EDE7",
    bold: true,
    alignment: "right",
  });
  addText(slide, "I Know What You Said", { left: 72, top: 148, width: 650, height: 64 }, {
    typeface: HEAD,
    fontSize: 48,
    color: "#FFFFFF",
    bold: true,
  });
  addText(
    slide,
    "Unveiling Hardware Cache Side-Channels\nin Local Large Language Model Inference",
    { left: 76, top: 224, width: 720, height: 86 },
    { fontSize: 25, color: "#C9E1DA", bold: true },
  );
  addText(
    slide,
    "主题: 本地大模型推理中的硬件缓存侧信道泄露\n作者: Zibo Gao 等\n单位: 中国科学院信息工程研究所 / 中国科学院大学网络空间安全学院",
    { left: 78, top: 356, width: 640, height: 110 },
    { fontSize: 18, color: "#EAF5F1" },
  );
  const a = addNode(slide, "Local LLM\nInference", 792, 154, 156, 96, "#203A35", C.teal2, { color: "#FFFFFF" });
  const b = addNode(slide, "Cache\nTrace", 982, 264, 132, 82, "#203A35", C.amber, { color: "#FFFFFF" });
  const c = addNode(slide, "Text\nLeakage", 804, 392, 150, 90, "#203A35", C.red2, { color: "#FFFFFF" });
  connect(slide, a, b, "right", "left", C.amber);
  connect(slide, b, c, "bottom", "right", C.red2);
  connect(slide, c, a, "top", "bottom", C.teal2);
  addText(slide, "从“私有本地运行”到“共享硬件可观测”", { left: 790, top: 528, width: 338, height: 48 }, {
    fontSize: 20,
    color: "#D8EDE7",
    bold: true,
    alignment: "center",
  });
  addFooter(slide, 1, true);
  addNotes(slide, [
    "开场强调: 这篇论文挑战了“本地部署就一定隐私安全”的直觉。",
    "攻击者不需要调用受害者模型，而是旁路观察共享缓存行为。",
  ]);
}

function slide2(p) {
  const slide = p.slides.add();
  addHeader(slide, 2, "问题背景: Local LLM 隐私假设被重新打开", "Background");
  addBox(slide, { left: 80, top: 116, width: 520, height: 456 }, { fill: "#FFFFFF" });
  addText(slide, "为什么用户转向本地 LLM?", { left: 112, top: 150, width: 420, height: 34 }, {
    fontSize: 24,
    bold: true,
  });
  addBulletRows(slide, [
    "云端 LLM 会带来敏感文本上传风险",
    "本地推理常用于邮件、财务、私人咨询等场景",
    "论文关注的不是模型 API，而是推理过程的硬件痕迹",
  ], 122, 218, 400, { fontSize: 19, gap: 58, dot: C.teal });
  addMetric(slide, "隐私承诺", "Local", "数据不离开设备", 116, 394, 190, "#F8FBF9", C.teal);
  addMetric(slide, "攻击视角", "Cache", "共享硬件留下侧信道", 326, 394, 190, "#FFF9EC", C.amber);

  addBox(slide, { left: 654, top: 116, width: 486, height: 456 }, { fill: "#EDF6F2", line: line("#CAE0D7", 1) });
  const cloud = addNode(slide, "Cloud LLM\n第三方服务", 704, 170, 145, 82, C.card, C.blue);
  const local = addNode(slide, "Local LLM\n本地设备", 936, 170, 145, 82, C.card, C.teal);
  const user = addNode(slide, "Sensitive\nPrompt", 820, 344, 145, 82, C.card, C.red);
  connect(slide, user, cloud, "left", "bottom", C.blue);
  connect(slide, user, local, "right", "bottom", C.teal);
  addText(slide, "论文问题: 当模型和攻击者共享 CPU cache 时，本地推理的输入/输出还能否保持私密?", {
    left: 712,
    top: 470,
    width: 370,
    height: 70,
  }, { fontSize: 21, bold: true, color: C.ink });
  addNotes(slide, [
    "先讲本地 LLM 的动机，再引出论文的新威胁面。",
    "这里不讨论网络窃听，而是硬件 cache 侧信道。",
  ]);
}

function slide3(p) {
  const slide = p.slides.add();
  addHeader(slide, 3, "核心发现: token value + token position 足以泄露文本", "Main Insight");
  addBox(slide, { left: 82, top: 118, width: 520, height: 380 }, { fill: "#FFFFFF" });
  addPill(slide, "Leakage 1", 118, 150, 120, C.red2, C.red);
  addText(slide, "Token Value Leakage", { left: 118, top: 202, width: 390, height: 42 }, {
    typeface: HEAD,
    fontSize: 30,
    color: C.red,
    bold: true,
  });
  addBulletRows(slide, [
    "embedding matrix 的行访问取决于 token id",
    "攻击者从 cache access pattern 推断出现过哪些 token",
    "输入 token 与生成 token 都会经过 embedding",
  ], 126, 278, 390, { fontSize: 17, gap: 44, dot: C.red });
  for (let i = 0; i < 8; i++) {
    addBox(slide, { left: 126 + i * 48, top: 420, width: 38, height: 28 }, {
      fill: i % 3 === 0 ? C.red2 : "#EEF2EF",
      line: line(i % 3 === 0 ? C.red : "#DCE5DD", 1),
      radius: "rounded-md",
      shadow: "shadow-none",
    });
  }

  addBox(slide, { left: 678, top: 118, width: 520, height: 380 }, { fill: "#FFFFFF" });
  addPill(slide, "Leakage 2", 714, 150, 120, C.amber2, "#805200");
  addText(slide, "Token Position Leakage", { left: 714, top: 202, width: 410, height: 42 }, {
    typeface: HEAD,
    fontSize: 30,
    color: "#9A6500",
    bold: true,
  });
  addBulletRows(slide, [
    "autoregressive decode 是逐 token 顺序生成",
    "embedding 操作的时间间隔暴露输出位置",
    "位置 + token 值让输出文本可被重构",
  ], 722, 278, 390, { fontSize: 17, gap: 44, dot: C.amber });
  addSparkline(slide, 728, 420, 360, 52, C.amber);

  addBox(slide, { left: 298, top: 532, width: 684, height: 72 }, {
    fill: C.ink,
    line: false,
    radius: "rounded-xl",
  });
  addText(slide, "Value + Position -> Text Reconstruction", {
    left: 326,
    top: 552,
    width: 628,
    height: 38,
  }, { fontSize: 23, color: "#FFFFFF", bold: true, alignment: "center" });
  addNotes(slide, [
    "用两个泄露维度组织后续讲解。",
    "Value 是“有哪些 token”，Position 是“输出 token 的顺序”。",
  ]);
}

function slide4(p) {
  const slide = p.slides.add();
  addHeader(slide, 4, "威胁模型: 被动共驻、共享 cache、无需模型交互", "Threat Model");
  const victim = addNode(slide, "Victim\nLocal LLM", 110, 210, 180, 110, "#ECF7F4", C.teal, { fontSize: 21 });
  const cache = addNode(slide, "Shared\nHardware Cache", 520, 182, 230, 164, C.ink, C.teal2, {
    color: "#FFFFFF",
    fontSize: 24,
  });
  const spy = addNode(slide, "Spy App\nCache Probe", 970, 210, 180, 110, "#FFF4D8", C.amber, { fontSize: 21 });
  connect(slide, victim, cache, "right", "left", C.teal);
  connect(slide, spy, cache, "left", "right", C.amber);
  addText(slide, "被动观察 cache timing", { left: 790, top: 162, width: 190, height: 28 }, {
    fontSize: 17,
    color: "#8A5A00",
    bold: true,
  });
  addText(slide, "模型推理触发 embedding 访问", { left: 300, top: 162, width: 220, height: 28 }, {
    fontSize: 17,
    color: C.teal,
    bold: true,
  });
  const cards = [
    ["No direct interaction", "攻击不需要向受害者 LLM 发送请求"],
    ["No privilege", "论文强调攻击可在无特权条件下执行"],
    ["Co-located", "攻击程序与推理进程共享机器和缓存"],
  ];
  cards.forEach(([h, body], i) => {
    const x = 170 + i * 315;
    addBox(slide, { left: x, top: 414, width: 260, height: 136 }, { fill: "#FFFFFF" });
    addText(slide, h, { left: x + 20, top: 438, width: 220, height: 48 }, {
      fontSize: 19,
      bold: true,
      color: i === 1 ? C.red : C.ink,
    });
    addText(slide, body, { left: x + 20, top: 492, width: 220, height: 46 }, {
      fontSize: 16,
      color: C.muted,
    });
  });
  addNotes(slide, [
    "这页要讲清楚攻击能力边界: 不是远程调用模型，也不是读取进程内存。",
    "关键词: passive, co-located, shared hardware cache, without privilege。",
  ]);
}

function slide5(p) {
  const slide = p.slides.add();
  addHeader(slide, 5, "漏洞根因: embedding 行访问与自回归时序", "Root Cause");
  addBox(slide, { left: 84, top: 118, width: 500, height: 438 }, { fill: "#FFFFFF" });
  addText(slide, "1. Embedding matrix 暴露 token id", { left: 118, top: 150, width: 420, height: 34 }, {
    fontSize: 24,
    bold: true,
  });
  for (let i = 0; i < 9; i++) {
    const y = 210 + i * 27;
    const hot = [1, 4, 7].includes(i);
    addBox(slide, { left: 128, top: y, width: 280, height: 18 }, {
      fill: hot ? C.red2 : "#EEF3EF",
      line: line(hot ? C.red : "#DDE7DE", 1),
      radius: "rounded-sm",
      shadow: "shadow-none",
    });
    addText(slide, `row ${String(i).padStart(2, "0")}`, { left: 424, top: y - 2, width: 78, height: 20 }, {
      fontSize: 12,
      color: hot ? C.red : C.muted,
      bold: hot,
    });
  }
  addText(slide, "token → row access → cache hit", { left: 126, top: 476, width: 340, height: 28 }, {
    fontSize: 20,
    bold: true,
    color: C.red,
  });

  addBox(slide, { left: 696, top: 118, width: 500, height: 438 }, { fill: "#FFFFFF" });
  addText(slide, "2. Autoregressive decode 暴露位置", { left: 730, top: 150, width: 420, height: 34 }, {
    fontSize: 24,
    bold: true,
  });
  const t1 = addNode(slide, "t1", 760, 244, 74, 52, "#ECF7F4", C.teal, { fontSize: 20 });
  const t2 = addNode(slide, "t2", 882, 244, 74, 52, "#ECF7F4", C.teal, { fontSize: 20 });
  const t3 = addNode(slide, "t3", 1004, 244, 74, 52, "#ECF7F4", C.teal, { fontSize: 20 });
  connect(slide, t1, t2, "right", "left", C.teal);
  connect(slide, t2, t3, "right", "left", C.teal);
  addSparkline(slide, 766, 366, 320, 62, C.teal);
  addText(slide, "decode phase 的周期性时间点对应 token 位置", {
    left: 758,
    top: 474,
    width: 352,
    height: 46,
  }, { fontSize: 20, bold: true, color: C.teal });
  addNotes(slide, [
    "这里把论文的两类根因视觉化: embedding 行访问和 decode 时序。",
    "输入的 token 顺序会在 prefill 中被打乱，因此输入重构更难。",
  ]);
}

function slide6(p) {
  const slide = p.slides.add();
  addHeader(slide, 6, "攻击流程总览: cache trace 到文本重构", "Attack Workflow");
  const xs = [86, 302, 518, 734, 950];
  const labels = [
    ["1", "Probe\nmodel file", "定位 embedding 行地址"],
    ["2", "Collect\ncache trace", "记录 timing 与 hit pattern"],
    ["3", "Split\nphases", "识别 prefill / decode"],
    ["4", "Map\ntokens", "得到 KD、KP、TD"],
    ["5", "Recover\ntext", "LLMA 输出 / LLMB 输入"],
  ];
  const nodes = labels.map(([num, title, body], i) => {
    addPill(slide, num, xs[i] + 18, 170, 44, i < 2 ? C.teal2 : i < 4 ? C.amber2 : C.red2, C.ink);
    const node = addNode(slide, title, xs[i], 220, 162, 112, i < 2 ? "#ECF7F4" : i < 4 ? "#FFF8E7" : "#FFF1EE", i < 2 ? C.teal : i < 4 ? C.amber : C.red, {
      fontSize: 19,
    });
    addText(slide, body, { left: xs[i] - 6, top: 354, width: 174, height: 50 }, {
      fontSize: 15,
      color: C.muted,
      alignment: "center",
    });
    return node;
  });
  for (let i = 0; i < nodes.length - 1; i++) {
    connect(slide, nodes[i], nodes[i + 1], "right", "left", i < 2 ? C.teal : i === 2 ? C.amber : C.red);
  }
  addBox(slide, { left: 162, top: 468, width: 956, height: 78 }, { fill: C.ink, line: false });
  addText(slide, "关键思想: 侧信道只给出噪声很大的 token/timing 线索，再用重构模型补全语义", {
    left: 200,
    top: 490,
    width: 880,
    height: 34,
  }, { fontSize: 23, color: "#FFFFFF", bold: true, alignment: "center" });
  addNotes(slide, [
    "这一页是后续技术细节的地图。",
    "KD 表示 decode token list，KP 表示 prefill 中无序的 input token list，TD 表示 timing signal。",
  ]);
}

function slide7(p) {
  const slide = p.slides.add();
  addHeader(slide, 7, "关键技术 1: 缓存时序测量与 phase 识别", "Cache Timing");
  addBox(slide, { left: 92, top: 132, width: 750, height: 390 }, { fill: "#FFFFFF" });
  addText(slide, "Cache trace 示意", { left: 126, top: 160, width: 250, height: 28 }, {
    fontSize: 22,
    bold: true,
  });
  const chartX = 128;
  const chartY = 214;
  const chartW = 650;
  const chartH = 220;
  for (let i = 0; i <= 5; i++) {
    slide.shapes.add({
      geometry: "line",
      position: { left: chartX, top: chartY + (chartH / 5) * i, width: chartW, height: 0 },
      fill: "none",
      line: line("#E6ECE7", 1),
    });
  }
  for (let i = 0; i < 28; i++) {
    const dense = i < 9;
    const h = dense ? 30 + (i % 5) * 24 : i % 4 === 0 ? 120 : 30 + (i % 3) * 18;
    const x = chartX + 16 + i * 22;
    addBox(slide, { left: x, top: chartY + chartH - h, width: 10, height: h }, {
      fill: dense ? C.red : C.teal,
      line: false,
      radius: "rounded-sm",
      shadow: "shadow-none",
    });
  }
  addPill(slide, "Prefill: dense burst", 160, 458, 180, C.red2, C.red);
  addPill(slide, "Decode: sparse periodic", 480, 458, 210, C.teal2, C.teal);
  addBox(slide, { left: 888, top: 132, width: 300, height: 390 }, { fill: "#EDF6F2", line: line("#CFE2D8", 1) });
  addText(slide, "识别目标", { left: 920, top: 166, width: 220, height: 28 }, { fontSize: 24, bold: true });
  addBulletRows(slide, [
    "prefill: 输入 token 批量进入 embedding",
    "decode: 输出 token 顺序进入 embedding",
    "PSD/周期线索帮助分离阶段",
  ], 924, 226, 212, { fontSize: 17, gap: 58, dot: C.teal });
  addText(slide, "输出位置主要来自 decode 的时间规律", {
    left: 926,
    top: 404,
    width: 210,
    height: 62,
  }, { fontSize: 21, color: C.teal, bold: true, alignment: "center" });
  addNotes(slide, [
    "说明 cache trace 不是直接文本，而是带噪声的 timing 和 hit 矩阵。",
    "Prefill 与 decode 的密度差异，是把输入/输出线索分开的关键。",
  ]);
}

function slide8(p) {
  const slide = p.slides.add();
  addHeader(slide, 8, "关键技术 2: 输出重构把 token 线索变成句子", "Output Reconstruction");
  const left = addBox(slide, { left: 92, top: 136, width: 280, height: 340 }, { fill: "#FFFFFF" });
  addText(slide, "Cache hits", { left: 126, top: 166, width: 200, height: 30 }, { fontSize: 23, bold: true });
  for (let r = 0; r < 7; r++) {
    for (let c = 0; c < 6; c++) {
      const hot = (r + c * 2) % 7 === 0 || (r === 4 && c === 3);
      addBox(slide, { left: 128 + c * 32, top: 220 + r * 28, width: 22, height: 18 }, {
        fill: hot ? C.teal : "#E8EFE9",
        line: false,
        radius: "rounded-sm",
        shadow: "shadow-none",
      });
    }
  }
  const mid = addBox(slide, { left: 500, top: 136, width: 280, height: 340 }, { fill: "#FFF8E7", line: line("#F4D89A", 1) });
  addText(slide, "KD + TD", { left: 534, top: 166, width: 210, height: 30 }, { fontSize: 25, bold: true, color: "#8A5A00" });
  ["token list", "timing signal", "noise filtering"].forEach((t, i) => {
    addPill(slide, t, 548, 226 + i * 58, 180, i === 0 ? C.teal2 : i === 1 ? C.amber2 : C.red2, C.ink);
  });
  const right = addBox(slide, { left: 908, top: 136, width: 280, height: 340 }, { fill: "#FFFFFF" });
  addText(slide, "LLMA", { left: 944, top: 166, width: 210, height: 34 }, { fontSize: 29, bold: true, color: C.red });
  addText(slide, "根据 token 列表和时间信号，预测缺失 token、移除噪声并恢复输出文本。", {
    left: 944,
    top: 232,
    width: 200,
    height: 116,
  }, { fontSize: 20, color: C.ink });
  addText(slide, "Output = LLMA(TD, KD)", { left: 926, top: 386, width: 238, height: 34 }, {
    fontSize: 23,
    color: C.red,
    bold: true,
    alignment: "center",
  });
  connect(slide, left, mid, "right", "left", C.teal);
  connect(slide, mid, right, "right", "left", C.amber);
  addBox(slide, { left: 202, top: 532, width: 876, height: 58 }, { fill: C.ink, line: false });
  addText(slide, "输出更容易恢复: decode 顺序天然提供 token position", {
    left: 232,
    top: 548,
    width: 816,
    height: 28,
  }, { fontSize: 22, color: "#FFFFFF", bold: true, alignment: "center" });
  addNotes(slide, [
    "LLMA 是论文中用于恢复输出的模型。",
    "输出重构比输入重构简单，因为 decode 是串行过程。",
  ]);
}

function slide9(p) {
  const slide = p.slides.add();
  addHeader(slide, 9, "关键技术 3: 输入重构需要处理无序 token", "Input Reconstruction");
  addBox(slide, { left: 88, top: 128, width: 430, height: 396 }, { fill: "#FFFFFF" });
  addText(slide, "Prefill token bag", { left: 122, top: 160, width: 300, height: 30 }, { fontSize: 24, bold: true });
  const tokens = ["freddy", "rank", "air", "force", "2010", "where", "president", "e5", "nightmare", "ffa"];
  tokens.forEach((t, i) => {
    addPill(
      slide,
      t,
      124 + (i % 2) * 176,
      226 + Math.floor(i / 2) * 48,
      148,
      i % 3 === 0 ? C.red2 : i % 3 === 1 ? C.teal2 : C.amber2,
      C.ink,
    );
  });
  addText(slide, "顺序被打乱，单靠 KP 只能得到语义碎片。", {
    left: 122,
    top: 470,
    width: 330,
    height: 34,
  }, { fontSize: 18, color: C.muted });

  const out = addNode(slide, "Recovered\noutput", 598, 188, 180, 88, "#ECF7F4", C.teal, { fontSize: 21 });
  const bag = addNode(slide, "Unordered input\nKP", 598, 334, 180, 88, "#FFF8E7", C.amber, { fontSize: 21 });
  const model = addNode(slide, "LLMB", 884, 258, 150, 104, C.ink, C.teal2, { color: "#FFFFFF", fontSize: 28 });
  connect(slide, out, model, "right", "left", C.teal);
  connect(slide, bag, model, "right", "left", C.amber);
  const result = addNode(slide, "输入语义", 1054, 268, 128, 92, "#FFF1EE", C.red, { fontSize: 20 });
  connect(slide, model, result, "right", "left", C.red);
  addBox(slide, { left: 592, top: 470, width: 560, height: 58 }, { fill: "#FFFFFF", line: line("#DDE6DE", 1) });
  addText(slide, "论文用恢复出的输出上下文辅助输入恢复，改善只看 bag-of-words 的语义缺失。", {
    left: 620,
    top: 486,
    width: 504,
    height: 28,
  }, { fontSize: 18, bold: true, color: C.ink, alignment: "center" });
  addNotes(slide, [
    "输入重构的困难在于 prefill 并行，token 顺序缺失。",
    "LLMB 融合无序 token 与恢复出的输出，重建输入语义。",
  ]);
}

function slide10(p) {
  const slide = p.slides.add();
  addHeader(slide, 10, "实验设置: 多模型、多框架、多指标验证", "Experiment Setup");
  const items = [
    ["Victim LLMs", "Llama / Falcon / Gemma / Phi\n覆盖开源与实际部署模型", C.teal2, C.teal],
    ["Frameworks", "HuggingFace / IPEX-LLM\nllama.cpp / Ollama / GPT4All", C.amber2, "#8A5A00"],
    ["Datasets", "NQ-Open / SIQA / SQuAD2\nChatGPT-Roles 等公开数据", C.red2, C.red],
    ["Metrics", "ROUGE / Levenshtein\nCosine Similarity / ASR", "#E7E3FF", C.violet],
  ];
  items.forEach(([h, body, fill, accent], i) => {
    const x = i % 2 === 0 ? 104 : 668;
    const y = i < 2 ? 132 : 374;
    addBox(slide, { left: x, top: y, width: 508, height: 176 }, { fill: "#FFFFFF" });
    addPill(slide, h, x + 28, y + 28, 170, fill, accent);
    addText(slide, body, { left: x + 32, top: y + 84, width: 400, height: 62 }, {
      fontSize: 22,
      color: C.ink,
      bold: true,
    });
  });
  addBox(slide, { left: 286, top: 588, width: 708, height: 42 }, { fill: C.ink, line: false, radius: "rounded-full" });
  addText(slide, "核心评估问题: 攻击能否在实际本地推理系统中恢复文本内容和语义?", {
    left: 312,
    top: 599,
    width: 656,
    height: 22,
  }, { fontSize: 17, color: "#FFFFFF", bold: true, alignment: "center" });
  addNotes(slide, [
    "强调论文不是只在玩具模型上验证。",
    "评价既看字符/词级准确度，也看语义泄露。",
  ]);
}

function slide11(p) {
  const slide = p.slides.add();
  addHeader(slide, 11, "主要结果: 输出几乎可读，输入语义高度泄露", "Key Results");
  addMetric(slide, "输出平均 edit distance", "5.2%", "越低越接近原文", 92, 132, 248, "#FFFFFF", C.red);
  addMetric(slide, "输入平均 edit distance", "17.3%", "输入更难但仍可恢复", 370, 132, 248, "#FFFFFF", C.red);
  addMetric(slide, "输入 cosine similarity", "98.7%", "语义层面高度相似", 648, 132, 248, "#FFFFFF", C.teal);
  addMetric(slide, "输出 cosine similarity", "98.0%", "语义泄露明显", 926, 132, 248, "#FFFFFF", C.teal);
  addBox(slide, { left: 110, top: 328, width: 490, height: 230 }, { fill: "#FFFFFF" });
  slide.charts.add("bar", {
    position: { left: 140, top: 360, width: 430, height: 150 },
    categories: ["Output", "Input"],
    series: [{ name: "Edit distance", values: [5.2, 17.3], fill: C.red }],
    barOptions: { direction: "column", grouping: "clustered", gapWidth: 80 },
    hasLegend: false,
    yAxis: { min: 0, max: 20, majorUnit: 5, numberFormatCode: '0"%"', majorGridlines: line("#E7ECE7", 1) },
    dataLabels: { showValue: true, position: "outEnd", textStyle: { fill: C.ink, fontSize: 13, bold: true } },
  });
  addText(slide, "Edit distance to ground truth", { left: 164, top: 514, width: 390, height: 24 }, {
    fontSize: 16,
    color: C.muted,
    alignment: "center",
  });
  addBox(slide, { left: 682, top: 328, width: 490, height: 230 }, { fill: "#FFFFFF" });
  slide.charts.add("bar", {
    position: { left: 710, top: 360, width: 430, height: 150 },
    categories: ["Input", "Output"],
    series: [{ name: "Cosine similarity", values: [98.7, 98.0], fill: C.teal }],
    barOptions: { direction: "column", grouping: "clustered", gapWidth: 80 },
    hasLegend: false,
    yAxis: { min: 90, max: 100, majorUnit: 2, numberFormatCode: '0"%"', majorGridlines: line("#E7ECE7", 1) },
    dataLabels: { showValue: true, position: "outEnd", textStyle: { fill: C.ink, fontSize: 13, bold: true } },
  });
  addText(slide, "Semantic similarity", { left: 736, top: 514, width: 380, height: 24 }, {
    fontSize: 16,
    color: C.muted,
    alignment: "center",
  });
  addNotes(slide, [
    "这里的四个数字来自论文 abstract。",
    "解释 edit distance 与 cosine similarity 的差别: 前者看字面，后者看语义。",
  ]);
}

function slide12(p) {
  const slide = p.slides.add();
  addHeader(slide, 12, "消融与参数分析: SCA 线索是输入恢复关键", "Ablation / Parameters");
  addBox(slide, { left: 90, top: 126, width: 610, height: 410 }, { fill: "#FFFFFF" });
  addText(slide, "输入恢复消融: 加入 SCA 数据显著改善", { left: 128, top: 158, width: 480, height: 30 }, {
    fontSize: 23,
    bold: true,
  });
  slide.charts.add("bar", {
    position: { left: 124, top: 218, width: 520, height: 230 },
    categories: ["R1", "LS", "Cos", "ASR"],
    series: [
      { name: "LLMB (SCA + Output)", values: [82.8, 76.2, 96.9, 99.7], fill: C.teal },
      { name: "LLMB (Output only)", values: [54.8, 55.2, 91.5, 95.8], fill: C.amber },
    ],
    barOptions: { direction: "column", grouping: "clustered", gapWidth: 64 },
    legend: { position: "bottom", overlay: false, textStyle: { fill: C.muted, fontSize: 12 } },
    yAxis: { min: 45, max: 100, majorUnit: 10, numberFormatCode: '0"%"', majorGridlines: line("#E7ECE7", 1) },
    dataLabels: { showValue: false },
  });
  addText(slide, "来源: Table 2, ablation study on SCA data", {
    left: 166,
    top: 474,
    width: 430,
    height: 22,
  }, { fontSize: 12, color: C.muted, alignment: "center" });

  addBox(slide, { left: 744, top: 126, width: 446, height: 410 }, { fill: "#EDF6F2", line: line("#CFE2D8", 1) });
  addText(slide, "论文给出的稳定性结论", { left: 778, top: 158, width: 330, height: 30 }, {
    fontSize: 23,
    bold: true,
  });
  addBulletRows(slide, [
    "噪声参数 p 在 10%-40% 范围内仍保持较高性能",
    "prefill batch size 增大后指标趋于稳定，整体波动约 4%",
    "Ollama、llama.cpp、GPT4All、LocalAI 等框架均受影响",
    "硬件与量化设置会改变难度，但不消除根因",
  ], 790, 222, 342, { fontSize: 16, gap: 52, dot: C.teal });
  addPill(slide, "Takeaway", 788, 458, 116, C.ink, "#FFFFFF");
  addText(slide, "侧信道观测提供了恢复输入语义的额外证据。", {
    left: 920,
    top: 462,
    width: 220,
    height: 34,
  }, { fontSize: 17, color: C.ink, bold: true });
  addNotes(slide, [
    "用 Table 2 的数值讲清楚: 只看输出上下文不够，SCA 数据对输入恢复很重要。",
    "参数页不要陷入细节，给出稳定性结论即可。",
  ]);
}

function slide13(p) {
  const slide = p.slides.add();
  addHeader(slide, 13, "讨论与防御: 工程隔离比模型层补丁更直接", "Discussion");
  const cards = [
    ["Hardware isolation", "使用 Intel CAT 等 cache partitioning，减少共享 cache 干扰。", C.teal2, C.teal],
    ["Runtime hardening", "避免或改造 zero-copy/mmap 加载路径，降低 embedding 行访问可观测性。", C.amber2, "#8A5A00"],
    ["Noise / scheduling", "引入调度隔离、访问随机化或节流，提升测量难度。", C.red2, C.red],
    ["Limitations", "GPU-side embedding、输入并行 prefill、地址映射学习仍是开放问题。", "#E7E3FF", C.violet],
  ];
  cards.forEach(([h, body, fill, accent], i) => {
    const x = i % 2 === 0 ? 110 : 666;
    const y = i < 2 ? 132 : 366;
    addBox(slide, { left: x, top: y, width: 500, height: 168 }, { fill: "#FFFFFF" });
    addPill(slide, h, x + 28, y + 26, 190, fill, accent);
    addText(slide, body, { left: x + 32, top: y + 88, width: 420, height: 58 }, {
      fontSize: 19,
      color: C.ink,
      bold: true,
    });
  });
  addBox(slide, { left: 236, top: 584, width: 808, height: 42 }, { fill: C.ink, line: false, radius: "rounded-full" });
  addText(slide, "伦理边界: 作者使用公开数据集，并报告相关问题给软件开发者", {
    left: 270,
    top: 595,
    width: 740,
    height: 22,
  }, { fontSize: 17, color: "#FFFFFF", bold: true, alignment: "center" });
  addNotes(slide, [
    "防御部分要强调系统层隔离和运行时实现，而不是只换模型。",
    "最后补充论文的伦理披露。",
  ]);
}

function slide14(p) {
  const slide = p.slides.add();
  slide.background.fill = C.ink;
  addTinyGrid(slide, true);
  addText(slide, "总结: Local LLM 不等于自动隐私安全", {
    left: 84,
    top: 70,
    width: 900,
    height: 58,
  }, { typeface: HEAD, fontSize: 38, color: "#FFFFFF", bold: true });
  const cards = [
    ["1", "新的泄露面", "token embedding 的 cache 访问暴露 token value。"],
    ["2", "新的重构链路", "decode 时序补充 token position，模型帮助去噪和补全。"],
    ["3", "新的防御重点", "本地 AI 需要硬件隔离、运行时加固和侧信道意识。"],
  ];
  cards.forEach(([n, h, body], i) => {
    const x = 108 + i * 364;
    addBox(slide, { left: x, top: 190, width: 300, height: 244 }, {
      fill: "#203A35",
      line: line(i === 0 ? C.red2 : i === 1 ? C.amber2 : C.teal2, 1.6),
      radius: "rounded-xl",
    });
    addText(slide, n, { left: x + 28, top: 226, width: 64, height: 50 }, {
      typeface: HEAD,
      fontSize: 44,
      color: i === 0 ? C.red2 : i === 1 ? C.amber2 : C.teal2,
      bold: true,
    });
    addText(slide, h, { left: x + 28, top: 300, width: 230, height: 34 }, {
      fontSize: 24,
      color: "#FFFFFF",
      bold: true,
    });
    addText(slide, body, { left: x + 28, top: 348, width: 238, height: 78 }, {
      fontSize: 16,
      color: "#D8EDE7",
    });
  });
  addBox(slide, { left: 250, top: 508, width: 780, height: 86 }, { fill: "#F5F7F4", line: false });
  addText(slide, "课堂提问方向: 如果你要部署本地大模型，应该在哪一层做隔离?", {
    left: 286,
    top: 532,
    width: 708,
    height: 42,
  }, { fontSize: 21, color: C.ink, bold: true, alignment: "center" });
  addFooter(slide, 14, true);
  addNotes(slide, [
    "收束到三个 takeaway。",
    "把最后的问题抛给课堂讨论: model, runtime, OS, hardware 哪一层最有效。",
  ]);
}

const slideBuilders = [
  slide1,
  slide2,
  slide3,
  slide4,
  slide5,
  slide6,
  slide7,
  slide8,
  slide9,
  slide10,
  slide11,
  slide12,
  slide13,
  slide14,
];

async function writePlanningArtifacts() {
  const slidePlan = `Title: I Know What You Said 论文汇报 PPT

Mode: create from scratch
Deck size: 1280x720, 14 slides, classroom presentation, Chinese narration with English technical terms.
Style: security research / systems attack; dark intro and conclusion; light content slides; editable shapes and native charts.

Slides:
1. 标题页
2. 问题背景
3. 核心发现
4. 威胁模型
5. 漏洞根因
6. 攻击流程总览
7. 缓存时序测量与 phase 识别
8. 输出重构
9. 输入重构
10. 实验设置
11. 主要结果
12. 消融与参数分析
13. 讨论与防御
14. 总结页

Palette:
- Deep ink: ${C.ink}
- Surface: ${C.surface}
- Teal: ${C.teal}
- Amber: ${C.amber}
- Red: ${C.red}
- Violet: ${C.violet}

Fonts:
- Heading: ${HEAD}
- Body: ${FONT}
`;

  const sourceNotes = `Source notes for final deck

Primary source:
- Local PDF: ${sourcePdf}
- Paper: Gao et al., "I Know What You Said: Unveiling Hardware Cache Side-Channels in Local Large Language Model Inference"
- Venue: 34th USENIX Security Symposium, August 13-15, 2025
- URL shown in PDF: https://www.usenix.org/conference/usenixsecurity25/presentation/gao-zibo

Facts used:
- The paper reports token value leakage from token embedding cache access patterns and token position leakage from autoregressive decoding timing.
- The attack is passive, does not directly interact with the victim LLM, and can be executed without privilege.
- The evaluated deployments include models such as Llama, Falcon, Gemma, and Phi, plus practical frameworks such as llama.cpp, Ollama, GPT4All, LocalAI, HuggingFace, and Intel IPEX-LLM.
- Abstract metrics used on Slide 11: average edit distance 5.2% for output and 17.3% for input; average cosine similarity 98.7% for input and 98.0% for output.
- Table 2 values used on Slide 12: LLMB (SCA + Output): R1 82.8, LS 76.2, Cos 96.9, ASR 99.7; LLMB (Output only): R1 54.8, LS 55.2, Cos 91.5, ASR 95.8.
- Discussion and ethics notes: paper discusses hardware mitigation such as Intel CAT, zero-copy loading concerns, GPU-side embedding limitations, and reports issues to relevant software developers.

Asset provenance:
- No external images or logos used.
- Diagrams are redrawn as editable shapes.
- Charts are native editable charts generated from values stated in the paper.

pptmaster status:
- No exact pptmaster repository/package link was provided in the implementation request.
- Per plan, pptmaster was treated as unavailable and the bundled editable PPTX workflow was used.
`;

  await fs.writeFile(path.join(tmpDir, "slide-plan.txt"), slidePlan, "utf8");
  await fs.writeFile(path.join(tmpDir, "source-notes.txt"), sourceNotes, "utf8");
}

async function main() {
  await ensureDirs();
  await writePlanningArtifacts();

  const presentation = Presentation.create({ slideSize: { width: W, height: H } });
  for (const build of slideBuilders) build(presentation);

  const snapshot = await presentation.inspect({
    kind: "slide,textbox,shape,chart,notes",
    maxChars: 18000,
  });
  await fs.writeFile(path.join(tmpDir, "inspect.txt"), snapshot.ndjson, "utf8");

  for (const [index, slide] of presentation.slides.items.entries()) {
    const stem = `slide-${String(index + 1).padStart(2, "0")}`;
    await writeBlob(path.join(previewDir, `${stem}.png`), await presentation.export({ slide, format: "png", scale: 1 }));
    await fs.writeFile(path.join(layoutDir, `${stem}.layout.json`), await (await slide.export({ format: "layout" })).text(), "utf8");
  }

  await writeBlob(path.join(previewDir, "deck-montage.webp"), await presentation.export({ format: "webp", montage: true, scale: 1 }));

  const qaNotes = `Visual QA pass 2

Generated every slide preview and a deck montage using @oai/artifact-tool.
Inspection summary:
- No full-slide bitmap slides; content is editable shapes, text, speaker notes, and native charts.
- Every slide has a visual element.
- Fixed clipped text on slides 1, 3, and 14.
- Fixed connector arrow direction on workflow/threat-model slides.
- Replaced unstable hat/underscore notation on slides 8 and 9 with render-safe labels.
- Rechecked slides 2, 3, 4, 7, 8, 9, 11, 12, 13, and 14 as rendered PNGs.
`;
  await fs.writeFile(path.join(qaDir, "visual-qa.txt"), qaNotes, "utf8");

  const pptx = await PresentationFile.exportPptx(presentation);
  await pptx.save(finalPptx);
  const stat = await fs.stat(finalPptx);
  console.log(JSON.stringify({
    finalPptx,
    workspace,
    slideCount: presentation.slides.items.length,
    size: stat.size,
    montage: path.join(previewDir, "deck-montage.webp"),
  }, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
