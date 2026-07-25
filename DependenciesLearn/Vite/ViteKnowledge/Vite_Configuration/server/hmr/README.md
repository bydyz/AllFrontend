# hmr

配置热模块替换（Hot Module Replacement）行为。

## 配置方式

- **类型**: `boolean | { overlay?: boolean }`
- **默认值**: `{}`

```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    // 禁用 HMR
    hmr: false,

    // 启用 HMR（默认）
    hmr: true,

    // 自定义 HMR 配置
    hmr: {
      overlay: true     // 显示错误覆盖层
    }
  }
})
```

## 进阶配置

### 自定义 HMR 行为

```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    hmr: {
      // 是否在浏览器中显示错误覆盖层
      overlay: true,

      // 自定义 HMR 客户端协议（默认 ws）
      protocol: 'ws',

      // 自定义 HMR 客户端主机
      host: 'localhost',

      // 自定义 HMR 客户端端口
      port: 5173,

      // 自定义 HMR 客户端路径
      path: '/hmr',

      // 超时时间（毫秒）
      timeout: 30000
    }
  }
})
```

### 禁用错误覆盖层

```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    hmr: {
      overlay: false  // 不显示错误覆盖层
    }
  }
})
```

## HMR 工作原理

```
文件变更 → Vite 检测到 → 发送 HMR 更新 → 客户端应用更新模块
    ↑                                              ↓
  文件系统                                      浏览器热更新
```

## 注意事项

- HMR 仅在开发模式下可用
- 如果 HMR 不生效，检查浏览器控制台是否有 WebSocket 连接错误
- 在网络不稳定时，HMR 可能会超时，可适当增加 `timeout` 值
- 禁用 HMR 后，代码修改需要手动刷新页面
