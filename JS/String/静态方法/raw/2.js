console.log(String.raw`Hi\n${2 + 3}!`);
// 'Hi\n5!'，'Hi' 后面的字符不是换行符，'\' 和 'n' 是两个不同的字符。

String.raw`Hi\u000A!`;
// 'Hi\\u000A!'，同上，这里得到的会是 \、u、0、0、0、A，6 个字符。
// 任何类型的转义形式都会失效，保留原样输出。
// 你可以通过检查 string 的 .length 属性来确认这一点。

const name = "Bob";
String.raw`Hi\n${name}!`;
// 'Hi\\nBob!'，内插表达式还可以正常替换。

String.raw`Hi \${name}!`;
// 'Hi \\${name}!'，美元符号被转义；这里没有插值。