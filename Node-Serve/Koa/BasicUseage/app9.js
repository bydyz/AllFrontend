// koa-body  处理body参数


// 使用koa-router

// 一. 导入koa
const Koa = require('koa')

// 二. 实例化对象
const app = new Koa()


// 在使用koa-body获取post请求body参数时，一定要在注册路由前使用koa-body，否则ctx.request.body获取为空
// koa-body是一个Koa的中间件，用于解析HTTP请求的请求体。它支持多种请求体格式，例如multipart/form-data、application/x-www-form-urlencoded和application/json等
// ! koa-body 的版本过高时，会报错 koaBody is not a function
// 此处要加 multipart: true 才能正常解析到值？？？
const koaBody = require('koa-body')
app.use(koaBody( { multipart: true } ))


// 三. 导入koa-router, 实例化路由对象
const Router = require('koa-router')

const router = new Router()

router.post('/users', (ctx) => {
  // ctx.body = `Request Body:${JSON.stringify(ctx.request.body)}`
  ctx.body = ctx.request.body
})

app.use(router.routes()).use(router.allowedMethods())



// 五. 启动服务
app.listen(3000, () => {
  console.log('server is running on http://localhost:3000')
})