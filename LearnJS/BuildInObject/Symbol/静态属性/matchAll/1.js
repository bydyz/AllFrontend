// Symbol.matchAll 内置通用（well-known）符号指定方法返回一个迭代器，该迭代器根据字符串生成正则表达式的匹配项。
// 此函数可以被 String.prototype.matchAll() 方法调用。


const re = /[0-9]+/g;
const str = "2016-01-02|2019-03-07";
const result = re[Symbol.matchAll](str);

console.log(Array.from(result, (x) => x[0]));
// Expected output: Array ["2016", "01", "02", "2019", "03", "07"]