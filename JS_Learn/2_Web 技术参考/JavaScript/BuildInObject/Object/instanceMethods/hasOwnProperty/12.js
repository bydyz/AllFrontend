// 在支持 Object.hasOwn 的浏览器中，建议使用 Object.hasOwn()，而非 hasOwnProperty()。

const obj = Object.create(null); // 没有原型链的对象
obj.name = 'No prototype';

// 这样会报错，因为obj没有hasOwnProperty方法
// obj.hasOwnProperty('name');

// 正确的检查方式
console.log(Object.prototype.hasOwnProperty.call(obj, 'name')); // true

// 或者使用 Object.hasOwn() (ES2022+)
console.log(Object.hasOwn(obj, 'name')); // true