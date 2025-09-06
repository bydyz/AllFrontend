const foo1 = require("./foo1.js")
const foo2 = require("./foo2.js")
const foo3 = require("./foo3.js")


console.log("foo1:" + foo1 + " " + "foo2:" + foo2 + " " + "foo3:" + foo3 + " " )


console.log(foo1.sayHello1())   // sayHello 没有返回值，相当于返回undefined   此处打印的就是 undefined



// CommonJS中是没有module.exports的概念的；
//  但是为了实现模块的导出，Node中使用的是Module的类，每一个模块都是Module的一个实例，也就是module；
//  所以在Node中真正用于导出的其实根本不是exports，而是module.exports；
//  因为module才是导出的真正实现者；


// 但是，为什么exports也可以导出呢？
//  这是因为module对象的exports属性是exports对象的一个引用；
//  也就是说 module.exports = exports = main中的bar；


// 推荐只用 module.exports
