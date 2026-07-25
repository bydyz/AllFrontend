# css.transformer - CSS 转换器

指定用于处理 CSS 的转换器，可选择 PostCSS 或 Lightning CSS。

## 配置方式

- **类型**: `'postcss' | 'lightningcss'`
- **默认值**: `'postcss'`

```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  css: {
    // 使用 Lightning CSS
    transformer: 'lightningcss',
  },
})
```

## 进阶配置

切换到 Lightning CSS：

```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  css: {
    transformer: 'lightningcss',
    lightningcss: {
      // Lightning CSS 选项
      targets: {
        chrome: 100,
        firefox: 100,
      },
    },
  },
})
```

## 注意事项

- `postcss`：默认转换器，兼容性好，插件生态丰富
- `lightningcss`：性能更好，但插件生态较少
- 选择 `lightningcss` 时需要安装 `lightningcss` 依赖
- 两种转换器的配置项不兼容，需要分别配置
- Lightning CSS 对现代浏览器支持更好
