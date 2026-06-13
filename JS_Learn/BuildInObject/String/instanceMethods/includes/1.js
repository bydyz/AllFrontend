// includes(searchString)
// includes(searchString, position)

// 参数
//   searchString
//     不能是正则表达式。
//     所有非正则表达式的值都会被强制转换为字符串，
//     参数被省略或传入 undefined，includes() 方法会在字符串中搜索 "undefined"

//   position 可选
//     默认值为 0。找到返回 true，否则返回 false。

// 异常
//   TypeError
//   如果 searchString 是一个正则表达式，则会抛出。



// String 值的 includes() 方法执行 区分大小写 的搜索，以确定是否可以在一个字符串中找到另一个字符串，并根据情况返回 true 或 false。



const sentence = "The quick brown fox jumps over the lazy dog.";

const word = "fox";

console.log(sentence.includes(word));   // true