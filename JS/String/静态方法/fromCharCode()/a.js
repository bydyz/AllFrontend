// String.fromCharCode() 是 JavaScript 中的一个静态方法，它接受一个或多个数字参数，每个数字代表一个 Unicode 码点，然后返回一个字符串，该字符串由对应的 Unicode 字符组成。



// 注意事项
// String.fromCharCode() 返回的是一个字符串，即使输入的是一个数字。
// 如果传递给 String.fromCharCode() 的数字不在有效的 Unicode 码点范围内（通常是 0 到 0x10FFFF），那么返回的字符串中将包含一个替代字符，通常是 Unicode 字符 ""（U+FFFD）。
// 对于 ASCII 字符（码点在 0 到 127 之间），String.fromCharCode() 返回的字符串与字符本身的 ASCII 码值相同。
// String.fromCharCode() 是一个简单但有用的方法，它允许你通过 Unicode 码点直接创建字符，这在处理字符编码、编码转换和数据解码时非常有用。



// String.fromCharCode() 静态方法返回由指定的 UTF-16 码元序列创建的字符串。


console.log(String.fromCharCode(189, 43, 190, 61));
// Expected output: "½+¾="