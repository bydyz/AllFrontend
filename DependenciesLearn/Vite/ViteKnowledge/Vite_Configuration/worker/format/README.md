# worker.format

指定 Worker 脚本的输出模块格式。

## 配置方式

- **类型**: `'es' | 'iife'`
- **默认值**: `'iife'`

```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  worker: {
    format: 'es',  // 输出 ES 模块格式
  },
})
```

## 格式对比

| 格式 | 说明 | 适用场景 |
|------|------|---------|
| `'iife'` | 立即执行函数表达式 | **默认值**，兼容性最好 |
| `'es'` | ES 模块 | 支持 `type: 'module'` 的 Worker |

```javascript
// 使用 ES 模块格式的 Worker
const worker = new Worker(
  new URL('./my-worker.js', import.meta.url),
  { type: 'module' }
)
```

## 进阶配置

使用 ES 模块格式可以支持 `import()` 动态导入：

```javascript
export default defineConfig({
  worker: {
    format: 'es',  // 允许 worker 内部使用 import
  },
})
```

## 注意事项

- `'iife'` 格式是默认值，兼容所有浏览器
- `'es'` 格式需要浏览器支持 `type: 'module'` 的 Worker
- 使用 `'es'` 格式时，Worker 内部可以使用 `import` 语句
