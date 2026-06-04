#!/bin/bash
# ================================================================
# 运行 FH-OPE 测试并保存输出到文件，方便截图
# 在虚拟机中执行：bash run_and_capture.sh
# ================================================================

OUTPUT_DIR="screenshots"
mkdir -p "$OUTPUT_DIR"

# 阶段1：混合插入
python3 client.py 2>&1 | tee full_output.txt

# ---- 以下按阶段拆分截图用 ----
# 如果需要拆分成多张截图，可以分段执行：

# 阶段1 & 2：
echo "=== 阶段1&2输出 ===" > "$OUTPUT_DIR/phase1_2.txt"
python3 client.py 2>&1 | head -100 > "$OUTPUT_DIR/phase1_2.txt"

# 阶段3：编码分布
echo "=== 阶段3输出 ===" > "$OUTPUT_DIR/phase3.txt"
python3 client.py 2>&1 | tail -120 > "$OUTPUT_DIR/phase3.txt"

echo "输出文件已保存到 $OUTPUT_DIR/"
ls -la "$OUTPUT_DIR/"
