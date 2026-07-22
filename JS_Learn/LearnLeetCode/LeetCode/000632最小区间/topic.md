# 最小区间 (Smallest Range Covering Elements from K Lists)

## 📝 题目描述

你有 `k` 个非递减排列的整数列表。找到一个最小区间，使得 `k` 个列表中的每个列表都至少有一个数包含在其中。

我们定义如果 `b-a < d-c` 或者 `b-a == d-c` 且 `a < c`，则区间 `[a,b]` 比 `[c,d]` 小。

---

## 📊 示例

### 示例 1

**输入：** nums = [[4,10,15,24,26], [0,9,12,20], [5,18,22,30]]

**输出：** [20,24]

**解释：** 
- 列表 1：[4, 10, 15, 24, 26]，24 在区间 [20,24] 内
- 列表 2：[0, 9, 12, 20]，20 在区间 [20,24] 内
- 列表 3：[5, 18, 22, 30]，22 在区间 [20,24] 内

---

### 示例 2

**输入：** nums = [[1,2,3],[1,3,4],[1,3,5]]

**输出：** [1,3]

**解释：** 1 是唯一能覆盖所有列表的数。

---

## 🎯 提示

- `nums.length == k`
- `1 <= k <= 3500`
- `1 <= nums[i].length <= 50`
- `-10^5 <= nums[i][j] <= 10^5`
- `nums[i]` 按非递减顺序排列

---

## 📌 难度

- **标签：** `Hard`
- **标签：** `Array` / `Hash Table` / `Greedy` / `Sliding Window` / `Sorting` / `Heap (Priority Queue)`

---

## 🔗 相关链接

- [LeetCode 题目](https://leetcode.com/problems/smallest-range-covering-elements-from-k-lists/)
