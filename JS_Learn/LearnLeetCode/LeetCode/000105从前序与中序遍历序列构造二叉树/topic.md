# 从前序与中序遍历序列构造二叉树 (Construct Binary Tree from Preorder and Inorder Traversal)

## 📝 题目描述

给定两个整数数组 `preorder` 和 `inorder`，其中 `preorder` 是二叉树的前序遍历，`inorder` 是同一棵树的中序遍历，请构造二叉树并返回其根节点。

---

## 📊 示例

### 示例 1

**输入：**

```
preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]
```

**输出：**

```
[3,9,20,null,null,15,7]
```

### 示例 2

**输入：**

```
preorder = [-1], inorder = [-1]
```

**输出：**

```
[-1]
```

---

## 🎯 提示

- `1 <= preorder.length <= 3000`
- `inorder.length == preorder.length`
- `-3000 <= preorder[i], inorder[i] <= 3000`
- `preorder` 和 `inorder` 均由 **不同** 的整数组成
- `inorder` 中的每个值也在 `preorder` 中出现
- `preorder` 保证是二叉树的前序遍历序列
- `inorder` 保证是二叉树的中序遍历序列

---

## 📌 难度

- **标签：** `Medium`
- **标签：** `Array` / `Hash Table` / `Divide and Conquer` / `Tree` / `Binary Tree`

---

## 🔗 相关链接

- [LeetCode 题目](https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/)