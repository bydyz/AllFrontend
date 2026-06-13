// Math.min(value1, value2 ...)

// 作用：取小括号中数字的最小值
// 返回值：选取出来的最小值

// 如果没有参数，则返回 Infinity。



console.log(Math.min(2, 3, 1));
// Expected output: 1

console.log(Math.min(-2, -3, -1));
// Expected output: -3

const array1 = [2, 3, 1];

console.log(Math.min(...array1));
// Expected output: 1