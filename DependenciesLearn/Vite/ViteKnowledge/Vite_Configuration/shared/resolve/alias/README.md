# resolve.alias - 路径别名

配置路径别名，简化模块导入路径，避免使用相对路径。

## 配置方式

- **类型**: `Record<string, string> | Array<{ find: string | RegExp, replacement: string }>`

### 对象格式

```javascript
// vite.config.js
import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
  resolve: {
    alias: {
      // 常用：@ 指向 src 目录
      '@': path.resolve(__dirname, 'src'),
      // 组件目录别名
      '@components': path.resolve(__dirname, 'src/components'),
      // 工具函数别名
      '@utils': path.resolve(__dirname, 'src/utils'),
      // 静态资源别名
      '@assets': path.resolve(__dirname, 'src/assets'),
    },
  },
})
```

### 数组格式

```javascript
// vite.config.js
import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
  resolve: {
    alias: [
      {
        find: /^@utils$/,
        replacement: path.resolve(__dirname, 'src/utils'),
      },
      {
        find: /^@components$/,
        replacement: path.resolve(__dirname, 'src/components'),
      },
      // 支持正则匹配
      {
        find: /^@/,
        replacement: path.resolve(__dirname, 'src'),
      },
    ],
  },
})
```

## 进阶配置

在 TypeScript 中配合 `tsconfig.json`：

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@components/*": ["src/components/*"],
      "@utils/*": ["src/utils/*"]
    }
  }
}
```

## 注意事项

- 对象格式的别名按顺序匹配，后面的会覆盖前面的
- 数组格式支持正则表达式，更灵活
- 别名只影响 `import` 语句，不影响 `url()` 等 CSS 引用
- 需要同时配置 TypeScript 的 `paths` 才能获得类型提示
