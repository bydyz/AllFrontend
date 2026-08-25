/**
 * @param {number[][]} wall
 * @return {number}
 */
var leastBricks = function(wall) {
    const seamCount = new Map(); // 记录每个缝隙位置出现的次数
    let maxSeams = 0; // 最多对齐的缝隙数
    
    // 遍历每一行砖块
    for (const row of wall) {
        let prefixSum = 0;
        // 遍历每行的所有砖块，但不包括最后一个（因为最后一个砖块的右边缘是墙的边界）
        for (let i = 0; i < row.length - 1; i++) {
            prefixSum += row[i]; // 计算当前位置的前缀和（即缝隙位置）
            seamCount.set(prefixSum, (seamCount.get(prefixSum) || 0) + 1);
            maxSeams = Math.max(maxSeams, seamCount.get(prefixSum));
        }
    }
    
    // 最小穿过的砖块数 = 总行数 - 最多对齐的缝隙数
    // 因为穿过缝隙就不算穿过砖块
    return wall.length - maxSeams;
};

/*
复杂度分析：
时间复杂度：O(n * k)，其中 n 是墙的行数，k 是每行砖块的平均数量
空间复杂度：O(n * k)，哈希表最坏情况存储所有缝隙位置
*/