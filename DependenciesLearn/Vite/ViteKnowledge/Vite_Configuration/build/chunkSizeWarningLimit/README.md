# chunkSizeWarningLimit — Chunk 大小警告限制

设置 chunk 大小警告的阈值（单位：KB）。超过该大小的 chunk 会在构建时发出警告。

## 配置方式

- **类型**: `number`
- **默认值**: `500`（KB）

```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    // 默认 500KB
    chunkSizeWarningLimit: 500,

    // 提高到 1000KB
    chunkSizeWarningLimit: 1000,

    // 降低到 200KB（更严格）
    chunkSizeWarningLimit: 200,

    // 禁用警告（设置为 Infinity）
    chunkSizeWarningLimit: Infinity,
  }
})
```

## 警告示例

超过阈值时，构建会输出类似警告：

```
(!) dist/assets/vendor-[hash].js is larger than 500 kB.
```

## 进阶配置

### 配合 manualChunks 优化

```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    chunkSizeWarningLimit: 500,
    rollupOptions: {
      output: {
        manualChunks: {
          // 将大型依赖拆分为独立 chunk
          vendor: ['vue', 'vue-router', 'pinia'],
          utils: ['lodash-es', 'dayjs', 'axios'],
        }
      }
    }
  }
})
```

## 注意事项

- 此值仅影响警告输出，不会阻止构建
- 过大的 chunk 会影响首屏加载性能和缓存效率
- 建议根据项目实际情况设置合理的阈值
- 使用 `manualChunks` 可以有效拆分大型依赖
