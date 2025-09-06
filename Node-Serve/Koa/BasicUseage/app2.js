// 路由是客户端的请求与服务器处理函数之间的映射关系。
// 使用原生方法实现路由：不够简洁，优雅！


//1、导入koa
const Koa = require('koa')
//2、创建Web服务器
const app = new Koa()
 
//路由中间件
app.use(async (ctx) => {
    if (ctx.url === '/') {
        ctx.body = 'Home Page'
    } else if (ctx.url === '/users') {
        if (ctx.method === 'GET') {
            ctx.body = 'Users Page'
        } else if (ctx.method === 'POST') {
            ctx.body = 'Create New User'
        } else {
            ctx.status = 405 //Not allowed
        }
    } else if (ctx.url.match(/\/users\/\w+/)) { //用户id由字母数字组成
        if (ctx.method === 'GET') {
            // macth()返回的数组第一项为整个url，在正则表达式中给我们需要的信息加上小括号，数组第二项就为我们需要的信息
            const userId = ctx.url.match(/\/users\/(\w+)/)[1] //获取数组第二项的userId
            ctx.body = `用户id为${userId}`
        } else {
            ctx.status = 405 //Not allowed
        }
    } else {
        ctx.status = 404 //Not Found
    }
})
 
//3、启动Web服务器，调用app.listen（端口号，启动成功后的回调函数）
app.listen(3000)