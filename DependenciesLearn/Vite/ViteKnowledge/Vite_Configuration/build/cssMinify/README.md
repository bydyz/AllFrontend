# cssMinify — CSS 压缩

指定 CSS 压缩工具。Vite 6+ 默认使用 Lightning CSS 进行压缩。

## 配置方式

- **类型**: `boolean | 'lightningcss' | 'esbuild'`
- **默认值**: `'lightningcss'`

```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    // 使用 Lightning CSS 压缩（默认）
    cssMinify: 'lightningcss',

    // 使用 esbuild 压缩（速度更快，压缩率稍低）
    cssMinify: 'esbuild',

    // 禁用 CSS 压缩
    cssMinify: false,

    // 使用 Lightning CSS 但禁用压缩（仅做降级转换）
    cssMinify: true,
  }
})
```

## 进阶配置

### 配合 Lightning CSS 使用

```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    cssMinify: 'lightningcss',
    // Lightning CSS 自带语法降级和压缩功能
    // 无需额外配置 cssTarget
  }
})
```

## 注意事项

- `lightningcss` 提供更先进的压缩算法和语法降级能力
- `esbuild` 压缩速度更快但功能相对简单
- 设置为 `false` 可以保留原始 CSS 格式，方便调试
- 在 Vite 5.x 中默认值为 `esbuild`，Vite 6+ 改为 `lightningcss`
