// String() 构造函数创建 String 对象。

// 当作为函数调用时，它返回 String 类型的原始值。


const a = new String("Hello world"); // a === "Hello world" 为 false
const b = String("Hello world"); // b === "Hello world" 为 true
a instanceof String; // 为 true
b instanceof String; // 为 false
typeof a; // "object"
typeof b; // "string"