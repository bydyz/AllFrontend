const Router = require('koa-router')

const router = new Router({ prefix: '/users' })

router.get('/detail', (ctx) => {
  ctx.body = '获取用户页信息'
})
router.post('/create', (ctx) => {
  ctx.body = '创建用户'
})

module.exports = router