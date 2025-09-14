// 构造函数 的 prototype属性，即是实例的原型

// 并不是所有的 Function 对象都拥有 prototype 属性——参见描述。

function Ctor() {}
const inst = new Ctor();
console.log(Object.getPrototypeOf(inst) === Ctor.prototype); // true