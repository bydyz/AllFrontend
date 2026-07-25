# forwardConsole

配置是否将服务器端控制台日志转发到浏览器控制台。

## 配置方式

- **类型**: `boolean | { unhandledErrors?, logLevels? }`
- **默认值**: `false`

```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    // 启用控制台转发
    forwardConsole: true,

    // 禁用控制台转发
    forwardConsole: false,

    // 自定义转发配置
    forwardConsole: {
      unhandledErrors: true,     // 转发未处理错误
      logLevels: ['log', 'warn', 'error']  // 转发的日志级别
    }
  }
})
```

## 进阶配置

### 精细控制日志级别

```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    forwardConsole: {
      // 转发所有日志级别
      logLevels: ['log', 'info', 'warn', 'error', 'debug', 'trace'],

      // 不转发未处理错误
      unhandledErrors: false
    }
  }
})
```

### 配合日志过滤

```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    forwardConsole: {
      logLevels: ['log', 'warn', 'error'],
      // 可选：添加日志过滤器
      filter: (level, args) => {
        // 只转发包含特定关键词的日志
        return args.some(arg =>
          typeof arg === 'string' && arg.includes('[API]')
        )
      }
    }
  }
})
```

## 工作流程

```
Node.js console.log('Hello')
    ↓
Vite 捕获日志
    ↓
通过 WebSocket 发送
    ↓
浏览器控制台显示
```

## 注意事项

- 此功能仅在开发模式下有效
- 转发的日志会在浏览器控制台前添加 `[server]` 前缀以区分
- 大量日志转发可能影响性能，建议仅在调试时启用
- 生产环境日志不会转发到浏览器
