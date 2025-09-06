const Koa = require('koa')
const app = new Koa()

// 1、引入koa-router模块
const Router = require('koa-router')
// 2、实例化，创建路由
const router = new Router() //配置无路由前缀的路由

const usersRouter = new Router({ //配置路由前缀为users的路由
    prefix: '/users'
})
 
// 获取post提交的数据，解析请求体
const bodyparser = require('koa-bodyparser') // 引入koa-bodyparser
app.use(bodyparser())
 

// 安全中间件
const auth = async (ctx, next) => {
    if (ctx.url !== '/users') {
        ctx.throw(401) //Unauthorized
    }
    await next()
}
 
// 虚拟数据
const db = [{
    name: '小明',
    age: '13',
    sex: '男'
}, {
    name: '小红',
    age: '15',
    sex: '女'
}]
 
// 3.挂载路由
router.get('/', (ctx) => { // 首页
    ctx.body = '<h1>Home Page</h1>'
})

usersRouter.get('/', auth, (ctx) => { // 查列表
    ctx.set('Allow', 'GET,POST') // 设置响应头Headers
    ctx.body = db
})

usersRouter.get('/:id', (ctx) => { // 查一个
    if (ctx.params.id >= db.length) {
        ctx.throw(412, '先决条件错误，id大于数组长度')
    }
    ctx.body = db[ctx.params.id] // 假设id为数据索引
})

usersRouter.post('/', (ctx) => { // 增
    // 要新增的数据通过请求体传递过来
    db.push(ctx.request.body)
    ctx.body = ctx.request.body
})

usersRouter.put('/:id', (ctx) => { // 改
    // 要修改为的数据通过请求体传递过来
    db[ctx.params.id] = ctx.request.body
    ctx.body = ctx.request.body
})

usersRouter.delete('/:id', (ctx) => { // 删
    db.splice(ctx.params.id, 1) // 假设id为数据索引
    ctx.status = 204 // No content
})
 

// 4.注册路由中间件
// 启动路由
app.use(router.routes())
app.use(usersRouter.routes())
// 可设置可不设置，但是推荐设置。allowedMethods作用：
//（1）响应options请求，返回支持的请求方法
//（2）返回405表示不允许访问，返回501表示方法还没实现
app.use(usersRouter.allowedMethods())
 
app.listen(3000)