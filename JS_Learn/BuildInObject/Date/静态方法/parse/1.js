// 语法
//   Date.parse(dateString)

// 参数
//   dateString
//     一个符合 RFC2822 或 ISO 8601 日期格式的字符串（其他格式也许也支持，但结果可能与预期不符）。

// 返回值
//   一个表示从 1970-1-1 00:00:00 UTC 到给定日期字符串所表示时间的毫秒数的数值。如果参数不能解析为一个有效的日期，则返回NaN。

// 描述
//   parse 方法接受一个日期字符串（例如 "Dec 25, 1995"），并返回从 1970-1-1 00:00:00 UTC 到该日期字符串所表示日期的毫秒数。
//   如果该字符串无法识别，或者一些情况下，包含了不合法的日期数值（如：2015-02-31），则返回值为 NaN。
//   不推荐在 ES5 之前使用 Date.parse 方法，因为字符串的解析完全取决于实现。直到至今，不同宿主在如何解析日期字符串上仍存在许多差异，
//     因此最好还是手动解析日期字符串（在需要适应不同格式时库能起到很大帮助）。



const unixTimeZero = Date.parse("01 Jan 1970 00:00:00 GMT");
const javaScriptRelease = Date.parse("04 Dec 1995 00:12:00 GMT");

console.log(unixTimeZero);
// Expected output: 0

console.log(javaScriptRelease);
// Expected output: 818035920000