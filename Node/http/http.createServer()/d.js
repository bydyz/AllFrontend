// ◼ axios库可以在浏览器中使用，也可以在Node中使用：
//    在浏览器中，axios使用的是封装xhr；
//    在Node中，使用的是http内置模块；

const http = require('http')

http.get("http://localhost:3000", (res) => {
  res.on("data", data => {
    console.log(data.toString())
    // console.log(JSON.parse(data.toString()))
  })
})



// const req = http.request({
//   method: 'POST',
//   hostname: "localhost",
//   port: 3000
// }, (res) => {
//   res.on('data', data => {
//     console.log(data.toString())
//     console.log(JSON.parse(data.toString()))
//   })
// })

// req.end()