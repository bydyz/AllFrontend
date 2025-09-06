
// 已被弃用
// const bufferOne = new Buffer("why")
// console.log(bufferOne)



// 在Node.js中，Buffer是一个全局对象  可以直接使用
// 原理：将 "why" 转换成 16 进制，然后将16进制数存储进Buffer
const bufferTwo = Buffer.from("why")

console.log(bufferTwo)          // <Buffer 77 68 79>  数字是16进制

console.log(bufferTwo.toString())









// Buffer.from() 方法可以接受多种类型的参数来创建一个新的 Buffer 实例。以下是 Buffer.from() 方法可以接受的参数类型及其说明：

// 字符串 (String):
// 如果参数是一个字符串，Buffer.from() 会创建一个包含该字符串字符的 Buffer 实例。默认情况下，字符串会以 UTF-8 编码方式被转换为二进制数据。

// const buf = Buffer.from('hello');


// 数组 (Array):
// 如果参数是一个包含数字的数组，Buffer.from() 会创建一个 Buffer 实例，其中每个数字都是数组中的一个元素，代表一个8位字节。

// const buf = Buffer.from([72, 101, 108, 108, 111]); // "hello"


// Buffer (另一个Buffer实例):
// 如果参数是一个 Buffer 实例，Buffer.from() 会创建一个新的 Buffer 实例，它是原始 Buffer 的一个副本。

// const oldBuffer = Buffer.from('hello');
// const newBuffer = Buffer.from(oldBuffer);


// 数组缓冲区 (ArrayBuffer):
// 如果参数是一个 ArrayBuffer 实例，Buffer.from() 会创建一个 Buffer 实例，它包含 ArrayBuffer 的数据。

// const arr = new Uint8Array(2);
// arr.set([0x01, 0x02]);
// const buf = Buffer.from(arr.buffer);


// 共享数组缓冲区 (SharedArrayBuffer):
// 与 ArrayBuffer 类似，SharedArrayBuffer 也可以作为参数。

// 可读流 (Readable Stream):
// 如果参数是一个可读流，Buffer.from() 会返回一个Promise，该Promise在流的数据被消费并转换为Buffer后解决。

// const fs = require('fs');
// fs.createReadStream('file.txt').then(stream => {
//   return Buffer.from(stream);
// }).then(buffer => {
//   // 使用buffer
// });


// 对象 (Object):
// 如果参数是一个包含 buffer 属性或 value 属性的对象，Buffer.from() 会使用该属性的值来创建 Buffer。

// const obj = { buffer: 'test' };
// const buf = Buffer.from(obj);


// 十六进制字符串 (Hex String):
// 如果字符串参数以 0x 开头，Node.js 会尝试将其作为十六进制字符串解析。

// const buf = Buffer.from('0x7468697320697320612074c3f6e6f74696669207468652077616c6b686f70617465');
// "this is a tl;dr version of the buffer from the hex string"




// 编码 (Encoding):
// Buffer.from() 还可以接受一个可选的第二个参数，表示字符串的编码方式。

// const buf = Buffer.from('hello', 'ascii');

// 注意事项
// 当从包含二进制数据的字符串创建 Buffer 时，你需要指定正确的编码方式，否则可能会得到错误的结果。
// Buffer.from() 方法在处理数组或 ArrayBuffer 时，不会修改原始数据，而是创建一个新的 Buffer 实例，其中包含了原始数据的副本。
// 使用 Buffer.from() 创建的 Buffer 实例是不可变的，这意味着一旦创建，你不能改变它的内容。如果你需要一个可变的二进制数组，可以使用 Buffer.allocUnsafe() 方法。
// Buffer.from() 是处理二进制数据时非常有用的工具，它提供了一种灵活的方式来创建 Buffer 实例。












// Buffer.from() 方法的第二个参数是可选的，它指定了第一个参数（如果是一个字符串）的字符编码。这个参数告诉 Node.js 如何将字符串转换成二进制数据。以下是 Buffer.from() 方法可以接受的第二个参数的值：

// 'ascii':
// 仅支持7位ASCII字符，也就是标准的ASCII码表中的前128个字符。如果字符串包含大于127的字符，那么它们将被替换为?。

// const buf = Buffer.from('hello', 'ascii');


// 'utf8':
// 默认的编码方式，用于表示Unicode字符。它可以表示世界上大多数语言的字符，并且是网页内容的标准编码方式。

// const buf = Buffer.from('hello', 'utf8');


// 'utf16le':
// 小端序的UTF-16编码。UTF-16是一个可以表示全部Unicode字符的字符编码，每个字符由两个字节组成。

// const buf = Buffer.from('hello', 'utf16le');


// 'ucs2':
// 别名为'utf16le'，因为JavaScript中的字符是在2字节的 UCS-2 编码下处理的。

// const buf = Buffer.from('hello', 'ucs2');


// 'base64':
// Base64编码，这是一种用64个字符表示任意二进制数据的方法，常用于在文本格式中表示二进制数据。

// const buf = Buffer.from('SGVsbG8gV29ybGQ=', 'base64');


// 'latin1' (也称为 'iso-8859-1' 或 'binary'):
// 用于编码8位的可打印字符，可以表示256个字符。

// const buf = Buffer.from('hello', 'latin1');


// 'hex':
// 将字符串作为十六进制序列解析，每个字符表示半字节（4位），字符串长度必须为偶数。

// const buf = Buffer.from('68656c6c6f', 'hex');


// 'base64url':
// Base64URL编码，这是Base64编码的一个变体，它使用URL安全的字符集。

// const buf = Buffer.from('SGVsbG8gV29ybGQ', 'base64url');

// 注意事项
// 如果第一个参数不是字符串，第二个参数将被忽略。
// 如果字符串包含无效的字符编码，Buffer.from() 将抛出异常。
// 使用正确的编码对于正确地表示和解析字符串非常重要，错误的编码可能导致数据丢失或不正确的解释。
// 在大多数情况下，默认的 'utf8' 编码已经足够使用，因为它能够处理大多数字符，并且与网页内容的标准编码兼容。其他编码方式通常用于特定的场景，比如处理二进制数据或与旧系统交互。