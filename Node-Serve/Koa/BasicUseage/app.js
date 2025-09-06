//1、引入koa
const Koa = require('koa')

//2、实例化koa，创建Web服务器
const app = new Koa()
 
//第一个中间件
app.use(async(ctx, next) => {
    await next()
    console.log('再打印第一个中间件')
    ctx.body = 'Hello world'
})

//第二个中间件
app.use(async(ctx) =>{
    console.log('先打印第二个中间件')
})
 
// 会执行  http://localhost:3000/      http://localhost:3000/favicon.ico  两个请求




// 一.基本使用

// ctx 上下文，包含了 request 和 response 等信息。
// Koa与Express的对比：ctx.body用于返回数据相当于res.writeHead()   res.send() 
// Koa用到ES6的语法：箭头函数 () => {} 中的this指向上下文。


// 二. 路由
// 路由是客户端的请求与服务器处理函数之间的映射关系。
// （1）使用原生方法实现路由：不够简洁，优雅！













//3、启动Web服务器，调用app.listen（端口号，启动成功后的回调函数）
app.listen(3000)