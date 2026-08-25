# 我的日程安排表三 (My Calendar III)

## 📝 题目描述

当 `k` 个日程有一些时间上的交叉时（例如 `k` 个日程都在某个时间内出现），就会产生 `k` 次预订。

给你一些日程安排 `[startTime, endTime)`，每次添加一个日程后，返回一个整数 `k`，表示所有先前日程安排中的最大 `k` 次预订。

实现一个 `MyCalendarThree` 类：

- `MyCalendarThree()` 初始化对象。
- `int book(int startTime, int endTime)` 返回一个整数 `k`，表示日历中存在的最大 `k` 次预订。

---

## 📊 示例

### 示例 1

**输入：**

```
["MyCalendarThree", "book", "book", "book", "book", "book", "book"]
[[], [10, 20], [50, 60], [10, 40], [5, 15], [5, 10], [25, 55]]
```

**输出：**

```
[null, 1, 1, 2, 3, 3, 3]
```

**解释：**

```
MyCalendarThree myCalendarThree = new MyCalendarThree();
myCalendarThree.book(10, 20); // 返回 1
myCalendarThree.book(50, 60); // 返回 1
myCalendarThree.book(10, 40); // 返回 2
myCalendarThree.book(5, 15); // 返回 3
myCalendarThree.book(5, 10); // 返回 3
myCalendarThree.book(25, 55); // 返回 3
```

---

## 🎯 提示

- `0 <= startTime < endTime <= 10^9`
- 每个测试用例，调用 `book` 方法最多不超过 `400` 次

---

## 📌 难度

- **标签：** `Hard`
- **标签：** `Binary Search` / `Design` / `Segment Tree` / `Prefix Sum` / `Ordered Set`

---

## 🔗 相关链接

- [LeetCode 题目](https://leetcode.com/problems/my-calendar-iii/)