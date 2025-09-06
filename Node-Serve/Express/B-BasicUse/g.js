const express = require('express')

const app = express()

// ！  解析JSON请求体
// express.json() 是 Express.js 框架的一个中间件函数，它由 express 模块自带，用于解析 JSON 请求体。从 Express 4.16.0 版本开始，express.json() 提供了对 JSON 格式请求体的解析支持，使得你可以轻松地接收和处理客户端发送的 JSON 数据。

// 基本用法
// const express = require('express');
// const app = express();
// app.use(express.json());


// 选项
// express.json() 接受一个可选的选项对象，允许你自定义解析行为：

// strict: 默认为 false。如果设置为 true，则只接受 JSON 格式的数据，忽略任何其他媒体类型。
// type: 默认为 'application/json'。如果指定，则仅解析该类型的内容。
// verify: 一个函数，用于验证整个请求对象，如果返回 false，则返回 400 错误响应。
// limit: 用于限制请求体的大小，默认为 '100kb'。如果请求体过大，将返回 413 错误响应。
// reviver: 与 JSON.parse() 中的 reviver 参数相同，允许在解析过程中转换数据。


// 示例
// 以下是 express.json() 中间件的一些使用示例：

// 默认配置
// app.use(express.json());

// 自定义配置
// app.use(express.json({ limit: '1mb' }));

// 使用 verify 函数
// app.use(express.json({
//   verify: (req, res, buf, encoding) => {
//     if (req.path === '/signin') {
//       // 检查请求体是否包含特定字段
//       return buf.length > 0;
//     }
//     return true;
//   }
// }));

// 使用 reviver 函数
// app.use(express.json({
//   reviver: (key, value) => {
//     if (typeof value === 'string') {
//       return value.replace(/\-\d{4}$/, '');
//     }
//     return value;
//   }
// }));

// 如何访问解析后的数据
// 一旦使用 express.json() 中间件，Express 将自动解析 JSON 请求体，并将其放置在 req.body 对象中。你可以在路由处理函数中直接访问这些数据：

// app.post('/user', (req, res) => {
//   const user = req.body;
//   // 处理用户数据
//   res.send('User added');
// });


// 注意事项
// 确保在任何自定义的路由处理函数之前使用 express.json()，以便它能够正确地解析 JSON 请求体。
// 如果你同时处理 JSON 请求体和表单数据，可以按顺序使用 express.json() 和 express.urlencoded() 中间件。
// express.json() 是处理 JSON API 请求的有力工具，它极大地简化了 JSON 数据的接收和解析过程。



// 直接使用express提供给我们的中间件
//！！！ 参数放到 body json 下才有效        有多少种传参方式呢？？？
app.use(express.json())

// 注册两个实际请求的中间件
// 案例一: 用户登录的请求处理 /login post => username/password
app.post('/login', (req, res, next) => {
  console.log("111", req.body)
})

// 案例二: 注册用户的请求处理 /register post => username/password
app.post('/register', (req, res, next) => {
  console.log(req.body)
})

app.listen(3000, () => {
  console.log('express服务器启动成功~')
})





// 在 Express 框架中：
// Express 使用其自己的请求处理逻辑，并且提供了简化的方法来处理请求体。例如，Express 可以使用中间件如 body-parser 来解析 JSON、URL 编码的查询字符串、URL 编码的请求体等。

// const express = require('express');
// const app = express();
// const bodyParser = require('body-parser');

// app.use(bodyParser.json()); // 解析 JSON 请求体
// app.use(bodyParser.urlencoded({ extended: true })); // 解析 URL 编码的请求体

// app.post('/data', (req, res) => {
//   console.log(req.body); // 包含解析后的请求体数据
//   res.send('Data received');
// });

// app.listen(3000, () => {
//   console.log('Server is running at http://localhost:3000/');
// });


// 在 Express 中，一旦请求体被 body-parser 中间件解析，你就可以通过 req.body 直接访问解析后的数据。这比使用 req.on('data', ...) 更加方便和高效。

// 使用 body-parser 中间件后，req.body 可以包含的取值形式包括：

// JSON 对象：如果客户端发送了 Content-Type: application/json 格式的请求体。
// 字符串或字符串对象：如果客户端发送了 Content-Type: application/x-www-form-urlencoded 格式的表单数据。


// 在 Express 应用中，通常不需要直接监听 data 事件，因为 Express 和 body-parser 已经为你处理了这些细节。