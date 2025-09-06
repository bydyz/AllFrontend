// 在Node.js中，Buffer 对象的 toString() 方法用于将 Buffer 实例中的二进制数据转换为字符串。默认情况下，如果没有指定编码方式，toString() 方法会使用 UTF-8 编码进行转换。以下是 toString() 方法的一些使用示例和注意事项。

// 使用默认的 UTF-8 编码
// const buf = Buffer.from('hello', 'utf-8');
// console.log(buf.toString()); // 输出: "hello"


// 指定编码方式
// 除了默认的 UTF-8 编码外，toString() 方法还允许你指定其他编码方式，如 'ascii', 'utf-8', 'utf16le', 'ucs2' (同 'utf16le')，'base64', 'latin1', 'binary' 和 'hex'。

// const buf = Buffer.from([0xF0, 0x90, 0x8D, 0x88]); // 代表一个四字节的UTF-8字符
// console.log(buf.toString('hex')); // 输出: "f090898"
// console.log(buf.toString('base64')); // 输出: "zv-Pbw"


// 转换部分 Buffer 数据
// toString() 方法还可以接受两个参数：开始索引和结束索引。这两个参数定义了要转换的 Buffer 部分。

// const buf = Buffer.from('hello world', 'ascii');
// console.log(buf.toString('ascii', 0, 5)); // 输出: "hello"



// 注意事项
// 如果 Buffer 中的二进制数据不是有效的 UTF-8 编码序列，转换结果可能包含无效的字符或乱码。
// 使用 'ascii' 编码时，只有当 Buffer 仅包含 ASCII 字符（值小于 128）时，转换才是可靠的。
// 'base64' 和 'hex' 编码的 Buffer 对象不能直接使用 toString() 方法转换为可读的字符串，因为它们表示的是二进制数据的编码表示。如果你需要将它们转换为字符串，应使用对应的解码方法，如 atob() 对于 'base64' 或者手动解析对于 'hex'。
// 如果 Buffer 包含二进制数据，使用 'latin1' 编码可能会得到一个可读的字符串，但它只能正确表示扩展ASCII表中的字符。
// toString() 方法是处理 Buffer 对象和字符串之间转换的有用工具，特别是在处理文件系统和网络编程时。正确地选择编码方式对于确保数据正确性和完整性至关重要。