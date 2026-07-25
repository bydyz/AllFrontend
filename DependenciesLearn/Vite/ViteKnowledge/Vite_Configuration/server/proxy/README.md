# proxy

配置开发服务器的请求代理，用于解决开发环境的跨域问题和接口转发。

## 配置方式

- **类型**: `Record<string, string | ProxyOptions>`
- **默认值**: `{}`

## 方式一：字符串简写

最简单的代理配置，将匹配的请求转发到目标地址。

```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    proxy: {
      // '/api' 开头的请求会被代理到 http://localhost:8080
      // 例如：/api/users → http://localhost:8080/api/users
      '/api': 'http://localhost:8080',

      // '/socket' 开头的请求代理到 http://localhost:8080
      '/socket': 'http://localhost:8080'
    }
  }
})
```

## 方式二：带选项的对象配置

提供更细粒度的代理控制，支持重写路径、修改请求头等。

```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080',  // 目标服务器地址
        changeOrigin: true,               // 修改请求头中的 Origin 字段
        rewrite: (path) => path.replace(/^\/api/, ''),  // 重写路径，移除 /api 前缀
        ws: true,                         // 代理 WebSocket 连接
        secure: false,                    // 是否验证 SSL 证书
        configure: (proxy, options) => {
          // 自定义代理逻辑
          proxy.on('proxyReq', (proxyReq, req, res) => {
            console.log('代理请求:', req.url)
          })
        }
      }
    }
  }
})
```

### 完整选项说明

```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080',   // 目标服务器
        changeOrigin: true,                // 修改 Origin 头
        rewrite: (path) => path,           // 路径重写函数
        ws: false,                         // 是否代理 WebSocket
        secure: true,                      // 验证 SSL 证书
        cookieDomainRewrite: {             // Cookie 域名重写
          '*': ''
        },
        headers: {                         // 自定义请求头
          'X-Custom-Header': 'yes'
        },
        configure: (proxy, options) => {   // 自定义配置函数
          // proxy: http-proxy 实例
          // options: 当前代理选项
        }
      }
    }
  }
})
```

## 方式三：正则匹配

使用正则表达式匹配请求路径，适用于复杂的路由规则。

```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    proxy: {
      // 匹配 /api 开头的请求
      '^/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      },

      // 匹配 /v1 和 /v2 开头的请求
      '^/(v1|v2)': {
        target: 'http://localhost:8081',
        changeOrigin: true
      },

      // 匹配所有 /external 开头的请求
      '^/external/.+': {
        target: 'https://api.example.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/external/, '')
      }
    }
  }
})
```

## 方式四：WebSocket 代理

配置 WebSocket 连接的代理转发。

```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    proxy: {
      '/ws': {
        target: 'ws://localhost:8080',
        ws: true,  // 启用 WebSocket 代理

        // 自定义 WebSocket 事件处理
        configure: (proxy) => {
          proxy.on('open', (proxySocket) => {
            console.log('WebSocket 代理连接已打开')
          })

          proxy.on('close', (res, head) => {
            console.log('WebSocket 代理连接已关闭')
          })
        }
      }
    }
  }
})
```

### 前端连接示例

```javascript
// 前端代码
const ws = new WebSocket('ws://localhost:5173/ws')

ws.onopen = () => {
  console.log('WebSocket 连接已建立')
  ws.send('Hello Server')
}

ws.onmessage = (event) => {
  console.log('收到消息:', event.data)
}
```

## 注意事项

- 代理仅在开发服务器运行时生效，构建产物不会包含代理逻辑
- 修改 `proxy` 配置后需要重启开发服务器
- `changeOrigin: true` 是解决跨域的常用配置
- 使用正则匹配时，注意转义特殊字符
- 代理不支持 HTTPS 到 HTTP 的转发，需要额外配置
