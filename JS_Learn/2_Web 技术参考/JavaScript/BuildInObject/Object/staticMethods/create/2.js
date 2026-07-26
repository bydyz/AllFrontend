//! 1. 使用 null 原型：没有继承的属性   故 descriptor 是 原型链为 null 的对象 { value: 'static' }
const descriptor = Object.create(null);
descriptor.value = "static";
console.log(descriptor)         // [Object: null prototype] { value: 'static' }