# 字符串的排列 (Permutation in String)

## 📝 题目描述

给你两个字符串 `s1` 和 `s2`，判断 `s2` 是否包含 `s1` 的排列。如果是，返回 `true` ；否则，返回 `false`。

换句话说，`s1` 的排列之一是 `s2` 的 **子串** 。

---

## 📊 示例

### 示例 1

**输入：** s1 = "ab", s2 = "eidbaooo"

**输出：** true

**解释：** s2 包含 s1 的排列之一 ("ba")。

---

### 示例 2

**输入：** s1 = "ab", s2 = "eidboaoo"

**输出：** false

**解释：** s2 不包含 s1 的排列。

---

## 🎯 提示

- `1 <= s1.length, s2.length <= 10^4`
- `s1` 和 `s2` 仅包含小写英文字母

---

## 📌 难度

- **标签：** `Medium`
- **标签：** `Hash Table` / `String` / `Sliding Window`

---

## 🔗 相关链接

- [LeetCode 题目](https://leetcode.com/problems/permutation-in-string/)
