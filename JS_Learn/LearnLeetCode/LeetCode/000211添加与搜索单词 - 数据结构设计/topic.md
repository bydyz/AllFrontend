# 添加与搜索单词 - 数据结构设计

## 📝 题目描述

请你设计一个数据结构，支持 添加新单词 和 查找字符串是否与任何先前添加的字符串匹配 。

实现词典类 WordDictionary ：

- `WordDictionary()` 初始化词典对象
- `void addWord(word)` 将 word 添加到数据结构中，之后可以对它进行匹配
- `bool search(word)` 如果数据结构中存在字符串与 word 匹配，则返回 true ；否则，返回 false 。word 中可能包含一些 '.' ，每个 . 都可以表示任何一个字母

---

## 📊 示例

### 示例 1

```javascript
输入：
["WordDictionary","addWord","addWord","addWord","search","search","search","search"]
[[],["bad"],["dad"],["mad"],["pad"],["bad"],[".ad"],["b.."]]

输出：
[null,null,null,null,false,true,true,true]

解释：
WordDictionary wordDictionary = new WordDictionary();
wordDictionary.addWord("bad");
wordDictionary.addWord("dad");
wordDictionary.addWord("mad");
wordDictionary.search("pad"); // 返回 False
wordDictionary.search("bad"); // 返回 True
wordDictionary.search(".ad"); // 返回 True
wordDictionary.search("b.."); // 返回 True
```

---

## 🎯 提示

- `1 <= word.length <= 25`
- `addWord` 中的 word 由小写英文字母组成
- `search` 中的 word 由 '.' 或小写英文字母组成
- 最多调用 10^4 次 addWord 和 search

---

## 📌 难度

- **标签：** `Medium`
- **标签：** `Design`
- **标签：** `Trie`
- **标签：** `Backtracking`

---

## 🗺️ 核心概念

### 前缀树（Trie 树）

前缀树是一种树形数据结构，用于高效地存储和检索字符串数据集中的键。它是一种多路树状结构。

**特点：**
- 每个节点包含最多 26 个子节点（对应 26 个字母）
- 根节点不存储字符
- 每个节点存储一个字符
- 标记是否为单词结束

**插入单词：**
```
插入 "bad"：
根节点
├── 'b'
│   ├── 'a'
│   │   ├── 'd' (标记结束)
```

**搜索单词：**
```
搜索 "bad"：沿着路径 'b' -> 'a' -> 'd' 到达叶子节点
搜索 ".ad"：在 'b' 节点处尝试所有子节点
```

---

## 🔗 相关链接

- [LeetCode 题目](https://leetcode.com/problems/design-add-and-search-words-data-structure/)
- [Trie 前缀树介绍](https://en.wikipedia.org/wiki/Trie)
