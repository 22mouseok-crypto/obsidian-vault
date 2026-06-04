-- ==============================================
-- 1. 清理并创建测试表
-- ==============================================
DROP TABLE IF EXISTS example;
CREATE TABLE example (
    encoding BIGINT,
    ciphertext VARCHAR(512)
);

-- ==============================================
-- 2. 清理已存在的UDF函数
-- ==============================================
DROP FUNCTION IF EXISTS FHInsert;
DROP FUNCTION IF EXISTS FHSearch;
DROP FUNCTION IF EXISTS FHUpdate;
DROP FUNCTION IF EXISTS FHStart;
DROP FUNCTION IF EXISTS FHEnd;

-- ==============================================
-- 3. 创建UDF函数
-- 注意：请将 'libope.so' 修改为你实际编译生成的库文件名
-- 如果你之前编译的是 libfhope.so，则保持不变
-- ==============================================
CREATE FUNCTION FHInsert RETURNS INTEGER SONAME 'libope.so';
CREATE FUNCTION FHSearch RETURNS INTEGER SONAME 'libope.so';
CREATE FUNCTION FHUpdate RETURNS INTEGER SONAME 'libope.so';
CREATE FUNCTION FHStart RETURNS INTEGER SONAME 'libope.so';
CREATE FUNCTION FHEnd RETURNS INTEGER SONAME 'libope.so';

-- ==============================================
-- 4. 创建智能插入存储过程（自动处理编码更新）
-- ==============================================
DROP PROCEDURE IF EXISTS pro_insert;
DELIMITER $$
CREATE PROCEDURE pro_insert(IN pos INT, IN ct VARCHAR(512))
BEGIN
    DECLARE i BIGINT DEFAULT 0;
    -- 调用B+树插入函数获取编码
    SET i = FHInsert(pos, ct);
    -- 插入数据到表中
    INSERT INTO example VALUES (i, ct);
    -- 如果返回0，说明B+树发生了重编码，需要同步更新数据库
    IF i = 0 THEN
        UPDATE example
        SET encoding = FHUpdate(ciphertext)
        WHERE (encoding >= FHStart() AND encoding < FHEnd())
           OR (encoding = 0);
    END IF;
END $$
DELIMITER ;