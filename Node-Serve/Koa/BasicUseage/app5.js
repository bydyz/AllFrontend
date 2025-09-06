// 使用koa-router

// 一. 导入koa
const Koa = require('koa')

// 二. 实例化对象
const app = new Koa()

// 三. 导入koa-router, 实例化路由对象
const Router = require('koa-router')

const router = new Router()

router.get('/', (ctx) => {
  ctx.body = '这是主页'
})
router.get('/users', (ctx) => {
  ctx.body = '这是用户页'
})
router.post('/users', (ctx) => {
  ctx.body = '创建用户页'
})

// 四. 注册路由中间件
// userRouter.routes() 加载路由规则
// userRouter.allowedMethods() 对于没有实现和没有使用的请求方式做出正确的响应
app.use(router.routes())
app.use(router.allowedMethods())

// 五. 启动服务
app.listen(3000, () => {
  console.log('server is running on http://localhost:3000')
})


