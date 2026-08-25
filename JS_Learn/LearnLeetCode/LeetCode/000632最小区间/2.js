/**
 * 滑动窗口方法：将所有数字排序，使用窗口覆盖所有列表
 * 核心思想：维护一个窗口，使得窗口内包含每个列表的至少一个元素
 * @param {number[][]} nums
 * @return {number[]}
 */
var smallestRange = function(nums) {
    const size = nums.length;
    const indices = new Map(); // 记录每个数字属于哪些列表
    let xMin = Number.MAX_SAFE_INTEGER, xMax = Number.MIN_SAFE_INTEGER;

    // 构建数字到列表索引的映射，同时找到全局最小值和最大值
    for (let i = 0; i < size; i++) {
        for (const x of nums[i]) {
            if (!indices.has(x)) {
                indices.set(x, []);
            }
            indices.get(x).push(i);
            xMin = Math.min(xMin, x);
            xMax = Math.max(xMax, x);
        }
    }

    const freq = new Array(size).fill(0); // 记录每个列表在窗口中的元素个数
    let inside = 0; // 窗口中已覆盖的列表数量
    let left = xMin, right = xMin - 1;
    let bestLeft = xMin, bestRight = xMax;

    // 滑动窗口：扩展右边界，收缩左边界
    while (right < xMax) {
        right++;
        if (indices.has(right)) {
            // 将right位置的数字加入窗口
            for (const x of indices.get(right)) {
                freq[x]++;
                if (freq[x] === 1) {
                    inside++; // 覆盖了一个新列表
                }
            }
            
            // 当覆盖所有列表时，尝试收缩左边界
            while (inside === size) {
                if (right - left < bestRight - bestLeft) {
                    bestLeft = left;
                    bestRight = right;
                }
                // 将left位置的数字移出窗口
                if (indices.has(left)) {
                    for (const x of indices.get(left)) {
                        freq[x]--;
                        if (freq[x] === 0) {
                            inside--; // 失去了一个列表的覆盖
                        }
                    }
                }
                left++;
            }
        }
    }

    return [bestLeft, bestRight];
};

/*
复杂度分析：
时间复杂度：O(N * log N + N * k)，其中 N 是所有元素总数，k 是列表个数
空间复杂度：O(N)，存储数字到列表索引的映射
*/