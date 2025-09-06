// 一. 导入koa
const Koa = require('koa')



// 二. 实例化对象 （Koa首字母需要大写，此处实际上是类）
const app = new Koa()



// 三. 编写中间件
// app.use((ctx) => {
//     //ctx:content  http 请求上下文
//   ctx.body = 'hello Koa1'
// })


//！ app.use 可以将给定的中间件方法添加到此应用程序需要注意的是，其一次只能接受一个函数做为参数。其返回 this, 因此可以链式表达，也可以 .use  前均加一个app
// app
// .use((ctx, next) => {
//   console.log('我来组成身体')
//   next()
// })
// .use((ctx, next) => {
//   console.log('我来组成头部')
//   next()
// })
// .use((ctx) => {
//   console.log('---------')
//   //如果此处不使用ctx.body会报错“not found”
//   ctx.body = '组装完成'
// })


// !  ctx.url  ctx.body  ctx.method
app.use((ctx) => {
  if (ctx.url == '/') {
    ctx.body = '这是主页'
  } else if (ctx.url == '/users') {
    if (ctx.method == 'GET') {
      ctx.body = '这是用户列表页'
    } else if (ctx.method == 'POST') {
      ctx.body = '创建用户'
    } else {
      ctx.status = 405 // 不支持的请求方法
    }
  } else {
    ctx.status = 404
  }
})



// 四. 启动服务
app.listen(3000, () => {
  console.log('Koa server is running on http://localhost:3000')
})


// 利用GET  请求 http://localhost:3000     postman 和 浏览器 返回 hello Koa
