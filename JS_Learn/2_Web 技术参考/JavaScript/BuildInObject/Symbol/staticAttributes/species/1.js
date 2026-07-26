// 知名的 Symbol.species 是个函数值属性，其被构造函数用以创建派生对象。


class Array1 extends Array {
  static get [Symbol.species]() {
    return Array;
  }
}

const a = new Array1(1, 2, 3);
console.log(a)
const mapped = a.map((x) => x * x);
console.log(mapped)

console.log(mapped instanceof Array1);
// Expected output: false

console.log(mapped instanceof Array);
// Expected output: true