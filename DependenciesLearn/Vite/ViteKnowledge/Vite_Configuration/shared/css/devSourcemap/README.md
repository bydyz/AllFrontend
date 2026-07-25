# css.devSourcemap - 开发环境 sourcemap

配置开发环境是否生成 CSS sourcemap。

## 配置方式

- **类型**: `boolean`
- **默认值**: `false`

```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  css: {
    // 开启开发环境 CSS sourcemap
    devSourcemap: true,
  },
})
```

## 进阶配置

开发环境开启 sourcemap：

```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  css: {
    devSourcemap: true,
  },
  build: {
    // 生产构建也可以选择生成 sourcemap
    sourcemap: true,
  },
})
```

## 注意事项

- 开发环境默认不生成 CSS sourcemap
- 开启后可以在浏览器开发者工具中查看原始 SCSS/Less 源码
- 会影响开发服务器的启动和热更新速度
- 生产构建的 sourcemap 通过 `build.sourcemap` 配置
- 调试 CSS 问题时建议临时开启
