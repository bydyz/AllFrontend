// String 的 trim() 方法会从字符串的两端移除空白字符，并返回一个新的字符串，而不会修改原始字符串。

// 要返回一个仅从一端修剪空白字符的新字符串，请使用 trimStart() 或 trimEnd()。



const greeting = "   Hello world!   ";

console.log(greeting.trim());
// Expected output: "Hello world!";

console.log(greeting);
// Expected output: "   Hello world!   ";





console.log(greeting.trimStart());
// Expected output: "Hello world!   ";

console.log(greeting);
// Expected output: "   Hello world!   ";





console.log(greeting.trimEnd());
// Expected output: "   Hello world!";

console.log(greeting);
// Expected output: "   Hello world!   ";