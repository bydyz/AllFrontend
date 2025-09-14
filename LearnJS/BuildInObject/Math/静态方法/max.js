// Math.max() 函数返回作为输入参数的最大数字，如果没有参数，则返回 -Infinity。



console.log(Math.max(1, 3, 2));
// Expected output: 3

console.log(Math.max(-1, -3, -2));
// Expected output: -1

const array1 = [1, 3, 2];

console.log(Math.max(...array1));
// Expected output: 3