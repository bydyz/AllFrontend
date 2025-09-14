// Boolean 对象覆盖了 Object 对象的 toString 方法。并没有继承 Object.prototype.toString()。

// 对于 Boolean 对象或值，内置的 toString 方法返回字符串 "true" 或 "false"，具体返回哪个取决于布尔对象的值。


const flag1 = new Boolean(true);

console.log(flag1.toString());
// Expected output: "true"

const flag2 = new Boolean(1);

console.log(flag2.toString());
// Expected output: "true"


// 当一个 Boolean 对象作为文本值或进行字符串连接时，JavaScript 会自动调用其 toString 方法。
console.log('connect ' + new Boolean('666'))
// Expected output: "connect true"