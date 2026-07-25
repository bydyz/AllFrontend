# emitAssets — 发射资源

控制构建时是否将静态资源输出到磁盘。禁用后，资源不会被写入文件系统。

## 配置方式

- **类型**: `boolean`
- **默认值**: `false`

```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    // 启用资源发射（将资源写入磁盘）
    emitAssets: true,

    // 禁用资源发射（默认，资源不会写入磁盘）
    emitAssets: false,
  }
})
```

## 进阶配置

### 自定义构建流程

```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    // 禁用默认的资源发射
    emitAssets: false,
    // 在自定义钩子中处理资源
    writeBundle(options, bundle) {
      // 手动处理构建产物
      for (const [fileName, chunk] of Object.entries(bundle)) {
        if (chunk.type === 'asset') {
          console.log(`Asset: ${fileName} (${chunk.source.length} bytes)`)
        }
      }
    }
  }
})
```

## 注意事项

- 禁用 `emitAssets` 后，构建产物不会写入文件系统
- 适用于需要自定义资源处理的场景（如 CDN 上传、内存处理等）
- 通常与 `write: false` 配合使用
- 此配置与 `write` 选项相关但不完全相同
