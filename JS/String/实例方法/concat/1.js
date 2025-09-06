// concat(str1)
// concat(str1, str2)
// concat(str1, str2, /* …, */ strN)

// 参数
//   str1、……、strN
//     要连接到 str 的一个或多个字符串。尽管技术上允许，但不带参数地调用 String.prototype.concat() 毫无意义，因为它不会（像 Array.prototype.concat()）返回可观察的拷贝——字符串是不可变的。仅当你将一个字符串数组作为参数展开，并且该数组恰好为空时，才应该发生这种情况。

// 返回值
//   一个包含所提供的多个字符串文本组合的新字符串。


// String 值的 concat() 方法将字符串参数连接到调用的字符串上，并返回一个新的字符串。


const str1 = "Hello";
const str2 = "World";

console.log(str1.concat(" ", str2, ", my name is rc"));
console.log(str1)
console.log(str2)

console.log(str2.concat(", ", str1));
console.log(str1)
console.log(str2)