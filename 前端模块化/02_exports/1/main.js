// 在Node中每一个js文件都是一个单独的模块；

console.log("main最上面")

const bar = require("./bar.js")

console.log("main中require的后面")

console.log(bar.name) // bar

console.log("main最下面")



// 在main中的导入，意味着main中的bar变量等于exports对象
// 也就是require通过各种查找方式，最终找到了exports这个对象，然后赋值给main中的bar变量