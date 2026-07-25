# middlewareMode

将开发服务器配置为中间件模式，允许将 Vite 集成到其他服务器框架中。

## 配置方式

- **类型**: `boolean`
- **默认值**: `false`

```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    // 标准模式（默认）
    middlewareMode: false,

    // 中间件模式
    middlewareMode: 'ssr'  // SSR 模式
  }
})
```

## 进阶配置

### 配合 Express 使用

```javascript
// server.js
import express from 'express'
import { createServer as createViteServer } from 'vite'

async function createServer() {
  const app = express()

  // 创建 Vite 服务器，启用中间件模式
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'custom'
  })

  // 将 Vite 中间件挂载到 Express
  app.use(vite.middlewares)

  // 你的自定义路由
  app.get('/api/users', (req, res) => {
    res.json([{ name: '张三' }, { name: '李四' }])
  })

  app.listen(3000, () => {
    console.log('服务器运行在 http://localhost:3000')
  })
}

createServer()
```

### 配合 Koa 使用

```javascript
// server.js
import Koa from 'koa'
import { createServer as createViteServer } from 'vite'

async function createServer() {
  const app = new Koa()

  // 创建 Vite 服务器，启用中间件模式
  const vite = await createViteServer({
    server: { middlewareMode: 'ssr' },
    appType: 'custom'
  })

  // 将 Vite 中间件挂载到 Koa
  app.use(async (ctx, next) => {
    // 处理 Vite 中间件
    await new Promise((resolve, reject) => {
      vite.middlewares(ctx.req, ctx.res, (err) => {
        if (err) reject(err)
        else resolve()
      })
    })

    // 自定义处理
    if (ctx.path === '/api/data') {
      ctx.body = { message: '数据来自 Koa' }
    }
  })

  app.listen(3000)
}

createServer()
```

### appType 配置

```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    middlewareMode: 'ssr'  // SSR 中间件模式
  },
  appType: 'custom'  // 必须设置为 'custom'
})
```

## 注意事项

- 中间件模式下，Vite 不会启动自己的 HTTP 服务器
- 需要配合其他服务器框架（Express、Koa 等）使用
- 设置 `middlewareMode` 时，建议同时设置 `appType: 'custom'`
- Vite 中间件必须在其他中间件之前挂载
- 生产环境需要自行处理静态文件服务
