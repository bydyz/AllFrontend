// 一. 导入koa
const Koa = require('koa')

// 二. 实例化对象
const app = new Koa()

app.use(async (ctx, next) => {
  try{
      await next()
  }catch(err){
      ctx.response.status = err.statusCode || err.status || 500;
      ctx.response.body = {
          message: err.message
      };
      // 如果在try...catch中已经捕捉到错误，error事件就不会发出，通过emit手动释放error事件
      ctx.app.emit('error', err, ctx);
  }
});
// 继续触发error事件
app.on('error',() => {
  console.error('server error', err.message);
  console.error(err);
});



// 五. 启动服务
app.listen(3000, () => {
  console.log('server is running on http://localhost:3000')
})