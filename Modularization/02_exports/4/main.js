// 在Node中每一个js文件都是一个单独的模块；


// 3.探讨require的本质
const bar = require("./bar.js")
console.log(bar.name) // bar

// 4s之后重新获取name
setTimeout(() => {
  console.log(bar.name)
}, 4000)

