// String.fromCharCode() 是 JavaScript 中的一个静态方法，它接受一个或多个数字参数，每个数字代表一个 Unicode 码点，然后返回一个字符串，该字符串由对应的 Unicode 字符连接组成。

const str = String.fromCharCode(72, 101, 108, 108, 111);
console.log(str); // 输出: "Hello"

// 在这个例子中，72、101、108、108 和 111 分别是 "H"、"e"、"l"、"l" 和 "o" 这些字符在 Unicode 编码表中的码点。String.fromCharCode() 方法将这些码点转换成对应的字符，并将它们拼接成一个字符串。