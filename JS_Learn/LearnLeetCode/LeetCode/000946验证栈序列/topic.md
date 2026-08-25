# 验证栈序列 (Validate Stack Sequences)

## 📝 题目描述

给定 `pushed` 和 `popped` 两个序列，每个序列中的值都不重复，仅当它们是在初始空栈上进行的推入弹出操作的结果时，返回 `true`；否则返回 `false`。

---

## 📊 示例

### 示例 1

**输入：** pushed = [1,2,3,4,5], popped = [4,5,3,2,1]

**输出：** true

**解释：**

- 我们可以执行以下操作序列：
- push(1), push(2), push(3), push(4), pop() -> 4
- push(5), pop() -> 5, pop() -> 3, pop() -> 2, pop() -> 1

---

### 示例 2

**输入：** pushed = [1,2,3,4,5], popped = [4,3,5,1,2]

**输出：** false

**解释：**

- 1 不能在 2 之前弹出

---

## 🎯 提示

- `1 <= pushed.length <= 1000`
- `0 <= pushed[i] <= 1000`
- `pushed` 的所有元素互不相同
- `popped.length == pushed.length`
- `popped` 是 `pushed` 的一个排列

---

## 📌 难度

- **标签：** `Medium`
- **标签：** `Array` / `Stack` / `Simulation`

---

## 🔗 相关链接

- [LeetCode 题目](https://leetcode.com/problems/validate-stack-sequences/)