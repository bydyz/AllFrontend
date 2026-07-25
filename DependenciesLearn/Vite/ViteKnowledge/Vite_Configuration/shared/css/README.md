# css - CSS 配置

配置 Vite 处理 CSS 的相关选项，包括预处理器、PostCSS、CSS Modules 等。

## 子配置一览

| 配置项 | 说明 |
|--------|------|
| [modules](./modules/) | CSS Modules 配置 |
| [postcss](./postcss/) | PostCSS 配置 |
| [preprocessorOptions](./preprocessorOptions/) | CSS 预处理器选项 |
| [preprocessorMaxWorkers](./preprocessorMaxWorkers/) | 预处理器最大线程数 |
| [devSourcemap](./devSourcemap/) | 开发环境 sourcemap |
| [transformer](./transformer/) | CSS 转换器 |
| [lightningcss](./lightningcss/) | Lightning CSS 配置 |

## 配置示例

```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  css: {
    // CSS Modules 配置
    modules: {
      localsConvention: 'camelCase',
    },
    // PostCSS 配置
    postcss: {
      plugins: ['autoprefixer'],
    },
    // 预处理器选项
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/styles/variables.scss";`,
      },
    },
  },
})
```

## 注意事项

- CSS 配置同时影响开发和生产构建
- 预处理器需要安装对应的依赖（sass、less、stylus）
- PostCSS 配置可以使用 `.postcssrc` 文件或内联配置
- CSS Modules 默认开启，文件名包含 `.module.` 即可
