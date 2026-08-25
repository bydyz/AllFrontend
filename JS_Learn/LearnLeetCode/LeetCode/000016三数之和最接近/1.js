/**
 * 三数之和最接近
 * 算法思路：排序 + 双指针
 * 先对数组排序，固定一个数，用双指针在剩余区间内寻找最接近目标的组合
 * 根据当前和与目标值的关系移动指针，可以高效缩小搜索范围
 * @param {number[]} nums - 输入数组
 * @param {number} target - 目标值
 * @return {number} 最接近目标值的三数之和
 */
var threeSumClosest = function(nums, target) {
    // 排序数组，为双指针做准备
    nums.sort((a, b) => a - b);
    let closestSum = nums[0] + nums[1] + nums[2];

    // 遍历数组，固定第一个数 nums[i]
    for (let i = 0; i < nums.length - 2; i++) {
        let left = i + 1;
        let right = nums.length - 1;

        while (left < right) {
            const currentSum = nums[i] + nums[left] + nums[right];

            // 更新最接近的和
            if (Math.abs(currentSum - target) < Math.abs(closestSum - target)) {
                closestSum = currentSum;
            }

            // 根据当前和与目标值的关系移动指针
            if (currentSum < target) {
                left++;
            } else if (currentSum > target) {
                right--;
            } else {
                // 完美匹配，直接返回
                return currentSum;
            }
        }
    }

    return closestSum;
};

/*
复杂度分析：
时间复杂度：O(n²)，排序 O(nlogn) + 双指针遍历 O(n²)。
空间复杂度：O(logn)，排序使用的递归栈空间。
*/