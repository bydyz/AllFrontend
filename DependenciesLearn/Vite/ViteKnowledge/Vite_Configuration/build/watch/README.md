# watch — 监听模式

配置构建时的文件监听行为。设置后，Vite 会在文件变化时自动重新构建。

## 配置方式

- **类型**: `WatcherOptions | null`
- **默认值**: `null`（不监听）

```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    // 启用监听模式
    watch: {},

    // 自定义监听选项
    watch: {
      // 监听的目录
      include: 'src/**',
      // 排除的目录
      exclude: ['node_modules', 'dist'],
      // 轮询间隔（毫秒）
      interval: 100,
      // 使用轮询模式（适用于网络文件系统）
      usePolling: false,
      // 忽略初始扫描
      ignoreInitial: true,
    },

    // 禁用监听（默认）
    watch: null,
  }
})
```

## 常用选项

```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    watch: {
      // 只监听 src 目录
      include: 'src/**',
      // 排除测试文件和类型定义
      exclude: [
        '**/*.test.js',
        '**/*.spec.js',
        '**/*.d.ts',
        'node_modules',
      ],
      // 文件变化后延迟 200ms 再触发构建
      awaitWriteFinish: {
        stabilityThreshold: 200,
        pollInterval: 50,
      },
    }
  }
})
```

## 注意事项

- 监听模式主要用于库开发或需要持续构建的场景
- 开发时建议使用 `vite dev` 而非 `vite build --watch`
- `usePolling: true` 适用于 Docker、虚拟机等文件系统事件不可靠的环境
- 设置为 `null`（默认）时不监听文件变化
- 监听选项与 chokidar 库的配置兼容
