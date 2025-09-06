const http = require('http')

const server = new http.Server((request, response) => {
  response.end("Hello Server")
})

server.listen(5000, localhost, () => {
  console.log("服务器启动成功~")
})