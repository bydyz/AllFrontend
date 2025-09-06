const express = require('express')

// 创建app对象
const app = express()


// 编写中间件
//！ 1.解析queryString    参数放在请求行中，  postman里面的  Params
app.get('/home/list', (req, res, next) => {
  // offset/size
  const queryInfo = req.query
  console.log(queryInfo)

  res.end('data list数据')
})

//! 2.解析params参数       如 /users/6
app.get('/users/:id', (req, res, next) => {
  const id = req.params.id
  console.log(req.params)

  res.end(`获取到${id}的数据~`)
})

// 启动服务器
app.listen(3000, () => {
  console.log('express服务器启动成功~')
})
