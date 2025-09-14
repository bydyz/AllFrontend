// Math.min() 函数返回作为输入参数的数字中最小的一个，如果没有参数，则返回 Infinity。



console.log(Math.min(2, 3, 1));
// Expected output: 1

console.log(Math.min(-2, -3, -1));
// Expected output: -3

const array1 = [2, 3, 1];

console.log(Math.min(...array1));
// Expected output: 1