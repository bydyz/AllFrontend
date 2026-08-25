# 验证二叉搜索树 (Validate Binary Search Tree)

## 📝 题目描述

给你一个二叉树的根节点 `root`，判断其是否是一个有效的二叉搜索树。

**有效二叉搜索树**定义如下：

- 节点的左子树只包含**小于**当前节点的数
- 节点的右子树只包含**大于**当前节点的数
- 所有左子树和右子树自身必须也是二叉搜索树

---

## 📊 示例

### 示例 1

**输入：**

```
root = [2,1,3]
```

**输出：**

```
true
```

### 示例 2

**输入：**

```
root = [5,1,4,null,null,3,6]
```

**输出：**

```
false
```

**解释：** 根节点为 5，但是它的右子节点值为 4，不满足二叉搜索树的条件。

---

## 🎯 提示

- 树中节点数目范围在 `[1, 10^4]` 内
- `-2^31 <= Node.val <= 2^31 - 1`

---

## 📌 难度

- **标签：** `Medium`
- **标签：** `Tree` / `Depth-First Search` / `Binary Search Tree` / `Binary Tree`

---

## 🔗 相关链接

- [LeetCode 题目](https://leetcode.com/problems/validate-binary-search-tree/)