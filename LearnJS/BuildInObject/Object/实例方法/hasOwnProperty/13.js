// 在支持 Object.hasOwn 的浏览器中，建议使用 Object.hasOwn()，而非 hasOwnProperty()。

const obj = {};
Object.defineProperty(obj, 'hidden', {
  value: 'I am hidden',
  enumerable: false
});

console.log(obj.hasOwnProperty('hidden')); // true
console.log(Object.keys(obj)); // [] (空数组，因为属性不可枚举)