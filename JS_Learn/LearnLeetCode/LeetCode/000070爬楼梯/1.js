/**
 * 爬楼梯 - 方法1：动态规划（空间优化）
 * 算法思路：斐波那契数列
 * f(n) = f(n-1) + f(n-2)
 * 使用滚动变量代替数组，只保留前两个状态
 * @param {number} n - 楼梯阶数
 * @return {number} 到达第 n 阶的方法数
 */
var climbStairs = function(n) {
    let p = 0, q = 0, r = 1;
    for (let i = 1; i <= n; ++i) {
        p = q;
        q = r;
        r = p + q;
    }
    return r;
};

/* 
fn  =  fn-1  +  fn-2
*/

/* 
当前的r   =   当前p       +       当前q
          =   上一个q     +       上一个r
          =   上二个r     +       上一个r
*/

/*
复杂度分析：
时间复杂度：O(n)，循环执行 n 次，每次为常数时间。
空间复杂度：O(1)，只用了常数个变量作为辅助空间。
*/