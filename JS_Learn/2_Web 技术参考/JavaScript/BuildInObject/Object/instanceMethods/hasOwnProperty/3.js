// 在支持 Object.hasOwn 的浏览器中，建议使用 Object.hasOwn()，而非 hasOwnProperty()。

const arrayLike = {
  0: 'first',
  1: 'second',
  length: 2
};

console.log(arrayLike.hasOwnProperty('0'));    // true
console.log(arrayLike.hasOwnProperty(0));      // true (会自动转换为字符串)
console.log(arrayLike.hasOwnProperty('length')); // true