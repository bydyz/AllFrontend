const fs = require("fs")
const path = require("path")

fs.promises.readFile(
  path.resolve(__dirname, "./foo.txt"),
  { encoding: 'utf-8' }
).then(res => {
  console.log("结果：", res)
}).catch(err => {
  console.log("错误：", err)
})

console.log("证明它是异步的打印")