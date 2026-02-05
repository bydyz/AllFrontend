// 这个不影响原本的数组！！！

// 作用：仅仅去除  字符串前面  和  字符串后面  的空格，不包含  字符串内部的空格
// 返回值：去除空格后的字符串

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