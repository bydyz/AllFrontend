# 我的日程安排表一 (My Calendar I)

## 📝 题目描述

实现一个 `MyCalendar` 类来存放你的日程安排。如果要添加的时间内没有其他安排，则可以添加该日程安排。

`MyCalendar` 类包含一个方法 `book(int start, int end)`。它表示在 `start` 到 `end` 时间内增加一个日程安排，注意，这里的时间是半开区间，即 `[start, end)`。

**双重预定** 是指两个日程安排有一些时间上的交叉（例如，他们共享某些时间）。

当发生双重预定就无法添加该日程安排。

---

## 📊 示例

### 示例 1

**输入：**

```
["MyCalendar", "book", "book", "book"]
[[], [10, 20], [15, 25], [20, 30]]
```

**输出：**

```
[null, true, false, true]
```

**解释：**

```
MyCalendar myCalendar = new MyCalendar();
myCalendar.book(10, 20); // 返回 True
myCalendar.book(15, 25); // 返回 False，时间 15 已经被其他日程安排预定
myCalendar.book(20, 30); // 返回 True，该日程安排可以被预定，因为第一个日程安排的时间不包括 20
```

---

## 🎯 提示

- 每个测试用例中，调用 `MyCalendar.book` 方法最多不超过 `1000` 次
- `0 <= start < end <= 10^9`

---

## 📌 难度

- **标签：** `Medium`
- **标签：** `Design` / `Binary Search` / `Ordered Set` / `Segment Tree`

---

## 🔗 相关链接

- [LeetCode 题目](https://leetcode.com/problems/my-calendar-i/)