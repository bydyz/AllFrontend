// 递归方案

var climbStairs1 = function(n) {
  if(n === 1) {
    return 1
  }
  if(n === 2) {
    return 2
  }
  return climbStairs1(n-1) + climbStairs1(n-2)
}

console.log(climbStairs1(20))