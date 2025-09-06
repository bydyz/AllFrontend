// search(regexp)

// 参数
//  regexp
//  一个正则表达式对象，或者具有 Symbol.search 方法的任意对象。

//  如果 regexp 不是 RegExp 对象，并且不具有 Symbol.search 方法，则会使用 new RegExp(regexp) 将其隐式转换为 RegExp。

// 返回值
//  如果匹配成功，则返回正则表达式在字符串中首次匹配的索引；否则，返回 -1。


// search() 方法用于在 String 对象中执行正则表达式的搜索，寻找匹配项。


const paragraph = "I think Ruth's dog is cuter than your dog!";
console.log(paragraph.length)

// Anything not a word character, whitespace or apostrophe
const regex = /[^\w\s']/g;

console.log(paragraph.search(regex));
// Expected output: 41

console.log(paragraph[paragraph.search(regex)]);
// Expected output: "!"