// 不影响 源字符串

// split(separator)
// split(separator, limit)

// 通过 分隔符 separator，对字符串进行分割，形成数组，limit表示最多形成 limit 个元素

// 返回值：切割后的数组

const str = "The quick brown fox jumps over the lazy dog.";

const words = str.split(" ");
console.log(words)
console.log(words[3]);

const chars = str.split("");
console.log(chars)
console.log(chars[8]);

// 不传，返回值是 原数组
const strCopy = str.split();
console.log(strCopy)