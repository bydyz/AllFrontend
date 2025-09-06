const name = "foo"
const age = 18
function sayHello() {
  console.log("sayHello")
}

// 2.将模块中内容导出
// 结论: Node导出的本质是在导出module.exports对象
module.exports.name2 = name
module.exports.age2 = age
module.exports.sayHello2 = sayHello         //单个导出，则  exports === module.exports === 导入的对象

// console.log(exports.name, "----")
// console.log(exports.age, "----")
// console.log(exports.sayHello, "----")
console.log(exports === module.exports)

