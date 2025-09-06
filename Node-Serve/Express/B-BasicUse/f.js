const express = require('express')

const app = express()

// app.get(路径, 中间件1, 中间件2, 中间件3)
//！！！ 效果上等同于   app.get(路径, 中间件1)   app.get(路径, 中间件2)   app.get(路径, 中间件3)
app.get('/home', (req, res, next) => {
  console.log('match /home get middleware01')
  // next()
}, (req, res, next) => {
  console.log('match /home get middleware02')
  next()
}, (req, res, next) => {
  console.log('match /home get middleware03')
  next()
}, (req, res, next) => {
  console.log('match /home get middleware04')
  res.end("it is end")
})

app.listen(3000, () => {
  console.log('express服务器启动成功~')
})
