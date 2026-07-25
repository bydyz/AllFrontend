# worker 配置

Vite 内置了对 Web Worker 的支持。通过 `new Worker(new URL('./worker.js', import.meta.url), { type: 'module' })` 方式创建的 Worker，Vite 会自动打包 worker 脚本。`worker` 配置控制 worker 的构建行为。

## 配置方式

```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  worker: {
    format: 'iife',           // Worker 输出格式
    plugins: [],              // Worker 专用插件
    rolldownOptions: {},      // Rolldown 打包选项
  },
})
```

## 基本用法

```javascript
// 在应用代码中创建 Worker
const worker = new Worker(
  new URL('./my-worker.js', import.meta.url),
  { type: 'module' }
)
worker.postMessage('hello')
```

## 注意事项

- Worker 脚本会通过 Vite 的插件管线处理
- Worker 的 `format` 默认为 `'iife'`，因为 Worker 运行环境不支持顶层 `import`
- 每个 Worker 都是独立的构建，拥有自己的依赖图
