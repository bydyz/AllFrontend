// Object.getOwnPropertyNames() 静态方法返回一个数组，
// 其包含给定对象中所有自有属性（包括不可枚举属性，但不包括使用 symbol 值作为名称的属性）。


const object1 = {
  a: 1,
  b: 2,
  c: 3,
};

console.log(Object.getOwnPropertyNames(object1));
// Expected output: Array ["a", "b", "c"]