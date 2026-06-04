import pymysql
import random
from Crypto.Cipher import AES
from Crypto.Random import get_random_bytes
from Crypto.Util.Padding import pad, unpad
import base64

local_table = {}
key = get_random_bytes(16)
base_iv = get_random_bytes(16)

def AES_ENC(plaintext, iv):
    # AES加密
    aes = AES.new(key, AES.MODE_CBC, iv=iv)
    padded_data = pad(plaintext, AES.block_size, style='pkcs7')
    ciphertext = aes.encrypt(padded_data)
    return ciphertext

def AES_DEC(ciphertext, iv):
    # AES解密
    aes = AES.new(key, AES.MODE_CBC, iv=iv)
    padded_data = aes.decrypt(ciphertext)
    plaintext = unpad(padded_data, AES.block_size, style='pkcs7')
    return plaintext

def Random_Encrypt(plaintext):
    # 随机化iv，保证加密结果的随机性
    iv = get_random_bytes(16)
    ciphertext = AES_ENC(iv + AES_ENC(plaintext.encode('utf-8'), iv), base_iv)
    ciphertext = base64.b64encode(ciphertext)
    return ciphertext.decode('utf-8')

def Random_Decrypt(ciphertext):
    plaintext = AES_DEC(base64.b64decode(ciphertext.encode('utf-8')) ,base_iv)
    plaintext = AES_DEC(plaintext[16:],plaintext[:16])
    return plaintext.decode('utf-8')

def CalPos(plaintext):
    # 根据plaintext计算其对应的Pos
    presum = sum([v for k, v in local_table.items() if k < plaintext])
    if plaintext in local_table:
        local_table[plaintext] += 1
        return random.randint(presum, presum + local_table[plaintext] - 1)
    else:
        local_table[plaintext] = 1
        return presum

def GetLeftPos(plaintext):
    return sum([v for k, v in local_table.items() if k < plaintext])

def GetRightPos(plaintext):
    return sum([v for k, v in local_table.items() if k <= plaintext])

def Insert(plaintext):
    ciphertext = Random_Encrypt(plaintext)
    pos = CalPos(plaintext)
    # 连接数据库
    conn = pymysql.connect(host='localhost', user='user', passwd='123456', database='test_db')
    cur = conn.cursor()
    # 直接调用存储过程完成插入（内部已包含 FHInsert 调用和编码更新处理）
    cur.execute(f"call pro_insert({pos},'{ciphertext}')")
    conn.commit()
    # 通过检查 FHStart 是否为 -1 来判断是否发生了分裂/编码更新
    # Recode 发生后，FHStart 和 FHEnd 会被设置为更新区间的边界值
    cur.execute("select FHStart(), FHEnd()")
    start, end = cur.fetchone()
    conn.close()
    return start != -1  # 返回 True 表示发生了分裂/编码更新

def Search(left, right):
    # 查询[left,right]中的信息
    left_pos = GetLeftPos(left)
    right_pos = GetRightPos(right)
    # 查询数据库
    conn = pymysql.connect(host='localhost', user='user', passwd='123456', database='test_db')
    cur = conn.cursor()
    cur.execute(
        f"select ciphertext from example where encoding >= FHSearch({left_pos}) and encoding < FHSearch({right_pos})")
    rest = cur.fetchall()
    for x in rest:
        print(f"ciphtertext: {x[0]} plaintext: {Random_Decrypt(x[0])}")

if __name__ == '__main__':
    # ============================================================
    # 清理旧数据，避免上次运行残留影响本次测试
    # ============================================================
    conn = pymysql.connect(host='localhost', user='user', passwd='123456', database='test_db')
    cur = conn.cursor()
    cur.execute("TRUNCATE TABLE example")
    conn.commit()
    conn.close()
    print("已清理旧数据，开始测试。\n")

    # ============================================================
    # 测试：观察编码树分裂和编码更新
    # ============================================================

    # ---- 阶段1：正常混合插入（教材原始测试） ----
    print("=" * 60)
    print("阶段1：混合插入多类型数据")
    print("=" * 60)
    for ciphertext in ['apple', 'pear', 'banana', 'orange', 'cherry', 'apple', 'cherry', 'orange']:
        split = Insert(ciphertext)
        status = "*** 发生分裂! ***" if split else "正常"
        print(f"  插入 '{ciphertext:8s}' -> local_table频次: {dict(local_table)} -> {status}")

    # ---- 阶段2：反复插入同一个值，观察频率累积和树分裂 ----
    print()
    print("=" * 60)
    print("阶段2：反复插入相同值 'x' 观察频率隐藏和分裂")
    print("=" * 60)
    split_count = 0
    for i in range(1, 31):
        split = Insert('x')
        if split:
            split_count += 1
            print(f"  第{i:2d}次插入 'x' -> local_table['x']={local_table.get('x',0)} -> *** 第{split_count}次分裂! 编码更新! ***")
        else:
            if i % 5 == 0 or i <= 5:
                print(f"  第{i:2d}次插入 'x' -> local_table['x']={local_table.get('x',0)} -> 正常")

    # 阶段2之后的范围查询
    print()
    print("--- 阶段2后范围查询 'b' ~ 'p' ---")
    Search('b', 'p')

    # ---- 阶段3：插入多个相同值再插入其他值，观察编码重新分配 ----
    print()
    print("=" * 60)
    print("阶段3：大量重复插入后观察数据库编码分布")
    print("=" * 60)
    # 查询数据库中的编码分布
    conn = pymysql.connect(host='localhost', user='user', passwd='123456', database='test_db')
    cur = conn.cursor()
    cur.execute("select encoding, ciphertext from example order by encoding")
    rows = cur.fetchall()
    for enc, ct in rows:
        try:
            pt = Random_Decrypt(ct)
            print(f"  encoding={enc:4d} -> plaintext='{pt}'")
        except Exception as e:
            print(f"  encoding={enc:4d} -> [解密失败: {e}]")
    conn.close()

    # ---- 阶段4：再插入一个引发分裂的极端值 ----
    print()
    print("=" * 60)
    print("阶段4：再持续插入 'y' 触发更多分裂")
    print("=" * 60)
    for i in range(1, 21):
        split = Insert('y')
        if split:
            split_count += 1
            print(f"  插入 'y' 第{i:2d}次 -> local_table['y']={local_table.get('y',0)} -> *** 第{split_count}次分裂! ***")
        else:
            if i % 5 == 0:
                print(f"  插入 'y' 第{i:2d}次 -> local_table['y']={local_table.get('y',0)} -> 正常")

    # 最终查询编码分布
    print()
    print("--- 最终数据库编码分布 ---")
    conn = pymysql.connect(host='localhost', user='user', passwd='123456', database='test_db')
    cur = conn.cursor()
    cur.execute("select encoding, ciphertext from example order by encoding")
    rows = cur.fetchall()
    for enc, ct in rows:
        try:
            pt = Random_Decrypt(ct)
            print(f"  encoding={enc:4d} -> plaintext='{pt}'")
        except Exception as e:
            print(f"  encoding={enc:4d} -> [解密失败: {e}]")
    conn.close()

    print()
    print("=" * 60)
    print(f"测试完成！共发生 {split_count} 次编码树分裂")
    print(f"最终 local_table = {dict(local_table)}")
    print("=" * 60)
