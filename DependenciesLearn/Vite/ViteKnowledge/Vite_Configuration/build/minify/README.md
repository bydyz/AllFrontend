# minify — 压缩

指定 JavaScript 代码压缩工具。Vite 6+ 默认使用 OXC 进行压缩。

## 配置方式

- **类型**: `boolean | 'oxc' | 'terser' | 'esbuild'`
- **默认值**: `'oxc'`

```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    // 使用 OXC 压缩（Vite 6+ 默认）
    minify: 'oxc',

    // 使用 esbuild 压缩（Vite 5 默认）
    minify: 'esbuild',

    // 使用 terser 压缩（速度最慢但功能最全）
    minify: 'terser',

    // 禁用压缩
    minify: false,

    // 等同于 true（使用默认压缩器）
    minify: true,
  }
})
```

## 压缩器对比

| 压缩器 | 速度 | 压缩率 | 说明 |
|--------|------|--------|------|
| `oxc` | 极快 | 高 | Vite 6+ 默认，Rust 实现 |
| `esbuild` | 快 | 中 | Vite 5 默认，Go 实现 |
| `terser` | 慢 | 高 | 功能最全，支持更多压缩选项 |
| `false` | - | - | 不压缩 |

## 进阶配置

### 配合 terser 使用

```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        // 移除 console.log
        drop_console: true,
        // 移除 debugger
        drop_debugger: true,
      },
      mangle: {
        // 保留函数名
        keep_fnames: true,
      },
    }
  }
})
```

## 注意事项

- `oxc` 是 Vite 6+ 新增的 Rust 实现压缩器，速度和压缩率都很优秀
- `terser` 压缩速度最慢，但支持最丰富的压缩选项（如 `drop_console`）
- 禁用压缩会导致产物体积显著增大，仅在调试时使用
- 压缩器的选择不影响 Source Map 的生成
