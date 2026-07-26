

// 原型链
function Person(name, age) {
  this.name = name
  this.age = age
}
Person.prototype.sayHi = function() { console.log("hello world") } 

console.log("构造函数的prototype", Person.prototype)
console.log("构造函数的__proto__", [Person.__proto__])

console.log("---------------------------------")

let personOne = new Person("rc", 26)

console.log("实例的prototype", [personOne.prototype])
console.log("实例的__proto__", personOne.__proto__)

console.log("---------------------------------")

// 结果为true   说明 实例的__proto__ 指向 构造函数的prototype
console.log("比对   实例的__proto__   和   构造函数的prototype", personOne.__proto__ === Person.prototype)

// 在 JS 内所有的 Object 数据类型都是属于 Object 这个内置构造函数的实例
// 结果为true   说明 构造函数的的prototype__proto__ 指向 内置构造函数Object的prototype
console.log("比对 构造函数的prototype的__proto__   和   内置构造函数Object的prototype", Person.prototype.__proto__ === Object.prototype)

// 在 JS 内, 所有的函数都是属于内置构造函数 Function 的实例
// 结果为true   说明 构造函数的的prototype__proto__ 指向 内置构造函数Object的prototype
console.log("比对 构造函数的__proto__   和   内置构造函数Function的prototype", Person.__proto__ === Function.prototype)

// Object.prototype 在 JS 内叫做 顶级原型 , 不再有 __proto__ 了     故 Object.prototype 的 __proto__ 指向 null
console.log("Object.prototype.__proto__", Object.prototype.__proto__)

// Object 是一个内置构造函数, 同时也是一个函数, 同时也是一个对象      Object 也是 Function 的实例
console.log("比对Object的__proto__和Function的prototype", Object.__proto__ === Function.prototype)

// Function.prototype 也是一个对象数据类型        Function.prototype 的 __proto__ 指向 Object.prototype
console.log("比对Function.prototype.__proto__和Object.prototype", Function.prototype.__proto__ === Object.prototype)

// Function 是一个内置构造函数, 也是一个函数
// Function 自己是自己的构造函数     Function 自己是自己的实例对象     Function 所属的构造函数的是 Function
console.log("比对Function.__proto__和Function.prototype", Function.__proto__ === Function.prototype)


let commonObject = {a: true}

console.log("普通对象的prototype", commonObject.prototype)
console.log("普通对象的__proto__", commonObject.__proto__)
console.log("普通对象的__proto__   和    Object.prototype", commonObject.__proto__ === Object.prototype)


let myObject = new Object();
// 向对象添加属性
myObject.name = "John";
myObject.age = 25;

console.log("用new Object新建的对象的prototype", myObject.prototype)
console.log("用new Object新建的对象的__proto__", myObject.__proto__)
console.log("用new Object新建的对象的__proto__   和    Object.prototype", myObject.__proto__ === Object.prototype)

// 原型链
//   + 用 __proto__ 串联起来的对象链状结构
//   + 注意: 使用 __proto__
//   + 每一个对象数据类型, 都有一个属于自己的原型链
//   + 作用: 为了访问对象成员

// 对象访问机制:
//   + 当你需要访问对象的成员的时候
//   + 首先在自己身上查找, 如果有直接使用
//   + 如果没有, 会自动去 __proto__ 上查找
//   + 如果还没有, 就再去 __proto__ 上查找
//   + 直到 Object.prototype 都没有, 那么返回 undefined