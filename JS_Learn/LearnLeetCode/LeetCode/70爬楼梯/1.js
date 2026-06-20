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


// 复杂度分析
// 时间复杂度：循环执行 n 次，每次花费常数的时间代价，故渐进时间复杂度为 O(n)。
// 空间复杂度：这里只用了常数个变量作为辅助空间，故渐进空间复杂度为 O(1)。
