// Symbol.hasInstance 用于判断某对象是否为某构造器的实例。
// 因此你可以用它自定义 instanceof 操作符在某个类上的行为。


class Array1 {
  static [Symbol.hasInstance](instance) {
    return Array.isArray(instance);
  }
}

console.log([] instanceof Array1);
// Expected output: true

console.log(Symbol.hasInstance)
console.log(Symbol.for('Symbol.hasInstance'))
console.log(Symbol.hasInstance === Symbol.for('Symbol.hasInstance'))