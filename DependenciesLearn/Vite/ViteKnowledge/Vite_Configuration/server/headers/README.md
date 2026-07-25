# headers

为开发服务器的所有响应添加自定义 HTTP 头。

## 配置方式

- **类型**: `OutgoingHttpHeaders`
- **默认值**: `{}`

```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    headers: {
      // 设置响应头
      'X-Custom-Header': 'my-value',
      'X-Powered-By': 'Vite'
    }
  }
})
```

## 进阶配置

### 常见安全头配置

```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    headers: {
      // 防止浏览器嗅探 MIME 类型
      'X-Content-Type-Options': 'nosniff',

      // 防止点击劫持
      'X-Frame-Options': 'DENY',

      // XSS 保护
      'X-XSS-Protection': '1; mode=block',

      // HSTS（仅 HTTPS 下有效）
      'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',

      // CSP 内容安全策略
      "Content-Security-Policy": "default-src 'self' 'unsafe-inline' 'unsafe-eval'"
    }
  }
})
```

### 动态设置响应头

```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    headers: (req, res) => {
      // 根据请求路径设置不同的响应头
      if (req.url.startsWith('/api')) {
        return { 'Cache-Control': 'no-store' }
      }
      return { 'Cache-Control': 'public, max-age=3600' }
    }
  }
})
```

## 注意事项

- 这些响应头仅在开发服务器中生效
- 生产环境需要在 Web 服务器（如 Nginx）中配置响应头
- 安全相关头（如 CSP）建议在生产环境严格配置
- `X-Powered-By` 头在生产环境中建议移除，避免信息泄露
