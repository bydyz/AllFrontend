# 最大频率栈 (Maximum Frequency Stack)

## 📝 题目描述

设计一个类似堆栈的数据结构，将元素推入堆栈并从堆栈中弹出出现频率最高的元素。

实现 `FreqStack` 类:

- `FreqStack()` 构造一个空的频率栈。
- `void push(int val)` 将一个整数 `val` 推入堆栈的顶部。
- `int pop()` 移除并返回堆栈中出现频率最高的元素。
  - 如果出现频率最高元素有多个，那么移除并返回最接近堆栈顶部的那个元素。

---

## 📊 示例

### 示例 1

**输入：**

```
["FreqStack", "push", "push", "push", "push", "push", "push", "pop", "pop", "pop", "pop"]
[[], [5], [7], [5], [7], [4], [5], [], [], [], []]
```

**输出：**

```
[null, null, null, null, null, null, null, 5, 7, 5, 4]
```

**解释：**

```
FreqStack freqStack = new FreqStack();
freqStack.push(5); // 栈为 [5]
freqStack.push(7); // 栈为 [5,7]
freqStack.push(5); // 栈为 [5,7,5]
freqStack.push(7); // 栈为 [5,7,5,7]
freqStack.push(4); // 栈为 [5,7,5,7,4]
freqStack.push(5); // 栈为 [5,7,5,7,4,5]
freqStack.pop();   // 返回 5，因为 5 出现频率最高。栈变为 [5,7,5,7,4]
freqStack.pop();   // 返回 7，因为 5 和 7 出现频率最高，但 7 更接近栈顶。栈变为 [5,7,5,4]
freqStack.pop();   // 返回 5，因为 5 出现频率最高。栈变为 [5,7,4]
freqStack.pop();   // 返回 4，因为 4、5 和 7 出现频率最高，但 4 更接近栈顶。栈变为 [5,7]
```

---

## 🎯 提示

- `0 <= val <= 10^9`
- 调用 `push` 和 `pop` 的总次数不超过 `2 * 10^4`
- 保证在调用 `pop` 之前堆栈中至少有一个元素

---

## 📌 难度

- **标签：** `Hard`
- **标签：** `Stack` / `Design` / `Hash Table` / `Ordered Set`

---

## 🔗 相关链接

- [LeetCode 题目](https://leetcode.com/problems/maximum-frequency-stack/)