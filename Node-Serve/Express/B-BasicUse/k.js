const express = require('express')

//! 引入 Multer 中间件，用于处理表单数据和文件上传。
const multer = require('multer')

// 创建app对象
const app = express()

// express内置的插件
//! 使用 Express 内置的中间件 express.json()，用于解析 JSON 格式的请求体。并将其放置在 req.body 对象中。你可以在路由处理函数中直接访问这些数据
app.use(express.json())
//! 用于解析 URL 编码的请求体。extended: true 参数允许解析复杂的对象和数组。这个中间件允许你处理 application/x-www-form-urlencoded  类型的 POST 请求。并将其放置在 req.body 对象中
app.use(express.urlencoded({ extended: true }))

// 编写中间件
//! 创建一个 Multer 中间件实例，但这里没有传递任何配置选项。这将允许上传任何类型的文件，而不对文件大小或存储位置进行限制。
const formData = multer()

//! 使用 formData.any() 中间件来处理表单数据。any() 方法允许上传任意数量的文件，上传的文件将存储在 req.files 对象中。
app.post('/login', formData.any(), (req, res, next) => {
  //! 打印表单中非文件字段的数据，如用户名和密码。
  console.log(req.body)
  res.end('登录成功, 欢迎回来~')
})

app.get('/info', formData.any(), (req, res, next) => {
  //! 打印表单中非文件字段的数据，如用户名和密码。
  console.log(req.body)
  res.end('亲，这是您要的信息~')
})

// 启动服务器
app.listen(3000, () => {
  console.log('express服务器启动成功~')
})
