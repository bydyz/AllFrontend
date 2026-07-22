# 长度最小的子数组 (Minimum Size Subarray Sum)

## 📝 题目描述

给定一个含有 `n` 个正整数的数组和一个正整数 `target` 。

找出该数组中满足其总和大于等于 `target` 的长度最小的 **连续子数组** `[numsl, numsl+1, ..., numsr-1, numsr]` ，并返回其长度。如果不存在符合条件的子数组，返回 `0` 。

---

## 📊 示例

### 示例 1

**输入：** target = 7, nums = [2,3,1,2,4,3]

**输出：** 2

**解释：** 子数组 [4,3] 是长度最小的满足条件的子数组。

---

### 示例 2

**输入：** target = 4, nums = [1,4,4]

**输出：** 1

**解释：** 长度最小的满足条件的子数组是 [4] ，长度为 1 。

---

### 示例 3

**输入：** target = 11, nums = [1,1,1,1,1,1,1,1]

**输出：** 0

**解释：** 没有任何子数组的总和大于等于 11 。

---

## 🎯 提示

- `1 <= target <= 10^9`
- `1 <= nums.length <= 10^5`
- `1 <= nums[i] <= 10^5`

**进阶：** 如果你已经实现 `O(n)` 时间复杂度的解法，尝试设计一个 `O(n log(n))` 时间复杂度的解法。

---

## 📌 难度

- **标签：** `Medium`
- **标签：** `Array` / `Binary Search` / `Sliding Window` / `Prefix Sum`

---

## 🔗 相关链接

- [LeetCode 题目](https://leetcode.com/problems/minimum-size-subarray-sum/)
