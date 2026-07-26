// 判断  两个集合  是否存在 公共元素

// 没有  返回 true；否则返回 false


const primes = new Set([2, 3, 5, 7, 11, 13, 17, 19]);
const squares = new Set([1, 4, 9, 16]);
console.log(primes.isDisjointFrom(squares)); // true