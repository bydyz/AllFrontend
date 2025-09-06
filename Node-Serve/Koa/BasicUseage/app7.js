// 使用koa-router

// 一. 导入koa
const Koa = require('koa')

// 二. 实例化对象
const app = new Koa()

const userRouter = require('./route7')

app.use(userRouter.routes()).use(userRouter.allowedMethods())



// 五. 启动服务
app.listen(3000, () => {
  console.log('server is running on http://localhost:3000')
})