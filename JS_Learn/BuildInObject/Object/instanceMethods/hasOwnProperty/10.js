// 在支持 Object.hasOwn 的浏览器中，建议使用 Object.hasOwn()，而非 hasOwnProperty()。

const obj = {
  hasOwnProperty: 'I am not a function!'
};

// 这样调用会报错
// obj.hasOwnProperty('prop'); // TypeError: obj.hasOwnProperty is not a function

// 安全的调用方式
console.log(Object.prototype.hasOwnProperty.call(obj, 'hasOwnProperty')); // true
console.log({}.hasOwnProperty.call(obj, 'hasOwnProperty')); // true