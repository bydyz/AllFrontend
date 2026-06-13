// 语法
//   bigIntObj.toString([radix])


// 参数
//   radix 可选
//     可选，介于 2 到 36 之间的整数，指定用于表示数值的基数。


// 返回值
//   表示指定 BigInt 对象的字符串。


// 异常
//   RangeError
//     如果 toString() 的基数小于 2 或大于 36, 则抛出 RangeError。


// 描述
//   toString() 方法返回一个字符串，表示指定 BigInt 对象。后面的 "n" 不是字符串的一部分。

//   BigInt 对象重写 Object 对象的 toString() 方法；它不继承 Object.prototype.toString()。
//   对于 BigInt 对象，toString() 方法返回指定基数中对象的字符串表示形式。

//   toString() 方法解析其第一个参数，并尝试返回指定基数 (base) 的字符串表示形式。对于大于 10 的参数，使用字母表中的字母表示大于 9 的数字。
//   例如，对于十六进制数（以 16 为基数），使用 a 到 f。

//   如果未指定基数，则假定首选基数为 10。

//   如果 bigIntObj 为负，则保留符号。即使基数是 2，情况也是如此；返回的字符串是 bigIntObj 的正二进制表示，前面是一个 - 符号，而不是 bigIntObj 的两个补码。



console.log(1024n.toString());
// Expected output: "1024"

console.log(1024n.toString(2));
// Expected output: "10000000000"

console.log(1024n.toString(16));
// Expected output: "400"