const express = require('express')

// 创建app对象
const app = express()

// 应用一些中间件
app.use(express.json()) // 解析客户端传递过来的json



// express.urlencoded() 是 Express.js 框架的一个中间件函数，用于解析 URL 编码的请求体（通常由表单提交生成）。这个中间件允许你处理 application/x-www-form-urlencoded  类型的 POST 请求。


// 基本用法
// const express = require('express');
// const app = express();
// app.use(express.urlencoded());


// 选项
// express.urlencoded() 接受一个可选的选项对象，用于自定义解析行为：

// extended: 默认为 true。如果设置为 false，则解析器将使用内置的 Node.js 查询字符串解析器，而不是 Extended Query String 库。当设置为 true 时，可以解析复杂的对象和数组。

// 示例
// 以下是 express.urlencoded() 中间件的一些使用示例：

// 默认配置
// app.use(express.urlencoded());

// 自定义配置
// app.use(express.urlencoded({ extended: false }));

// 如何访问解析后的数据
// 一旦使用 express.urlencoded() 中间件，Express 将自动解析 URL 编码的请求体，并将其放置在 req.body 对象中。你可以在路由处理函数中直接访问这些数据：

// app.post('/user', (req, res) => {
//   const user = req.body;
//   // 处理表单数据，例如 user.name 和 user.password
//   res.send('User added');
// });


// 注意事项
// 确保在任何处理表单数据的路由处理函数之前使用 express.urlencoded()，以便它能够正确地解析请求体。
// 如果你同时处理 JSON 请求体和表单数据，可以按顺序使用 express.json() 和 express.urlencoded() 中间件。
// 处理表单数据示例
// 假设你有一个 HTML 表单，它发送 URL 编码的数据：

{/* <form action="/user" method="post">
  <input type="text" name="username" />
  <input type="password" name="password" />
  <button type="submit">Submit</button>
</form> */}

// 客户端提交此表单后，服务器上的 Express 应用将使用 express.urlencoded() 中间件解析请求体，你可以在路由处理函数中通过 req.body.username 和 req.body.password 访问输入字段的值。

// express.urlencoded() 是处理表单提交的有力工具，它极大地简化了表单数据处理过程。



// 解析传递过来urlencoded的时候, 默认使用的node内置querystring模块
// { extended: true }: 不再使用内置的querystring, 而是使用qs第三方库
app.use(express.urlencoded({ extended: true })) // 解析客户端传递过来的urlencoded

// 编写中间件
app.post('/login', (req, res, next) => {
  console.log("111", req.body)
  res.end('登录成功, 欢迎回来~')
})

// 启动服务器
app.listen(3000, () => {
  console.log('express服务器启动成功~')
})
