const fs = require("fs")
const path = require("path")

fs.readFile(
  path.resolve(__dirname, "./foo.txt"), 
  // !!!  倘若不适用 utf-8 编码， 获取的data就是Buffer
  // { encoding: 'utf-8' }, 
  (err, data) => {
    if(err) {
      console.log("读取发生错误：", err)
    } else {
      console.log("读取文件内容：", data)
      console.log("Buffer.toString()", data.toString())
    }
  }
)

console.log("证明它是异步的打印")