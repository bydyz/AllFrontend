/**
 * 爬楼梯 - 方法2：递归方案
 * 算法思路：直接按递推关系 f(n) = f(n-1) + f(n-2) 递归
 * 每次可以走 1 阶或 2 阶
 * 注意：该方法存在大量重复计算，效率较低
 * @param {number} n - 楼梯阶数
 * @return {number} 到达第 n 阶的方法数
 */
var climbStairs1 = function(n) {
  if(n === 1) return 1;
  if(n === 2) return 2;
  return climbStairs1(n-1) + climbStairs1(n-2);
}

/*
复杂度分析：
时间复杂度：O(2^n)，每次递归产生两个子问题，存在大量重复计算。
空间复杂度：O(n)，递归调用栈的深度为 n。
*/