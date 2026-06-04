#include "Node.h"
#include <mysql/mysql.h>
#include <string.h>
#include <string>

extern "C"
{
    // 插入
    bool FHInsert_init(UDF_INIT *initid, UDF_ARGS *args, char *message);
    long long FHInsert(UDF_INIT *initid, UDF_ARGS *args, char *is_null, char *error);

    // 搜索
    bool FHSearch_init(UDF_INIT *const initid, UDF_ARGS *const args, char *const message);
    long long FHSearch(UDF_INIT *const initid, UDF_ARGS *const args,
                       char *const result, unsigned long *const length,
                       char *const is_null, char *const error);

    // 更新
    bool FHUpdate_init(UDF_INIT *initid, UDF_ARGS *args, char *message);
    long long FHUpdate(UDF_INIT *initid, UDF_ARGS *args, char *is_null, char *error);

    // 获取更新范围
    bool FHStart_init(UDF_INIT *initid, UDF_ARGS *args, char *message);
    long long FHStart(UDF_INIT *initid, UDF_ARGS *args, char *is_null, char *error);

    bool FHEnd_init(UDF_INIT *initid, UDF_ARGS *args, char *message);
    long long FHEnd(UDF_INIT *initid, UDF_ARGS *args, char *is_null, char *error);
}

/* ======================================================================== */
/* 1. 插入 UDF 接口                                                         */
/* ======================================================================== */
bool FHInsert_init(UDF_INIT *initid, UDF_ARGS *args, char *message)
{
    if (args->arg_count != 2) {
        strcpy(message, "FHInsert requires exactly 2 arguments: pos(INT), cipher(STRING)");
        return 1;
    }
    
    // 强制声明参数类型，防止 MySQL 自行推导错误导致内存对齐崩溃
    args->arg_type[0] = INT_RESULT;
    args->arg_type[1] = STRING_RESULT;

    // 初始化重置全局状态
    start_update = -1;
    end_update = -1;
    update.clear();
    
    if (root == nullptr)
    {
        root_initial();
    }
    return 0;
}

long long FHInsert(UDF_INIT *initid, UDF_ARGS *args, char *is_null, char *error)
{
    // 防御性检查：防止因传入 NULL 触发空指针异常导致 MySQL 崩溃
    if (args->args[0] == nullptr || args->args[1] == nullptr) {
        *is_null = 1;
        return 0;
    }

    // 核心修复：MySQL 的整数永远是 64 位 (long long)，必须先按 8 字节读取，再强转 int
    long long pos_raw = *((long long *)(args->args[0]));
    int pos = (int)pos_raw;

    // 获取字符串密文与长度
    unsigned long keyLen = args->lengths[1];
    char *keyBytes = args->args[1];
    const std::string cipher = std::string(keyBytes, keyLen);
    
    // 执行前再次确保重置全局状态
    start_update = -1;
    end_update = -1;
    update.clear();
    
    // 插入 B+ 树并返回新生成的编码
    long long re = root->insert(pos, cipher);
    return re;
}

/* ======================================================================== */
/* 2. 搜索 UDF 接口                                                         */
/* ======================================================================== */
bool FHSearch_init(UDF_INIT *const initid, UDF_ARGS *const args, char *const message)
{
    if (args->arg_count != 1) {
        strcpy(message, "FHSearch requires exactly 1 argument: pos(INT)");
        return 1;
    }
    args->arg_type[0] = INT_RESULT;
    return 0;
}

long long FHSearch(UDF_INIT *const initid, UDF_ARGS *const args,
                   char *const result, unsigned long *const length,
                   char *const is_null, char *const error)
{
    if (args->args[0] == nullptr || root == nullptr) {
        *is_null = 1;
        return 0;
    }

    long long pos_raw = *((long long *)(args->args[0]));
    int pos = (int)pos_raw;

    if (pos < 0) {
        return 0;
    }
    return root->search(pos);
}

/* ======================================================================== */
/* 3. 更新 UDF 接口                                                         */
/* ======================================================================== */
bool FHUpdate_init(UDF_INIT *initid, UDF_ARGS *args, char *message)
{
    if (args->arg_count != 1) {
        strcpy(message, "FHUpdate requires exactly 1 argument: cipher(STRING)");
        return 1;
    }
    args->arg_type[0] = STRING_RESULT;
    return 0;
}

long long FHUpdate(UDF_INIT *initid, UDF_ARGS *args, char *is_null, char *error)
{
    if (args->args[0] == nullptr) {
        *is_null = 1;
        return 0;
    }

    unsigned long keyLen = args->lengths[0];
    char *keyBytes = args->args[0];
    const std::string cipher = std::string(keyBytes, keyLen);
    
    return get_update(cipher);
}

/* ======================================================================== */
/* 4. 获取更新起始位置 UDF 接口                                              */
/* ======================================================================== */
bool FHStart_init(UDF_INIT *initid, UDF_ARGS *args, char *message)
{
    return 0;
}

long long FHStart(UDF_INIT *initid, UDF_ARGS *args, char *is_null, char *error)
{
    return start_update;
}

/* ======================================================================== */
/* 5. 获取更新结束位置 UDF 接口                                              */
/* ======================================================================== */
bool FHEnd_init(UDF_INIT *initid, UDF_ARGS *args, char *message)
{
    return 0;
}

long long FHEnd(UDF_INIT *initid, UDF_ARGS *args, char *is_null, char *error)
{
    return end_update;
}