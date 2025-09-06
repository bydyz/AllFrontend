// 导入 import
//! 注意事项一: 在浏览器中直接使用ESModule时, 必须在文件后加上后缀名.js
console.log("main 111")
import { name, age, sayHello } from "./foo.js"
console.log("main 222")

// const name = "main"

console.log(name)
console.log(age)
sayHello()

