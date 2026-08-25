# 填充每个节点的下一个右侧节点指针 (Populating Next Right Pointers in Each Node)

## 📝 题目描述

给定一个 **完美二叉树**，其所有叶子节点都在同一层，每个父节点都有两个子节点。二叉树定义如下：

```struct Node {
  int val;
  Node *left;
  Node *right;
  Node *next;
}
```

填充它的每个 `next` 指针，让这个指针指向其下一个右侧节点。如果找不到下一个右侧节点，将 `next` 指针设置为 `NULL`。

初始时，所有 `next` 指针都被设置为 `NULL`。

---

## 📊 示例

### 示例 1

**输入：** root = [1,2,3,4,5,6,7]

**输出：** [1,#,2,3,#,4,5,6,7,#]

**解释：**

- 给定的二叉树如图 A 所示，你的函数应该填充它的每个 next 指针，以指向其下一个右侧节点，如图 B 所示。

```
    1           1 -> NULL
   / \         / \
  2   3   =>  2 -> 3 -> NULL
 / \ / \     / \ / \
4  5 6  7   4->5->6->7 -> NULL
```

---

## 🎯 提示

- 树中节点的数量在 `[0, 2^12 - 1]` 范围内
- `-1000 <= Node.val <= 1000`

---

## 📌 难度

- **标签：** `Medium`
- **标签：** `Tree` / `Depth-First Search` / `Breadth-First Search` / `Linked List` / `Binary Tree`

---

## 🔗 相关链接

- [LeetCode 题目](https://leetcode.com/problems/populating-next-right-pointers-in-each-node/)