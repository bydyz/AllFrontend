/**
 * 移除元素
 * 算法思路：双指针（快慢指针）
 * 慢指针 k 指向下一个要填充的位置，快指针 i 遍历数组
 * 当 nums[i] 不等于 val 时，将其放到 k 位置
 * @param {number[]} nums - 输入数组
 * @param {number} val - 要移除的目标值
 * @return {number} 移除后数组的新长度
 */
var removeElement = function(nums, val) {
    let k = 0;
    
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] !== val) {
            nums[k] = nums[i];
            k++;
        }
    }
    
    return k;
};

/*
复杂度分析：
时间复杂度：O(n)，遍历一次数组。
空间复杂度：O(1)，原地修改，无需额外空间。
*/