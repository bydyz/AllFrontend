# 压缩字符串

## 📝 题目描述

给定一个字符数组 `chars`，请使用**原地算法**进行压缩：

**压缩规则：**
- 对数组中**连续重复字符**进行压缩
- 对于连续出现的字符：
  - 如果连续长度为 `1`，只保留字符
  - 如果连续长度大于 `1`，保留字符并紧接其重复次数
- **压缩后的内容仍然需要以字符数组的形式存储**

**重要约束：**
- 必须使用**常量额外空间**（in-place）
- 直接修改 `chars` 数组，不返回字符串
- 当重复次数超过 `9` 时，拆分为多个数字字符存储

**返回值：**
- 返回数组的**新长度**
- 数组前 `newLength` 个元素为压缩后的有效内容
- 后续元素可忽略

---

## 📊 示例

### 示例 1

**输入：** `chars = ["a","a","b","b","c","c","c"]`

**压缩过程：**

| 步骤 | 分组 | 压缩结果 | chars 数组状态 |
|------|------|----------|---------------|
| 1 | "aa" | "a2" | ["a","2","b","b","c","c","c"] |
| 2 | "bb" | "b2" | ["a","2","b","2","c","c","c"] |
| 3 | "ccc" | "c3" | ["a","2","b","2","c","3"] |

**输出：** `6`

**chars 前 6 个元素：** `["a","2","b","2","c","3"]`

---

### 示例 2

**输入：** `chars = ["a"]`

**压缩过程：**

| 步骤 | 分组 | 压缩结果 | chars 数组状态 |
|------|------|----------|---------------|
| 1 | "a" | "a" | ["a"] |

**输出：** `1`

**chars 前 1 个元素：** `["a"]`

---

### 示例 3

**输入：** `chars = ["a","b","b","b","b","b","b","b","b","b","b","b","b"]`

**压缩过程：**

| 步骤 | 分组 | 压缩结果 | chars 数组状态 |
|------|------|----------|---------------|
| 1 | "a" | "a" | ["a","b","b",...] |
| 2 | "bbbb..." | "b12" | ["a","b","1","2",...] |

**输出：** `4`

**chars 前 4 个元素：** `["a","b","1","2"]`

---

## 🎯 提示

- `1 <= chars.length <= 2000`
- `chars[i]` 为小写英文字母、大写英文字母、数字或符号
- 输入数组 **总是满足** 压缩后的长度小于或等于原长度

---

## 📌 难度

- **标签：** `Medium`
- **标签：** `Two Pointers`

---

## 💡 解题思路

### 方法一：双指针（推荐）

**核心思想：**
1. 使用两个指针：`write`（写入位置）和 `read`（读取位置）
2. 遍历数组，识别连续重复的字符组
3. 写入压缩后的字符到 `write` 位置
4. 最后返回 `write`

**算法步骤：**
1. 初始化 `write = 0`，`read = 0`
2. 当 `read < chars.length`：
   - 记录起始位置 `start = read`
   - 遍历直到遇到不同字符
   - 写入字符到 `write`
   - 如果长度 > 1，写入数字
   - 移动 `read` 指针
3. 返回 `write`

---

### 方法二：模拟压缩

**核心思想：**
1. 模拟压缩过程
2. 使用额外数组存储结果（但最后复制回原数组）

---

## 📐 数学原理

### 数字转换

**将数字转换为字符数组：**

```
数字 1-9：直接存储为字符
数字 10-99：存储为十位和个位
数字 100-999：存储为百位、十位和个位
```

**转换示例：**

```javascript
// 数字 12 转换为 ["1", "2"]
function numToChars(num) {
    const chars = [];
    while (num > 0) {
        chars.unshift(String(num % 10));
        num = Math.floor(num / 10);
    }
    return chars;
}

numToChars(12);  // ["1", "2"]
numToChars(9);   // ["9"]
numToChars(123); // ["1", "2", "3"]
```

---

## 💻 完整实现

### JavaScript 实现

```javascript
/**
 * @param {character[]} chars
 * @return {number}
 */
var compress = function(chars) {
    let write = 0; // 写入位置

    for (let read = 0; read < chars.length; read++) {
        const start = read;
        // 找到连续相同字符的结束位置
        while (read + 1 < chars.length && chars[read] === chars[read + 1]) {
            read++;
        }

        // 写入字符
        chars[write++] = chars[start];

        // 如果连续次数 > 1，写入数字
        if (read - start > 0) {
            const count = read - start + 1;
            const numChars = String(count);

            for (let ch of numChars) {
                chars[write++] = ch;
            }
        }
    }

    return write;
};
```

---

## 🔗 相关链接

- [LeetCode 题目](https://leetcode.com/problems/string-compression/)
