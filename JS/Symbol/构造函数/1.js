// Symbol() 构造函数返回一个 symbol 类型的值，
// 不支持 new Symbol() 语法，也无法被子类化。
// 可以作为 class 定义中 extends 子句的值使用，但对它进行 super 调用将会导致异常。


// Symbol()
// Symbol(description)

// description 可选
//   一个字符串，用来表示 symbol 的描述，可以用于调试，但不能直接访问 symbol 自身。

// Symbol() 只能在没有 new 的情况下调用，尝试用 new 构造会抛出 TypeError。


const symbol1 = Symbol();
const symbol2 = Symbol(42);
const symbol3 = Symbol("foo");

console.log(typeof symbol1);
// Expected output: "symbol"

console.log(symbol2 === 42);
// Expected output: false

console.log(symbol3.toString());
// Expected output: "Symbol(foo)"

console.log(Symbol("foo") === Symbol("foo"));
// Expected output: false