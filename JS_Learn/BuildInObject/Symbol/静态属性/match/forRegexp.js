
// 默认行为
// 正常情况下，正则表达式对象有 Symbol.match 方法，用于处理 String.prototype.match() 调用：

// 当设置 regexp1[Symbol.match] = false 时，会 禁用匹配行为

const regexp1 = /foo/;
console.log('foo bar'.match(regexp1)); // ["foo"]

// 默认的 Symbol.match 方法存在
console.log(regexp1[Symbol.match]); // ƒ [Symbol.match]() { [native code] }