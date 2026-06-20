# 1267 统计参与通信的服务器

[LeetCode 链接](https://leetcode.cn/problems/count-servers-that-communicate/)

## 题目描述
这里有一幅服务器分布图，服务器的位置标识在 m * n 的整数矩阵网格 grid 中，1 表示单元格上有服务器，0 表示没有。

如果两台服务器位于同一行或者同一列，我们就认为它们之间可以进行通信。

请你统计并返回能够与至少一台其他服务器进行通信的服务器的数量。

## 示例

### 示例 1
输入：grid = [[1,0],[0,1]]
输出：0
解释：没有一台服务器能与其他服务器进行通信。

### 示例 2
输入：grid = [[1,0],[1,1]]
输出：3
解释：所有这些服务器都至少可以与一台别的服务器进行通信。

### 示例 3
输入：grid = [[1,1,0,0],[0,0,1,0],[0,0,1,0],[0,0,0,1]]
输出：4
解释：第一行的两台服务器互相通信，第三列的两台服务器互相通信，但右下角的服务器无法与其他服务器通信。

## 提示
- m == grid.length
- n == grid[i].length
- 1 <= m <= 250
- 1 <= n <= 250
- grid[i][j] == 0 or 1

## 算法思路

### 基本思路
1. 遍历整个矩阵，记录：
   - 每一行有多少个服务器
   - 每一列有多少个服务器
2. 再次遍历矩阵，检查每个位置的服务器：
   - 如果该行有多个服务器 OR 该列有多个服务器，则该服务器可以与其他服务器通信
   - 否则，该服务器无法通信

### 优化思路
1. 预先计算行计数和列计数
2. 单次遍历即可统计满足条件的服务器数量

## 复杂度分析

### 方法1：双重遍历
- 时间复杂度：O(m * n)，需要遍历矩阵两次
- 空间复杂度：O(m + n)，用于存储行和列的计数

### 方法2：优化空间
- 可以使用二进制标记来优化空间，但对于小规模数据，O(m+n) 已经足够

## 代码实现

```javascript
/**
 * @param {number[][]} grid
 * @return {number}
 */
var countServers = function(grid) {
    const m = grid.length;
    const n = grid[0].length;

    // 记录每行和每列的服务器数量
    const rowCounts = new Array(m).fill(0);
    const colCounts = new Array(n).fill(0);

    // 第一次遍历：统计每行每列的服务器数量
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (grid[i][j] === 1) {
                rowCounts[i]++;
                colCounts[j]++;
            }
        }
    }

    // 第二次遍历：统计可以通信的服务器数量
    let count = 0;
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (grid[i][j] === 1 && (rowCounts[i] > 1 || colCounts[j] > 1)) {
                count++;
            }
        }
    }

    return count;
};
```

## 优化实现（单次遍历）

```javascript
var countServers = function(grid) {
    const m = grid.length;
    const n = grid[0].length;

    // 记录每行和每列的服务器数量
    const rowCounts = new Array(m).fill(0);
    const colCounts = new Array(n).fill(0);

    // 预处理阶段：记录每行每列的服务器数量
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (grid[i][j] === 1) {
                rowCounts[i]++;
                colCounts[j]++;
            }
        }
    }

    // 统计阶段：单次遍历
    let count = 0;
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (grid[i][j] === 1) {
                // 如果该行或该列有多个服务器，则该服务器可以通信
                if (rowCounts[i] > 1 || colCounts[j] > 1) {
                    count++;
                }
            }
        }
    }

    return count;
};
```

## 边界情况处理
1. 空矩阵或单行/单列的情况
2. 没有服务器的情况
3. 所有服务器都能通信的情况
4. 所有服务器都无法通信的情况

## 关键要点
1. 分阶段处理：预处理 + 统计
2. 行列计数的巧妙应用
3. 条件判断的优化
4. 边界条件的充分测试