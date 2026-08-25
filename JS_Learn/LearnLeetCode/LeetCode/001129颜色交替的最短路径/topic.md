# 颜色交替的最短路径 (Shortest Path with Alternating Colors)

## 📝 题目描述

给你一个整数 `n`，即有向图中节点的数目，节点编号从 `0` 到 `n - 1`。图中的边可能是自环和平行边。

给你两个数组 `redEdges` 和 `blueEdges`，其中：

- `redEdges[i] = [ai, bi]` 表示图中存在一条从节点 `ai` 到节点 `bi` 的红色有向边
- `blueEdges[j] = [uj, vj]` 表示图中存在一条从节点 `uj` 到节点 `vj` 的蓝色有向边

返回一个长度为 `n` 的数组 `answer`，其中 `answer[x]` 是从节点 `0` 到节点 `x` 的最短路径的长度，且该路径上的边的颜色交替。如果从节点 `0` 到节点 `x` 不存在这样的路径，则 `answer[x] = -1`。

---

## 📊 示例

### 示例 1

**输入：**

```
n = 3, redEdges = [[0,1],[1,2]], blueEdges = []
```

**输出：**

```
[0,1,-1]
```

### 示例 2

**输入：**

```
n = 3, redEdges = [[0,1]], blueEdges = [[2,1]]
```

**输出：**

```
[0,1,-1]
```

---

## 🎯 提示

- `1 <= n <= 100`
- `0 <= redEdges.length, blueEdges.length <= 400`
- `redEdges[i].length == blueEdges[j].length == 2`
- `0 <= ai, bi, uj, vj < n`

---

## 📌 难度

- **标签：** `Medium`
- **标签：** `Breadth-First Search` / `Graph`

---

## 🔗 相关链接

- [LeetCode 题目](https://leetcode.com/problems/shortest-path-with-alternating-colors/)