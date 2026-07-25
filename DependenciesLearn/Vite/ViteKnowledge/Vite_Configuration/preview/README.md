# preview 预览服务器配置

预览服务器用于在构建产物（`dist`）上提供服务，模拟生产环境的静态文件托管。通过 `vite preview` 命令启动。

## 与 dev server 的关系

preview 的大部分配置项默认继承自对应的 `server.*` 配置，因此只需在 dev server 中配置一次即可生效。但以下项有独立默认值：

| 配置项 | preview 默认值 | 与 server 的差异 |
|--------|---------------|-----------------|
| `port` | **4173** | dev server 默认 5173 |
| `host` | 继承 `server.host` | - |
| `strictPort` | 继承 `server.strictPort` | - |
| `https` | 继承 `server.https` | - |
| `open` | 继承 `server.open` | - |
| `proxy` | 继承 `server.proxy` | - |
| `cors` | 继承 `server.cors` | - |
| `headers` | 继承 `server.headers` | - |

## 配置方式

```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  preview: {
    port: 4173,       // 预览服务器端口（默认 4173）
    host: '0.0.0.0',  // 监听地址
    open: true,       // 自动打开浏览器
  },
})
```

## 注意事项

- `preview` 配置只在 `vite preview` 命令时生效，`vite dev` 时不会读取
- 如果同时配置了 `server` 和 `preview`，两者互不影响，各自独立运行
- `preview.base` 默认继承自构建配置 `base`，一般不需要额外设置
