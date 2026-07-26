const obj = {};
const result = Reflect.set(obj, 'name', '张三');

console.log(result); // true
console.log(obj.name); // "张三"



// 设置数组元素
const arr = [1, 2, 3];
Reflect.set(arr, 1, 99);
console.log(arr); // [1, 99, 3]



// 设置Symbol属性
const sym = Symbol('description');
Reflect.set(obj, sym, 'Symbol值');
console.log(obj[sym]); // "Symbol值"