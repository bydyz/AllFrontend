/**
 * @param {number} n
 * @param {number[][]} redEdges
 * @param {number[][]} blueEdges
 * @return {number[]}
 */
// BFS求解颜色交替的最短路径
var shortestAlternatingPaths = function(n, redEdges, blueEdges) {
    // 构建邻接表，分别存储红色和蓝色边
    const graph = [new Map(), new Map()]; // 0: 红色, 1: 蓝色
    
    for (const [u, v] of redEdges) {
        if (!graph[0].has(u)) graph[0].set(u, []);
        graph[0].get(u).push(v);
    }
    
    for (const [u, v] of blueEdges) {
        if (!graph[1].has(u)) graph[1].set(u, []);
        graph[1].get(u).push(v);
    }
    
    // 初始化结果数组，-1表示不可达
    const result = new Array(n).fill(-1);
    
    // 访问数组：visited[color][node]，记录每种颜色下是否访问过该节点
    const visited = [new Set(), new Set()];
    
    // BFS队列：[node, distance, lastColor]
    const queue = [[0, 0, -1]]; // -1表示起始颜色（没有上一条边的颜色）
    
    while (queue.length > 0) {
        const [node, dist, lastColor] = queue.shift();
        
        // 首次访问该节点时记录距离（BFS保证第一次访问是最短路径）
        if (result[node] === -1) {
            result[node] = dist;
        }
        
        // 尝试两种颜色（必须与上一条边的颜色交替）
        for (let color = 0; color <= 1; color++) {
            if (color === lastColor) continue; // 颜色必须交替
            
            // 获取该颜色的邻居节点
            const neighbors = graph[color].get(node) || [];
            for (const neighbor of neighbors) {
                if (!visited[color].has(neighbor)) {
                    visited[color].add(neighbor);
                    queue.push([neighbor, dist + 1, color]);
                }
            }
        }
    }
    
    return result;
};

/*
复杂度分析：
时间复杂度：O(n + m)，其中n是节点数，m是边数。
空间复杂度：O(n + m)，用于存储图和访问记录。
*/