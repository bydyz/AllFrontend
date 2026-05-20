// Symbol.match 指定了匹配的是正则表达式而不是字符串。String.prototype.match() 方法会调用此函数。


// startsWith  endsWith  的传参不能为正则
// regexp1[Symbol.match] = false;  之后  会禁用匹配行为  然后可以用作参数

const regexp1 = /foo/;

// console.log('/foo/'.startsWith(regexp1));
// Expected output (Chrome): Error: First argument to String.prototype.startsWith must not be a regular expression
// Expected output (Firefox): Error: Invalid type: first can't be a Regular Expression
// Expected output (Safari): Error: Argument to String.prototype.startsWith cannot be a RegExp

regexp1[Symbol.match] = false;

console.log("/foo/".startsWith(regexp1));
// Expected output: true

console.log("/baz/".endsWith(regexp1));
// Expected output: false