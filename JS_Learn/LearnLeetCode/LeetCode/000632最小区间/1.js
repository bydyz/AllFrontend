/**
 * 最小堆方法：从每个列表中取一个元素组成区间，维护最小堆
 * 核心思想：每次从堆中取出最小值，然后从该列表取下一个元素入堆，更新区间
 * @param {number[][]} nums
 * @return {number[]}
 */
var smallestRange = function(nums) {
    let rangeLeft = 0, rangeRight = Number.MAX_SAFE_INTEGER;
    const size = nums.length;
    const next = new Array(size).fill(0); // 记录每个列表当前取到的位置
    
    // 使用最小堆，存储 [列表索引, 元素值]
    const pq = new MinPriorityQueue();
    let minValue = 0, maxValue = Number.MIN_SAFE_INTEGER;

    // 初始化：将每个列表的第一个元素入堆
    for (let i = 0; i < size; ++i) {
        pq.enqueue(i, nums[i][next[i]]);
        maxValue = Math.max(maxValue, nums[i][0]); // 记录当前最大值
    }

    while (true) {
        // 取出堆顶（最小值所在列表）
        const row = pq.dequeue().element;
        minValue = nums[row][next[row]]; // 更新最小值
        
        // 如果当前区间更小，则更新结果
        if (maxValue - minValue < rangeRight - rangeLeft) {
            rangeLeft = minValue;
            rangeRight = maxValue;
        }
        
        // 如果该列表已遍历完毕，结束循环
        if (next[row] === nums[row].length - 1) {
            break;
        }
        
        // 将该列表的下一个元素入堆
        ++next[row];
        maxValue = Math.max(maxValue, nums[row][next[row]]); // 更新最大值
        pq.enqueue(row, nums[row][next[row]]);
    }

    return [rangeLeft, rangeRight];
};

/*
复杂度分析：
时间复杂度：O(N * log k)，其中 N 是所有元素总数，k 是列表个数，每次堆操作O(log k)
空间复杂度：O(k)，堆的大小为k
*/