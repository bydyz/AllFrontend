// endsWith(searchString)
// endsWith(searchString, endPosition)

// searchString
//   不能是正则表达式。
//   所有非正则表达式的值都会被强制转换为字符串
//   如果该参数被省略或传入 undefined，endsWith() 方法会在字符串中搜索 "undefined"

// endPosition 可选
//   默认为 str.length。
//   此序号 前 (不包含此序号) 若 以 searchString 结尾，返回值 为 true

// 异常
//   TypeError
//     如果 searchString 是一个正则表达式，则会抛出。



// endsWith() 方法用于判断一个字符串是否以指定字符串结尾，如果是则返回 true，否则返回 false。

// startsWith 用法同理


const str1 = "Cats are the best!";
console.log(str1.length)

console.log(str1.endsWith("best!"));
// Expected output: true

console.log(str1.endsWith("best", 17));
// Expected output: true

console.log(str1.endsWith("best", str1.length));
// Expected output: false

const str2 = "Is this a question?";

console.log(str2.endsWith("question"));
// Expected output: false