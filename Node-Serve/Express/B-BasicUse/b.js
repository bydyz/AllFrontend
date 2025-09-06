const express = require('express')

const app = express()

// 给express创建的app传入一个回调函数
// 传入的这个回调函数就称之为是中间件(middleware)
// app.post('/login', 回调函数 => 中间件)
app.post('/login', (req, res, next) => {
  // 1.中间件中可以执行任意代码
  console.log('first middleware exec~')
  // 打印
  // 查询数据
  // 判断逻辑

  // 2.在中间件中修改req/res对象
  req.age = 99

  //! 3.可以在中间件中结束响应周期
  // res.json({ message: "登录成功, 欢迎回来", code: 0 })

  // 4.执行下一个中间件
  next()
})

app.use((req, res, next) => {
  console.log('second middleware exec~')

  //! 在中间件中结束响应周期
  res.json({ message: "登录成功, 欢迎回来", code: 0 })
})

// !  此处没有返回值，客户端会一直等待服务器的响应直到超时

app.listen(3000, () => {
  console.log('express服务器启动成功~')
})



// ◼ Express是一个路由和中间件的Web框架，它本身的功能非常少：
//    Express应用程序本质上是一系列中间件函数的调用；

// ◼ 中间件是什么呢？
//    中间件的本质是传递给express的一个回调函数；
//    这个回调函数接受三个参数：
//     ✓ 请求对象（request对象）；
//     ✓ 响应对象（response对象）；
//     ✓ next函数（在express中定义的用于执行下一个中间件的函数）；


// ◼ 中间件中可以执行哪些任务呢？
//    执行任何代码；
//    更改请求（request）和响应（response）对象；
//    结束请求-响应周期（返回数据）；
//    调用栈中的下一个中间件；

// ◼ 如果当前中间件功能没有结束请求-响应周期，则必须调用next()将控制权传递给下一个中间件功能，否则，请求将被挂起。