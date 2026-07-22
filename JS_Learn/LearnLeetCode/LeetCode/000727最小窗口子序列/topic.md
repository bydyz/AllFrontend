# 最小窗口子序列 (Minimum Window Subsequence)

## 📝 题目描述

给定字符串 `s1` 和 `s2`，找到 `s1` 中包含 `s2` 所有字符（按顺序出现）的最短连续子串。

如果 `s1` 中不存在这样的子串，则返回空字符串 `""`。

如果存在多个最短子串，返回其中最左边的一个。

**子序列** 是由另一个字符串删除某些字符（也可以不删除）但不改变剩余字符相对位置形成的新字符串。

**注意：** 该问题中的"子序列"与常规定义不同，这里指的是**连续**子串。

---

## 📊 示例

### 示例 1

**输入：** s1 = "abcdebdde", s2 = "bde"

**输出：** "bcde"

**解释：** "bcde" 是最短的包含 "bde" 所有字符的连续子串（按顺序出现）。"deb" 不是答案，因为它虽然是子序列，但不是连续的。

---

### 示例 2

**输入：** s1 = "jmeaksdjakdjkasjdkajsd", s2 = "js"

**输出：** "jmeaksdjakdjkasjdkajsd"

**解释：** 整个字符串 s1 包含了 "js" 作为子序列。

---

## 🎯 提示

- `1 <= s1.length <= 10^4`
- `1 <= s2.length <= 100`
- `s1` 和 `s2` 仅由小写英文字母组成

---

## 📌 难度

- **标签：** `Hard`
- **标签：** `String` / `Sliding Window` / `Dynamic Programming`

---

## 🔗 相关链接

- [LeetCode 题目](https://leetcode.com/problems/minimum-window-subsequence/)
