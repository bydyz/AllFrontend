# 设计循环双端队列 (Design Circular Deque)

## 📝 题目描述

设计实现双端队列。

实现 `MyCircularDeque` 类:

- `MyCircularDeque(int k)`：构造函数，双端队列最大为 `k`。
- `boolean insertFront()`：将一个元素添加到双端队列头部。如果操作成功返回 `true`，否则返回 `false`。
- `boolean insertLast()`：将一个元素添加到双端队列尾部。如果操作成功返回 `true`，否则返回 `false`。
- `boolean deleteFront()`：从双端队列头部删除一个元素。如果操作成功返回 `true`，否则返回 `false`。
- `boolean deleteLast()`：从双端队列尾部删除一个元素。如果操作成功返回 `true`，否则返回 `false`。
- `int getFront()`：从双端队列头部获得一个元素。如果双端队列为空，返回 `-1`。
- `int getRear()`：获得双端队列的最后一个元素。如果双端队列为空，返回 `-1`。
- `boolean isEmpty()`：检查双端队列是否为空。
- `boolean isFull()`：检查双端队列是否已满。

---

## 📊 示例

### 示例 1

**输入：**

```
["MyCircularDeque", "insertLast", "insertLast", "insertFront", "insertFront", "getRear", "isFull", "deleteLast", "insertFront", "getFront"]
[[3], [1], [2], [3], [4], [], [], [], [4], []]
```

**输出：**

```
[null, true, true, true, false, 2, true, true, true, 4]
```

**解释：**

```
MyCircularDeque myCircularDeque = new MyCircularDeque(3);
myCircularDeque.insertLast(1);  // 返回 True
myCircularDeque.insertLast(2);  // 返回 True
myCircularDeque.insertFront(3); // 返回 True
myCircularDeque.insertFront(4); // 返回 False，队列已满
myCircularDeque.getRear();      // 返回 2
myCircularDeque.isFull();       // 返回 True
myCircularDeque.deleteLast();   // 返回 True
myCircularDeque.insertFront(4); // 返回 True
myCircularDeque.getFront();     // 返回 4
```

---

## 🎯 提示

- `1 <= k <= 1000`
- `0 <= value <= 1000`
- 最多调用 `insertFront`、`insertLast`、`deleteFront`、`deleteLast`、`getFront`、`getRear`、`isEmpty`、`isFull` 方法 `2000` 次

---

## 📌 难度

- **标签：** `Medium`
- **标签：** `Design` / `Queue` / `Array` / `Linked List`

---

## 🔗 相关链接

- [LeetCode 题目](https://leetcode.com/problems/design-circular-deque/)