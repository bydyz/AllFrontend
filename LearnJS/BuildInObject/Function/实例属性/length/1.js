// Function 实例的 length 数据属性表示函数期望的参数数量。


function func1() {}

function func2(a, b) {}

console.log(func1.length);
// Expected output: 0

console.log(func2.length);
// Expected output: 2