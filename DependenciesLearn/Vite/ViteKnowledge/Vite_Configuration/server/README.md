# Server 配置

`server` 配置项用于配置 Vite 的开发服务器行为，包括网络、安全、代理、HMR 等核心功能。

## 配置概览

| 配置项 | 说明 |
|--------|------|
| [host](./host/) | 服务器监听地址 |
| [allowedHosts](./allowedHosts/) | 允许的主机名 |
| [port](./port/) | 端口号 |
| [strictPort](./strictPort/) | 严格端口模式 |
| [https](./https/) | TLS / HTTPS 配置 |
| [open](./open/) | 自动打开浏览器 |
| [proxy](./proxy/) | 代理配置 |
| [cors](./cors/) | CORS 跨域配置 |
| [headers](./headers/) | 响应头配置 |
| [hmr](./hmr/) | 热模块替换配置 |
| [ws](./ws/) | WebSocket 配置 |
| [forwardConsole](./forwardConsole/) | 转发控制台日志 |
| [warmup](./warmup/) | 预热文件配置 |
| [watch](./watch/) | 文件监视配置 |
| [middlewareMode](./middlewareMode/) | 中间件模式 |
| [fs](./fs/) | 文件系统限制 |
| [origin](./origin/) | 资源 URL 源 |
| [sourcemapIgnoreList](./sourcemapIgnoreList/) | sourcemap 忽略列表 |

## 基础用法

```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    host: '0.0.0.0',    // 监听所有地址
    port: 3000,         // 自定义端口
    open: true,         // 自动打开浏览器
    cors: true,         // 启用 CORS
    proxy: {            // 配置代理
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true
      }
    }
  }
})
```

## 注意事项

- `server` 配置仅在开发模式下生效（`vite dev`），构建模式（`vite build`）会忽略这些配置
- 部分配置如 `fs` 安全限制在生产环境中同样适用
- 环境变量 `VITE_PORT`、`VITE_HOST` 可覆盖对应配置
