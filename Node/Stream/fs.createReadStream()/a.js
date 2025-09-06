const fs = require('fs')
const path = require("path")

// 1. readFile 一次性读取
// 缺点一: 没有办法精准控制从哪里读取, 读取什么位置.
// 缺点二: 读取到某一个位置的, 暂停读取, 恢复读取.
// 缺点三: 文件非常大的时候, 多次读取.
// fs.readFile('./aaa.txt', (err, data) => {
//   console.log(data)
// })

// 2.通过流读取文件
// 2.1. 创建一个可读流
// start: 从什么位置开始读取
// end: 读取到什么位置后结束(包括end位置字节)
// highWaterMark: 一次性读取字节  kb

//！ 字节是 从0开始算的， 8即是8号字节，即字符串中的第9个字符  22是直到22号字节即字符串中的第23号字节
const readStream = fs.createReadStream(
  path.resolve(__dirname, "../aaa.txt"), 
  // {
  //   start: 8,
  //   end: 25,
  //   highWaterMark: 3
  // }
)

readStream.on('data', (data) => {
  console.log(data.toString())

  // 读取暂停
  readStream.pause()

  setTimeout(() => {
    // 恢复读取
    readStream.resume()
  }, 2000)
})


// 3.补充其他的事件监听
readStream.on('open', (fd) => {
  console.log('通过流将文件打开~', fd)
})

readStream.on('end', () => {
  console.log('已经读取到end位置')
})

readStream.on('close', () => {
  console.log('文件读取结束, 并且被关闭')
})

