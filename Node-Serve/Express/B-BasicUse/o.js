const express = require('express')

// 创建app对象
const app = express()



// express.static 函数接受一个参数，即静态文件的根目录的路径。这个路径可以是绝对路径，也可以是相对于 Express 应用程序的根目录的相对路径。这意味着它允许你快速地从指定的文件目录（在这个例子中是 ./uploads）提供静态文件，如 HTML 文件、JavaScript 文件、CSS 文件、图片等。

// 工作方式

// 当 Express 应用程序接收到一个 HTTP 请求时，如果没有任何路由处理器匹配到该请求，express.static 中间件会检查请求的路径是否指向静态文件目录中的一个文件。如果是，它将该文件作为响应发送给客户端。如果不是，请求会传递给堆栈中的下一个中间件或路由处理器。



// 假设你有一个项目结构如下：

// /my-express-app
//   / uploads
//     / images
//       - image1.png
//       - image2.png
//     / css
//       - style.css
//     - image1.png
//   app.js

// 在 app.js 文件中，你可以这样使用 express.static：


// const express = require('express');
// const app = express();
// const port = 3000;

// // 指定静态文件目录
// app.use(express.static('./uploads'));

// // 其他中间件和路由...

// app.listen(port, () => {
//   console.log(`Server listening on port ${port}`);
// });


// 现在，当你运行这个 Express 应用程序并访问如下 URL 时：

// http://localhost:3000/image1.png：将返回 ./uploads 目录下的 image1.png 文件。
// http://localhost:3000/css/style.css：将返回 ./uploads 目录下的 /css文件夹的 style.css 文件。     有更多层的同理


// 注意事项
// 静态文件中间件应该在你定义的任何路由之前设置，这样未匹配的请求才会被正确地传递给静态文件服务。
// 如果你的应用程序中有多个静态文件目录，你可以多次调用 app.use 来为每个目录设置静态文件服务。
// 出于安全考虑，不要将静态文件目录设置为包含敏感文件的目录。
// 使用 express.static 是提供静态文件的一种简便方法，它不需要你编写任何额外的路由或逻辑来处理这些文件的请求。


// 内置的中间件: 直接将一个文件夹作为静态资源
app.use(express.static('./uploads'))
app.use(express.static('./build'))


// 启动服务器
app.listen(3000, () => {
  console.log('express服务器启动成功~')
})
