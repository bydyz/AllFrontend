# ssr.target

指定 SSR 产物的运行目标环境。

## 配置方式

- **类型**: `'node' | 'webworker'`
- **默认值**: `'node'`

```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  ssr: {
    target: 'node',  // SSR 产物运行在 Node.js 环境
  },
})
```

## 选项说明

| 值 | 说明 |
|----|------|
| `'node'` | 输出面向 Node.js 运行时，保留 `require()`、`process` 等 Node API |
| `'webworker'` | 输出面向 Web Worker 环境，无 Node.js API |

```javascript
export default defineConfig({
  ssr: {
    target: 'webworker',  // SSR 产物运行在 Web Worker 中
  },
})
```

## 进阶配置

不同 target 影响构建工具的输出策略：

```javascript
export default defineConfig({
  ssr: {
    target: 'node',
    // Node 模式下会保留 require/import，使用 CJS 或 ESM 输出
  },
})
```

## 注意事项

- `'node'` 模式下，Rollup 会根据 `output.format` 决定输出 CJS 或 ESM
- `'webworker'` 模式下，会使用 IIFE 格式输出
- 选择 `'webworker'` 时，外部化行为会有所不同
