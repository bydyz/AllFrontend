# appType - 应用类型

指定应用类型，影响 Vite 的内置行为和插件。

## 配置方式

- **类型**: `'spa' | 'mpa' | 'custom'`
- **默认值**: `'spa'`

```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  appType: 'spa',
})
```

## 进阶配置

多页应用：

```javascript
// vite.config.js
import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  appType: 'mpa',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        admin: resolve(__dirname, 'admin/index.html'),
      },
    },
  },
})
```

自定义应用类型：

```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  appType: 'custom',
  // 自定义 HTML 处理
  plugins: [
    // 自定义插件处理 HTML
  ],
})
```

## 注意事项

- `spa`：单页应用（默认），使用 `vite-plugin-spa` 处理路由
- `mpa`：多页应用，支持多个入口 HTML 文件
- `custom`：自定义类型，不使用内置的 HTML 处理
- 应用类型影响开发服务器和生产构建的行为
- `mpa` 类型需要手动配置多入口
