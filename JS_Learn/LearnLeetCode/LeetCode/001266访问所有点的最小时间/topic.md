# 访问所有点的最小时间

## 📝 题目描述

平面上有 n 个点，点的位置用整数坐标表示 `points[i] = [xi, yi]` 。请你计算访问所有这些点需要的 **最小时间**（以秒为单位）。

**你需要按照下面的规则在平面上移动：**

1. **每一秒内，你可以：**
   - 沿水平方向移动一个单位长度
   - 或者沿竖直方向移动一个单位长度
   - 或者跨过对角线移动 `√2` 个单位长度（可以看作在一秒内向水平和竖直方向各移动一个单位长度）

2. **必须按照数组中出现的顺序来访问这些点**

3. **在访问某个点时，可以经过该点后面出现的点，但经过的那些点不算作有效访问**

---

## 📊 示例

### 示例 1

**输入：** `points = [[1,1],[3,4],[-1,0]]`

**输出：** `7`

**解释：** 一条最佳的访问路径是：
`[1,1] → [2,2] → [3,3] → [3,4] → [2,3] → [1,2] → [0,1] → [-1,0]`

- 从 `[1,1]` 到 `[3,4]` 需要 3 秒
- 从 `[3,4]` 到 `[-1,0]` 需要 4 秒
- 一共需要 7 秒

---

### 示例 2

**输入：** `points = [[3,2],[-2,2]]`

**输出：** `5`

---

## 🎯 提示

- `points.length == n`
- `1 <= n <= 100`
- `points[i].length == 2`
- `-1000 <= points[i][0], points[i][1] <= 1000`

---

## 📌 难度

- **标签：** `Easy`
- **标签：** `Math`

---

## 💡 解题思路

### 核心思想

对于相邻的两个点 `(x1, y1)` 和 `(x2, y2)`：

1. **水平+竖直移动**：
   - 消耗时间：`abs(x2 - x1) + abs(y2 - y1)`

2. **对角线移动**：
   - 如果 `abs(x2 - x1) == abs(y2 - y1)`，可以直接走对角线
   - 消耗时间：`abs(x2 - x1)`（即 `√2` 个单位长度，但计算时取整为 `abs(x2 - x1)`）

3. **最优选择**：
   - 因为对角线移动更快（`√2` 秒 vs `1 + 1 = 2` 秒），所以应该优先使用对角线
   - 策略：**尽可能走对角线**

### 计算方法

对于相邻点 `(x1, y1)` 和 `(x2, y2)`：

1. 计算 x 轴距离：`dx = abs(x2 - x1)`
2. 计算 y 轴距离：`dy = abs(y2 - y1)`
3. 移动时间 = `max(dx, dy)`（因为对角线更快，优先用对角线）

---

## 📐 数学原理

### 对角线 vs 分步移动

```
分步移动：
x 轴移动 1 单位：1 秒
y 轴移动 1 单位：1 秒
总时间：2 秒

对角线移动：
直接移动 √2 单位：1 秒

结论：对角线移动更快！
```

### 示例分析

**示例 1：** `[1,1] → [3,4]`

- `dx = abs(3-1) = 2`
- `dy = abs(4-1) = 3`
- 移动时间 = `max(2, 3) = 3` 秒

**示例 2：** `[3,2] → [-2,2]`

- `dx = abs(-2-3) = 5`
- `dy = abs(2-2) = 0`
- 移动时间 = `max(5, 0) = 5` 秒

---

## 💻 完整实现

### JavaScript 实现

```javascript
/**
 * @param {number[][]} points
 * @return {number}
 */
var minTimeToVisitAllPoints = function(points) {
    let total = 0;

    for (let i = 1; i < points.length; i++) {
        const x1 = points[i - 1][0];
        const y1 = points[i - 1][1];
        const x2 = points[i][0];
        const y2 = points[i][1];

        const dx = Math.abs(x2 - x1);
        const dy = Math.abs(y2 - y1);

        total += Math.max(dx, dy);
    }

    return total;
};
```

### Python 实现

```python
class Solution:
    def minTimeToVisitAllPoints(self, points: List[List[int]]) -> int:
        total = 0
        for i in range(1, len(points)):
            x1, y1 = points[i - 1]
            x2, y2 = points[i]
            dx = abs(x2 - x1)
            dy = abs(y2 - y1)
            total += max(dx, dy)
        return total
```

---

## 📊 复杂度分析

| 操作 | 时间复杂度 | 空间复杂度 | 说明 |
|------|-----------|-----------|------|
| 整体 | O(n) | O(1) | n 为点的数量 |

**时间复杂度：**
- 只需遍历一次数组
- 每次循环进行 O(1) 的计算
- 总体 O(n)

**空间复杂度：**
- 只使用常数个变量
- O(1)

---

## 🔗 相关链接

- [LeetCode 题目](https://leetcode.com/problems/minimum-time-visiting-all-points/)
