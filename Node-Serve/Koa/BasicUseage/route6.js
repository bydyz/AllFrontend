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

module.exports = router