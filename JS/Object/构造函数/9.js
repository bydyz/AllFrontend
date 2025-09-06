// 使用 new Object() 创建带有原型的对象
const prototypeObj = { greeting: "Hello" };
const objWithProto = new Object(prototypeObj);
objWithProto.name = "World";

console.log(objWithProto.greeting); // "Hello" (从原型继承)
console.log(objWithProto.name);     // "World" (自身属性)