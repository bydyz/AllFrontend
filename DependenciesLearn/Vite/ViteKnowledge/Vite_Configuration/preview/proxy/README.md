# preview.proxy

为预览服务器配置 HTTP 代理规则。

## 配置方式

- **类型**: `Record<string, string | ProxyOptions>`
- **默认值**: 继承自 `server.proxy`

```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  preview: {
    proxy: {
      // 将 /api 开头的请求代理到后端服务
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})
```

## 进阶配置

支持 WebSocket 代理：

```javascript
export default defineConfig({
  preview: {
    proxy: {
      '/socket': {
        target: 'ws://localhost:3000',
        ws: true,
      },
    },
  },
})
```

## 注意事项

- preview 代理基于 `http-proxy` 实现
- 在生产部署中，通常由 Nginx 等反向代理处理，preview 的 proxy 配置不会生效
- 该配置继承自 `server.proxy`，如无特殊需求无需单独设置
