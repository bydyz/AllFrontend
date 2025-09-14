// Symbol.toPrimitive 是内置的 symbol 属性，其指定了一种接受首选类型并返回对象原始值的表示的方法。
// 它被所有的强类型转换制算法优先调用。



const object1 = {
  [Symbol.toPrimitive](hint) {
    if (hint === "number") {
      return 42;
    }
    return null;
  },
};

console.log(+object1);
// Expected output: 42