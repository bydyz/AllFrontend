// 在Node中每一个js文件都是一个单独的模块；


// 1.直接获取导出的对象, 从对象中获取属性
// const util = require("./util.js")

// console.log(util.UTIL_NAME)
// console.log(util.formatCount())
// console.log(util.formatDate())



// 2.导入对象之后, 直接对其进行解构
const { 
  UTIL_NAME,
  formatCount, 
  formatDate 
} = require("./util.js")

console.log(UTIL_NAME)
console.log(formatCount())
console.log(formatDate())


