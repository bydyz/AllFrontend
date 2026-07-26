// Symbol 值的 valueOf() 方法会返回该符号（symbol）的值。


const symbol1 = Symbol("foo");

console.log(typeof Object(symbol1));
// Expected output: "object"

console.log(typeof Object(symbol1).valueOf());
// Expected output: "symbol"