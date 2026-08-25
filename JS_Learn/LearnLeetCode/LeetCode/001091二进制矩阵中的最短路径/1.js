/**
 * @param {number[][]} grid
 * @return {number}
 */
// BFS求解二进制矩阵中的最短路径
var shortestPathBinaryMatrix = function(grid) {
    const n = grid.length;
    
    // 边界情况检查：起点或终点不可通行
    if (grid[0][0] === 1 || grid[n - 1][n - 1] === 1) {
        return -1;
    }
    
    // 8个方向的移动向量
    const dirs = [
        [-1, -1], [-1, 0], [-1, 1],
        [0, -1],           [0, 1],
        [1, -1],  [1, 0],  [1, 1]
    ];
    
    // BFS初始化
    const queue = [[0, 0]]; // 队列存储坐标
    grid[0][0] = 1; // 将起点标记为已访问（同时表示不可通行）
    let distance = 1; // 路径长度
    
    while (queue.length > 0) {
        const size = queue.length;
        
        for (let i = 0; i < size; i++) {
            const [row, col] = queue.shift();
            
            // 到达终点
            if (row === n - 1 && col === n - 1) {
                return distance;
            }
            
            // 检查8个方向
            for (const [dr, dc] of dirs) {
                const nr = row + dr;
                const nc = col + dc;
                
                // 检查边界和是否可通行（值为0表示可通行）
                if (nr >= 0 && nr < n && nc >= 0 && nc < n && grid[nr][nc] === 0) {
                    grid[nr][nc] = 1; // 标记为已访问
                    queue.push([nr, nc]);
                }
            }
        }
        
        distance++; // 层数增加
    }
    
    return -1; // 无法到达终点
};

/*
复杂度分析：
时间复杂度：O(n^2)，每个格子最多访问一次。
空间复杂度：O(n^2)，队列最多存储O(n^2)个元素。
*/