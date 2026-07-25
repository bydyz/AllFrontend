# cors

配置跨域资源共享（CORS）策略，控制允许访问开发服务器的来源。

## 配置方式

- **类型**: `boolean | CorsOptions`
- **默认值**: `{}`（开发模式默认允许所有来源）

```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    // 启用 CORS（允许所有来源）
    cors: true,

    // 禁用 CORS
    cors: false,

    // 自定义 CORS 配置
    cors: {
      origin: ['http://localhost:3000', 'https://example.com'],
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      allowedHeaders: ['Content-Type', 'Authorization'],
      credentials: true,
      maxAge: 86400
    }
  }
})
```

## 进阶配置

### 常见 CORS 配置示例

```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    cors: {
      // 允许的来源（函数形式动态判断）
      origin: (origin, callback) => {
        const allowedOrigins = ['http://localhost:3000', 'https://dev.example.com']
        if (!origin || allowedOrigins.includes(origin)) {
          callback(null, true)
        } else {
          callback(new Error('不允许的来源'))
        }
      },

      // 允许的 HTTP 方法
      methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],

      // 允许的请求头
      allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-Type'],

      // 是否允许携带凭证（Cookie、Authorization 头等）
      credentials: true,

      // 预检请求缓存时间（秒）
      maxAge: 86400,

      // 暴露给浏览器的响应头
      exposedHeaders: ['X-Custom-Header']
    }
  }
})
```

### 配合环境变量

```bash
# .env.development
VITE_CORS_ORIGIN=http://localhost:3000
```

## 注意事项

- 开发模式下 Vite 默认允许所有来源，生产模式需要自行配置
- 设置 `credentials: true` 时，`origin` 不能为 `*`
- `maxAge` 值过小会导致频繁发送预检请求，影响性能
- 调试跨域问题时，检查浏览器 Network 面板的 OPTIONS 预检请求
