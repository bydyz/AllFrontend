// Symbol.iterator 为每一个对象定义了默认的迭代器。该迭代器可以被 for...of 循环使用。


const iterable1 = {};

iterable1[Symbol.iterator] = function* () {
  yield 1;
  yield 2;
  yield 3;
};

console.log([...iterable1]);
// Expected output: Array [1, 2, 3]