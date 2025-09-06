// 一. 导入koa
const Koa = require('koa')

// 二. 实例化对象
const app = new Koa()

// 三. 导入koa-router, 实例化路由对象
const Router = require('koa-router')

const router = new Router({ prefix: '/users' })

const db = [
  {id:1, name:'小明', age:21},
  {id:2, name:'小红', age:18},
  {id:3, name:'小兰', age:19},
]

//GET /users 获取所有用户信息，返回数组
// router.get('/', (ctx) => {
//   ctx.body = db
// })

//GET /users/:id  场景一：根据id，获取该用户信息，返回对象（通过路由传参, 可以通过params得到）
router.get('/:id', (ctx) => {
  console.log('22222222222222222222222222222222222222222222222222222222', )
  const id = ctx.params.id
  const res = db.filter((item) => item.id == id)
  if(!res[0]) ctx.throw(404)
  ctx.body=res[0]
})

// GET /users?start=18&end=20 ---- 获取所有的用户信息, 返回一个数组（以键值对的形式传参, 可以通过query得到）
// !  倘若前面也有  router.get('/', () => {})  则会匹配前面的，执行完毕即结束了，而不会执行到后面的这个路由
router.get('/', (ctx) => {
  // 通过 ctx.query 是ctx.request.query的代理 解析键值对参数
  const { start = 0, end = 0 } = ctx.query
  const res = db.filter((item) => item.age >= start && item.age <= end)
  // 解析键值对
  res.length == 0 ? ctx.throw(404) : (ctx.body = res)
})

// 四. 注册路由中间件
app.use(router.routes())
app.use(router.allowedMethods())

// 五. 启动服务
app.listen(3000, () => {
  console.log('server is running on http://localhost:3000')
})

