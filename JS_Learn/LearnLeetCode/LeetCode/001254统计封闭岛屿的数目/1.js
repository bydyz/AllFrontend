/**
 * @param {number[][]} grid
 * @return {number}
 */
// DFS统计封闭岛屿的数目
var closedIsland = function(grid) {
    const m = grid.length;
    const n = grid[0].length;
    
    // DFS函数：判断从(i,j)开始的岛屿是否是封闭岛屿
    function dfs(i, j) {
        // 如果超出边界，说明该岛屿与边界相连，不是封闭岛屿
        if (i < 0 || i >= m || j < 0 || j >= n) {
            return false;
        }
        
        // 如果是水（1），返回 true（水不影响封闭岛屿判断）
        if (grid[i][j] === 1) {
            return true;
        }
        
        // 标记访问过的陆地（避免重复访问，同时将陆地变为水）
        grid[i][j] = 1;
        
        // 递归检查四个方向
        const up = dfs(i - 1, j);
        const down = dfs(i + 1, j);
        const left = dfs(i, j - 1);
        const right = dfs(i, j + 1);
        
        // 只有四个方向都是水或封闭岛屿，当前岛屿才是封闭的
        return up && down && left && right;
    }
    
    let count = 0;
    
    // 遍历所有陆地
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (grid[i][j] === 0) {
                // 如果当前岛屿是封闭岛屿，计数加一
                if (dfs(i, j)) {
                    count++;
                }
            }
        }
    }
    
    return count;
};

/*
复杂度分析：
时间复杂度：O(m * n)，每个格子最多访问一次。
空间复杂度：O(m * n)，最坏情况下递归栈的深度。
*/