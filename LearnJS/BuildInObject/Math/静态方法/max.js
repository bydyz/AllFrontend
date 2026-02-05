// Math.max(value1, value2 ... )

// 作用：取 value1, value2 ... 的最大值
// 返回值：选取出来的最大值

// 如果没有参数，则返回 -Infinity。



console.log(Math.max(1, 3, 2));
// Expected output: 3

console.log(Math.max(-1, -3, -2));
// Expected output: -1

const array1 = [1, 3, 2];

console.log(Math.max(...array1));
// Expected output: 3