// func[Symbol.hasInstance](value)

// 如果 func.prototype 在 value 的原型链中，则返回 true，否则返回 false；
// 如果 value 不是一个对象或 this 不是一个函数，则始终返回 false。
// 如果 this 是一个绑定函数，则返回对 value 和底层目标函数进行 instanceof 测试的结果。

// TypeError
// 如果 this 不是绑定函数且 this.prototype 不是对象，则会抛出此异常。

class Foo {}
const foo = new Foo();
console.log(foo instanceof Foo === Foo[Symbol.hasInstance](foo)); // true