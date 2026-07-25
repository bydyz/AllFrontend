# css.preprocessorOptions - CSS 预处理器选项

配置 CSS 预处理器（Sass、Less、Stylus）的编译选项。

## 配置方式

- **类型**: `Record<string, PreprocessorOptions>`

```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        // 注入全局变量
        additionalData: `@import "@/styles/variables.scss";`,
      },
      less: {
        // Less 变量
        modifyVars: {
          'primary-color': '#1890ff',
        },
        javascriptEnabled: true,
      },
    },
  },
})
```

## 进阶配置

Sass 完整配置：

```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        // 注入全局 SCSS 文件
        additionalData: `
          @use "@/styles/variables" as *;
          @use "@/styles/mixins" as *;
        `,
        // Sass 选项
        api: 'modern-compiler',
        // 导入路径
        importer: [],
      },
    },
  },
})
```

Less 配置（适用于 Element UI 等组件库）：

```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  css: {
    preprocessorOptions: {
      less: {
        // Less 变量覆盖
        modifyVars: {
          'primary-color': '#409eff',
          'link-color': '#409eff',
        },
        // 启用 JavaScript 表达式
        javascriptEnabled: true,
        // Less 插件
        plugins: [],
      },
    },
  },
})
```

## 注意事项

- `additionalData` 会注入到每个 SCSS/Less 文件的顶部
- 确保注入的文件存在且可被正确导入
- Less 需要 `javascriptEnabled: true` 才能使用 JS 表达式
- Sass 建议使用 `@use` 替代 `@import`
