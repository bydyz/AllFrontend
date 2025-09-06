// Object.setPrototypeOf() 静态方法可以将一个指定对象的原型（即内部的 [[Prototype]] 属性）设置为另一个对象或者 null。

const obj = {};
const parent = { foo: "bar" };

console.log(obj.foo);
// Expected output: undefined

Object.setPrototypeOf(obj, parent);

console.log(obj.foo);
// Expected output: "bar"