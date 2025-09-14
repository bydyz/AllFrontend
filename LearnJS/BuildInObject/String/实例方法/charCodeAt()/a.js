// 在JavaScript中，charCodeAt() 方法属于 String 对象，它返回指定位置字符的 Unicode 编码（以十进制表示）。这个方法接受一个参数，即要获取 Unicode 编码的字符在字符串中的索引位置。

// 当你使用 'm'.charCodeAt() 时，你实际上是在获取字符串 'm' 中唯一字符 'm' 的 Unicode 编码。

// 示例
// const charCode = 'm'.charCodeAt();
// console.log(charCode); // 输出: 109
// 在这个例子中，'m'.charCodeAt() 返回了数字 109，因为字符 'm' 在 Unicode 编码表中的码点是 U+006D，其十进制表示就是 109。



// 关于 Unicode 编码

// Unicode 为世界上大多数的书写系统提供了一个唯一的码点。
// 码点（Code Point）是 Unicode 标准中用来表示一个字符的数值。
// 在JavaScript中，一个字符的 Unicode 码点可以通过 charCodeAt() 方法获得。



// 使用 charCodeAt() 的一些场景

// 检测字符:
// 你可以使用 charCodeAt() 来检测字符串中的特定字符。

// const isLowerCaseM = 'm'.charCodeAt() === 'M'.charCodeAt();
// console.log(isLowerCaseM); // 输出: false



// 转换为大写或小写:
// 结合 String.prototype.fromCharCode 和 charCodeAt()，可以进行大小写转换。

// const lowerCaseM = 'm'.charCodeAt();
// const upperCaseM = String.fromCharCode(lowerCaseM - 32);
// console.log(upperCaseM); // 输出: M



// 字符位置:
// 获取字符在字符串中的位置（索引）。

// const index = 'hello world'.indexOf('m');
// const charCodeAtIndex = 'hello world'.charCodeAt(index);
// console.log(charCodeAtIndex); // 输出: 109





// 注意事项
// charCodeAt() 返回的是字符的 Unicode 编码，而不是字符本身。
// 如果索引超出字符串长度，charCodeAt() 将返回 NaN。
// 对于ASCII字符，charCodeAt() 返回的值与字符的ASCII码值相同。
// charCodeAt() 是一个简单但强大的方法，它在处理字符编码、字符串比较和字符操作时非常有用。


// String 的 charCodeAt() 方法返回一个整数，表示给定索引处的 UTF-16 码元，其值介于 0 和 65535 之间。


const sentence = "The quick brown fox jumps over the lazy dog.";

const index = 4;

console.log(
  `Character code ${sentence.charCodeAt(index)} is equal to ${sentence.charAt(
    index,
  )}`,
);
// Expected output: "Character code 113 is equal to q"