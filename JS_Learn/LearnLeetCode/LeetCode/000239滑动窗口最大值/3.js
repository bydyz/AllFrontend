/**
 * 分块 + 前后缀最大值解法
 * 核心思想：将数组按每 k 个元素分为若干块
 * - prefixMax[i]：从块首到 i 的最大值（前缀最大值）
 * - suffixMax[i]：从 i 到块尾的最大值（后缀最大值）
 * - 任意窗口 [i, i+k-1] 跨越的最多两个块，取 suffixMax[i] 和 prefixMax[i+k-1] 的较大值即可
 */
var maxSlidingWindow = function(nums, k) {
    const n = nums.length;
    const prefixMax = new Array(n).fill(0);
    const suffixMax = new Array(n).fill(0);
    // 计算每个块从左到右的前缀最大值
    for (let i = 0; i < n; i++) {
        if (i % k === 0) {
            prefixMax[i] = nums[i];
        } else {
            prefixMax[i] = Math.max(prefixMax[i - 1], nums[i]);
        }
    }
    // 计算每个块从右到左的后缀最大值
    for (let i = n - 1; i >= 0; --i) {
        if (i === n || (i + 1) % k === 0) {
            suffixMax[i] = nums[i];
        } else {
            suffixMax[i] = Math.max(suffixMax[i + 1], nums[i]);
        }
    }
    // 每个窗口取两段的最大值
    const ans = [];
    for (let i = 0; i < n - k + 1; i++) {
        ans.push(Math.max(suffixMax[i], prefixMax[i + k - 1]));
    }
    return ans;
};

/*
复杂度分析：
时间复杂度：O(n)，预处理前后缀最大值和遍历窗口均为线性
空间复杂度：O(n)，需要两个长度为 n 的辅助数组
*/