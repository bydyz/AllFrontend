// Symbol.for(key) 方法会根据给定的键 key，来从运行时的 symbol 注册表中找到对应的 symbol，
// 如果找到了，则返回它，
// 否则，新建一个与该键关联的 symbol，并放入全局 symbol 注册表中。


// Symbol.for(key);


// 参数
//   key
//     一个字符串，作为 symbol 注册表中与某 symbol 关联的键（同时也会作为该 symbol 的描述）。

// 返回值
//   返回由给定的 key 找到的 symbol，否则就是返回新创建的 symbol。



Symbol.for("foo"); // 创建一个 symbol 并放入 symbol 注册表中，键为 "foo"
Symbol.for("foo"); // 从 symbol 注册表中读取键为"foo"的 symbol

Symbol.for("bar") === Symbol.for("bar"); // true，证明了上面说的
Symbol("bar") === Symbol("bar"); // false，Symbol() 函数每次都会返回新的一个 symbol

var sym = Symbol.for("mario");
sym.toString();
// "Symbol(mario)"，mario 既是该 symbol 在 symbol 注册表中的键名，又是该 symbol 自身的描述字符串