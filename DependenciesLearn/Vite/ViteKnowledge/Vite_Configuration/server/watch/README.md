# watch

配置文件监视器的行为，用于控制哪些文件变化会触发服务器重启。

## 配置方式

- **类型**: `object | null`
- **默认值**: `{}`

```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    watch: {
      // 使用轮询方式监视（适用于虚拟机或网络文件系统）
      usePolling: true,

      // 轮询间隔（毫秒）
      interval: 100,

      // 忽略监视的文件模式
      ignored: [
        '**/node_modules/**',
        '**/.git/**',
        '**/dist/**'
      ]
    }
  }
})
```

## 进阶配置

### 完整的 watch 配置

```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    watch: {
      // 是否使用轮询方式
      usePolling: false,

      // 轮询间隔（毫秒）
      interval: 100,

      // 是否稳定性检测（防止重复触发）
      stabilityThreshold: 2000,

      // 文件系统等待时间
      awaitWriteFinish: {
        stabilityThreshold: 2000,
        pollInterval: 100
      },

      // 忽略的文件/目录
      ignored: [
        '**/node_modules/**',
        '**/.git/**',
        '**/dist/**',
        '**/*.log',
        '**/coverage/**'
      ]
    }
  }
})
```

### 禁用文件监视

```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    watch: null  // 完全禁用文件监视
  }
})
```

### 适用于不同环境

```javascript
// vite.config.js
import { defineConfig } from 'vite'
import os from 'os'

export default defineConfig({
  server: {
    watch: process.env.VM || os.platform() === 'win32'
      ? { usePolling: true, interval: 100 }
      : {}
  }
})
```

## 注意事项

- 在虚拟机、Docker 或网络文件系统中，建议启用 `usePolling`
- `ignored` 支持 glob 模式，可精确控制监视范围
- 文件监视器会占用系统资源，过多的监视文件可能导致性能问题
- 修改 `watch` 配置后需要重启开发服务器
