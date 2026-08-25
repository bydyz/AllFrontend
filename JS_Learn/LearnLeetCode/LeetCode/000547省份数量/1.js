/**
 * @param {number[][]} isConnected
 * @return {number}
 */
var findCircleNum = function(isConnected) {
    const n = isConnected.length;
    const visited = new Array(n).fill(false); // 标记城市是否已访问
    let provinces = 0; // 省份数量
    
    // 深度优先搜索：遍历与当前城市相连的所有城市
    function dfs(city) {
        visited[city] = true;
        
        // 检查所有与当前城市相连的城市
        for (let next = 0; next < n; next++) {
            // 如果城市相连且未访问，则递归访问
            if (isConnected[city][next] === 1 && !visited[next]) {
                dfs(next);
            }
        }
    }
    
    // 遍历每个城市，计算连通分量数
    for (let i = 0; i < n; i++) {
        if (!visited[i]) {
            provinces++; // 发现新的省份
            dfs(i); // 标记该省份所有相连城市
        }
    }
    
    return provinces;
};

/*
复杂度分析：
时间复杂度：O(n²)，需要遍历邻接矩阵的每个元素
空间复杂度：O(n)，visited数组的空间，递归栈最坏情况O(n)
*/