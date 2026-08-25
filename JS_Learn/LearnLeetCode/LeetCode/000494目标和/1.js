/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var findTargetSumWays = function(nums, target) {
    const totalSum = nums.reduce((a, b) => a + b, 0);
    
    // 边界情况检查：
    // 1. 总和小于目标值，不可能达到
    // 2. (总和-目标)必须是偶数，否则无法平分
    if (totalSum < target || (totalSum - target) % 2 !== 0) {
        return 0;
    }
    
    // 核心思路：将问题转化为子集和问题
    // 设正数子集和为P，负数子集和为N，则：
    // P + N = totalSum, P - N = target
    // 解得 P = (totalSum + target) / 2
    // 等价于：找和为 (totalSum - target) / 2 的子集数量
    const subsetSum = (totalSum - target) / 2;
    
    // 动态规划数组：dp[j] 表示和为 j 的子集数量
    const dp = new Array(subsetSum + 1).fill(0);
    dp[0] = 1; // 空集的和为0，有一种方式
    
    // 遍历每个数字，更新dp数组
    for (const num of nums) {
        // 从后向前遍历，避免同一个数字被重复使用
        for (let j = subsetSum; j >= num; j--) {
            dp[j] += dp[j - num];
        }
    }
    
    return dp[subsetSum];
};

/*
复杂度分析：
时间复杂度：O(n * subsetSum)，其中 n 是数组长度，subsetSum 是目标子集和
空间复杂度：O(subsetSum)，dp数组的空间
*/