// 从十六进制字符串创建字符串
// String.fromCharCode() 也可以用来从十六进制字符串创建字符串。

const hexStr = '48656c6c6f';
const str = String.fromCharCode(...hexStr.match(/.{1,2}/g));
console.log(str); // 输出: "Hello"

// 这里，我们首先将十六进制字符串分割成每两个字符一组的数组，然后使用扩展运算符将每个十六进制数值作为独立参数传递给 String.fromCharCode()。