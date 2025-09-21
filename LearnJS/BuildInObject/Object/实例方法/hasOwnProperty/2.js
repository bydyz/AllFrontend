// 在支持 Object.hasOwn 的浏览器中，建议使用 Object.hasOwn()，而非 hasOwnProperty()。

const sym = Symbol('description');
const obj = {
  [sym]: 'symbol value',
  normal: 'normal value'
};

console.log(obj.hasOwnProperty(sym));      // true
console.log(obj.hasOwnProperty('normal')); // true