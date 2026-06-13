// [Symbol.toPrimitive]() 方法可将 Symbol 对象转换为 symbol 值。


const sym = Symbol("example");
sym === sym[Symbol.toPrimitive](); // true