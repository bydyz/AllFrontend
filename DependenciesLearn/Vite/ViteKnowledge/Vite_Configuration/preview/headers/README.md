# preview.headers

为预览服务器的所有响应添加自定义 HTTP 头。

## 配置方式

- **类型**: `Record<string, string>`
- **默认值**: 继承自 `server.headers`

```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  preview: {
    headers: {
      // 缓存静态资源 1 年（构建产物通常带 hash）
      'Cache-Control': 'public, max-age=31536000, immutable',
      'X-Content-Type-Options': 'nosniff',
    },
  },
})
```

## 进阶配置

可以配合构建时的 `rollupOptions.output` 为不同类型的文件设置不同的缓存策略：

```javascript
export default defineConfig({
  preview: {
    headers: {
      'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
    },
  },
})
```

## 注意事项

- 这些头会应用到预览服务器的所有响应
- 构建产物中的静态资源文件名通常包含 hash，适合设置长期缓存
- 该配置继承自 `server.headers`，preview 无需单独设置
