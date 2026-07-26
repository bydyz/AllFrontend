const moduleA = (function() {
  // name、age、height 是 私有变量 - 外部无法直接访问
  let name = "why"
  let age = 18
  let height = 1.88
  console.log(name)

  return {
    name,
    age,
    height
  }
}())

/* 
立即执行函数

(function() {

}())

*/

// ECMAScript没有推出来自己的模块化方案: CommonJS/AMD/CMD
// ES6(ES2015)推出自己的模块化方案: ESModule
