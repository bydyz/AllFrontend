/**
 * @param {string[]} deadends
 * @param {string} target
 * @return {number}
 */
// BFS求解最短路径问题：从"0000"到target的最少旋转次数
var openLock = function(deadends, target) {
    const dead = new Set(deadends); // 死亡数字集合
    const visited = new Set(); // 已访问的状态
    
    // 边界情况检查
    if (dead.has("0000")) return -1; // 起始状态就是死亡数字
    if (target === "0000") return 0; // 目标就是起始状态
    
    // 生成当前状态的8个相邻状态（每个位置可以向上或向下旋转）
    function getNeighbors(state) {
        const neighbors = [];
        const arr = state.split('');
        
        for (let i = 0; i < 4; i++) {
            const original = arr[i];
            
            // 向上旋转（9变为0）
            arr[i] = original === '9' ? '0' : String.fromCharCode(original.charCodeAt(0) + 1);
            neighbors.push(arr.join(''));
            
            // 向下旋转（0变为9）
            arr[i] = original === '0' ? '9' : String.fromCharCode(original.charCodeAt(0) - 1);
            neighbors.push(arr.join(''));
            
            arr[i] = original; // 恢复原状，准备处理下一个位置
        }
        
        return neighbors;
    }
    
    // BFS广度优先搜索
    const queue = ["0000"];
    visited.add("0000");
    let steps = 0;
    
    while (queue.length > 0) {
        const size = queue.length;
        
        for (let i = 0; i < size; i++) {
            const current = queue.shift();
            
            if (current === target) return steps; // 找到目标
            
            // 遍历所有相邻状态
            for (const neighbor of getNeighbors(current)) {
                if (!dead.has(neighbor) && !visited.has(neighbor)) {
                    visited.add(neighbor);
                    queue.push(neighbor);
                }
            }
        }
        
        steps++; // 增加步数
    }
    
    return -1; // 无法到达目标
};

/*
复杂度分析：
时间复杂度：O(10^4)，每个状态有8个相邻状态，最多有10^4个状态（0000-9999）。
空间复杂度：O(10^4)，用于存储访问过的状态和队列。
*/