# css.lightningcss - Lightning CSS 配置

配置 Lightning CSS 转换器的选项，当 `transformer` 设置为 `'lightningcss'` 时生效。

## 配置方式

- **类型**: `LightningCSSOptions`

```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  css: {
    transformer: 'lightningcss',
    lightningcss: {
      // 目标浏览器版本
      targets: {
        chrome: 100,
        firefox: 100,
        safari: 15,
      },
    },
  },
})
```

## 进阶配置

完整的 Lightning CSS 配置：

```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  css: {
    transformer: 'lightningcss',
    lightningcss: {
      // 目标浏览器
      targets: '> 0.5%, last 2 versions',
      // 是否移除无效代码
      drafts: {
        customMedia: true,
      },
      // CSS Modules 选项
      cssModules: {
        // 命名约定
        localsConvention: 'camelCase',
      },
      // 资源选项
      analysis: {
        // 是否分析依赖
        dependencies: true,
      },
      // 字符串字面量
      string: {
        // 是否处理字符串
        imports: true,
      },
    },
  },
})
```

## 注意事项

- 需要先安装 `lightningcss` 依赖：`npm install -D lightningcss`
- Lightning CSS 比 PostCSS 性能更好
- 部分 PostCSS 插件可能没有对应的 Lightning CSS 功能
- 目标浏览器配置影响 CSS 降级程度
- 建议在生产构建中使用以获得更好的性能
