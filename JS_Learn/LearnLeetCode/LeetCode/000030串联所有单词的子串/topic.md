# 串联所有单词的子串 (Substring with Concatenation of All Words)

## 📝 题目描述

给定一个字符串 `s` 和一个字符串数组 `words`，`words` 中所有字符串长度相同。

`s` 中的 **串联子串** 是指一个包含 `words` 中所有字符串以任意顺序排列连接起来的子串。

- 例如，如果 `words = ["ab","cd","ef"]`，那么 `"abcdef"`，`"abefcd"`，`"cdabef"`，`"cdefab"`，`"efabcd"` 和 `"efcdab"` 都是串联子串。`"acdbef"` 不是串联子串，因为它不是任何 `words` 排列的连接。

返回所有串联子串在 `s` 中的开始索引。你可以以任意顺序返回答案。

---

## 📊 示例

### 示例 1

**输入：** s = "barfoothefoobarman", words = ["foo","bar"]

**输出：** [0,9]

**解释：** 因为 words.length == 2 且 words[i].length == 3，连接的子字符串长度必须为 6。
- 子串 "barfoo" 开始位置是 0：由 `["bar","foo"]` 顺序连接而成
- 子串 "foobar" 开始位置是 9：由 `["foo","bar"]` 顺序连接而成
- 输出顺序无关紧要，返回 [9,0] 也是可以的

---

### 示例 2

**输入：** s = "wordgoodgoodgoodbestword", words = ["word","good","best","word"]

**输出：** []

**解释：** 因为 words.length == 4 且 words[i].length == 4，所以串联子串的长度必须为 16。s 中没有长度为 16 且等于 words 任何顺序排列连接的子串。

---

### 示例 3

**输入：** s = "barfoofoobarthefoobarman", words = ["bar","foo","the"]

**输出：** [6,9,12]

**解释：** 因为 words.length == 3 且 words[i].length == 3，所以串联子串的长度必须为 9。
- 子串 "foobarthe" 开始位置是 6
- 子串 "barthefoo" 开始位置是 9
- 子串 "thefoobar" 开始位置是 12

---

## 🎯 提示

- `1 <= s.length <= 10^4`
- `1 <= words.length <= 5000`
- `1 <= words[i].length <= 30`
- `s` 和 `words[i]` 仅由小写英文字母组成

---

## 📌 难度

- **标签：** `Hard`
- **标签：** `Hash Table` / `String` / `Sliding Window`

---

## 🔗 相关链接

- [LeetCode 题目](https://leetcode.com/problems/substring-with-concatenation-of-all-words/)
