/**
 * 单调递减双端队列解法
 * 核心思想：维护一个下标组成的双端队列 q，队列对应的 nums 值单调递减
 * - 新元素入队前，移除队尾所有小于它的元素（它们不可能成为后续窗口的最大值）
 * - 队首始终是当前窗口的最大值
 * - 滑动时检查队首是否已滑出窗口（下标 <= i - k）
 */
var maxSlidingWindow = function(nums, k) {
    const n = nums.length;
    const q = [];
    // 初始化前 k 个元素的单调队列
    for (let i = 0; i < k; i++) {
        while (q.length && nums[i] >= nums[q[q.length - 1]]) {
            q.pop();
        }
        q.push(i);
    }

    const ans = [nums[q[0]]];
    for (let i = k; i < n; i++) {
        // 新元素入队：移除队尾所有比它小的元素
        while (q.length && nums[i] >= nums[q[q.length - 1]]) {
            q.pop();
        }
        q.push(i);
        // 移除已滑出窗口的队首元素
        while (q[0] <= i - k) {
            q.shift();
        }
        ans.push(nums[q[0]]);
    }
    return ans;
};

/*
复杂度分析：
时间复杂度：O(n)，每个元素最多入队和出队各一次
空间复杂度：O(k)，双端队列最多存储 k 个元素
*/