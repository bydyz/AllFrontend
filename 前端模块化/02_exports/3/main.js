// 在Node中每一个js文件都是一个单独的模块；


// 3.探讨require的本质
const bar = require("./bar.js")
console.log(bar.name) // bar


// 2s之后通过bar修改了name
setTimeout(() => {
  bar.name = "kobe"
}, 2000)
