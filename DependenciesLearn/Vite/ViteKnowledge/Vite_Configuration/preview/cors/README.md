# preview.cors

配置预览服务器的跨域资源共享（CORS）策略。

## 配置方式

- **类型**: `boolean | CorsOptions`
- **默认值**: 继承自 `server.cors`

```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  preview: {
    cors: true,  // 启用 CORS，允许所有来源
  },
})
```

## 进阶配置

可以精细控制 CORS 行为：

```javascript
export default defineConfig({
  preview: {
    cors: {
      origin: 'https://example.com',  // 只允许特定来源
      methods: ['GET', 'POST'],
      allowedHeaders: ['Content-Type', 'Authorization'],
      credentials: true,
    },
  },
})
```

## 注意事项

- `true` 等同于 `Access-Control-Allow-Origin: *`，允许所有来源
- 生产环境应限制 `origin`，避免安全风险
- 该配置继承自 `server.cors`，preview 无需单独设置
