// 在支持 Object.hasOwn 的浏览器中，建议使用 Object.hasOwn()，而非 hasOwnProperty()。

const obj = { name: 'John' };

// 传统方式
console.log(Object.prototype.hasOwnProperty.call(obj, 'name')); // true

// 现代方式 (ES2022+)
console.log(Object.hasOwn(obj, 'name')); // true

// 对于没有原型的对象也安全
const noProtoObj = Object.create(null);
noProtoObj.value = 'test';
console.log(Object.hasOwn(noProtoObj, 'value')); // true