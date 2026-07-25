# ws

配置 WebSocket 连接的底层参数。

## 配置方式

- **类型**: `false | { protocol?, host?, port?, path?, timeout?, clientPort?, server? }`
- **默认值**: `{}`

```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    ws: {
      // WebSocket 协议
      protocol: 'ws',

      // WebSocket 主机
      host: 'localhost',

      // WebSocket 端口
      port: 5173,

      // WebSocket 路径
      path: '/hmr',

      // 连接超时时间（毫秒）
      timeout: 30000,

      // 客户端使用的端口（用于代理场景）
      clientPort: 443,

      // 内部 WebSocket 服务器实例
      server: undefined
    }
  }
})
```

## 进阶配置

### 代理场景下的 WebSocket 配置

```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    ws: {
      // 当通过 HTTPS 代理访问时，设置客户端端口
      clientPort: 443,

      // 使用 wss 协议
      protocol: 'wss'
    }
  }
})
```

### 完全禁用 WebSocket

```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    ws: false  // 禁用 WebSocket（不影响 HMR）
  }
})
```

### 自定义 WebSocket 服务器

```javascript
// vite.config.js
import { defineConfig } from 'vite'
import { WebSocketServer } from 'ws'

export default defineConfig({
  server: {
    ws: {
      server: (wss) => {
        // 自定义 WebSocket 服务器行为
        wss.on('connection', (ws) => {
          console.log('客户端已连接')

          ws.on('message', (data) => {
            console.log('收到消息:', data.toString())
            ws.send('Hello from server')
          })
        })
      }
    }
  }
})
```

## 注意事项

- WebSocket 配置主要用于自定义 HMR 连接行为
- 通过 HTTPS 代理访问时，需要设置 `clientPort` 为 443
- 在生产环境中 WebSocket 配置会被忽略
- 修改 WebSocket 配置后需要重启开发服务器
