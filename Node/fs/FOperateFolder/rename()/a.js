const fs = require("fs")
const path = require("path")

fs.rename(
  path.resolve(__dirname, "../testOne"),
  path.resolve(__dirname, "../testTwo"),
  err => {
    console.log(err)
  }
)

console.log("同异步验证")     // 异步