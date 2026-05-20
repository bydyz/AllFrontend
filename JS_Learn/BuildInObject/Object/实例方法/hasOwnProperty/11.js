// 在支持 Object.hasOwn 的浏览器中，建议使用 Object.hasOwn()，而非 hasOwnProperty()。

const array = [1, 2, 3];
const string = 'hello';

console.log(Object.prototype.hasOwnProperty.call(array, 'length')); // true
console.log(Object.prototype.hasOwnProperty.call(array, 0));        // true
console.log(Object.prototype.hasOwnProperty.call(string, 'length')); // true
console.log(Object.prototype.hasOwnProperty.call(string, 0));        // false