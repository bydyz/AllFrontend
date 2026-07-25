# resolve.dedupe - 依赖去重

指定需要去重的依赖包名称，确保多个依赖使用同一版本的共享依赖。

## 配置方式

- **类型**: `string[]`

```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  resolve: {
    dedupe: ['vue', 'vue-router'],
  },
})
```

## 进阶配置

常见的去重场景：

```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  resolve: {
    dedupe: [
      // Vue 生态去重
      'vue',
      'vue-router',
      'pinia',
      // React 生态去重
      'react',
      'react-dom',
      // 常见共享依赖
      'lodash',
      'axios',
    ],
  },
})
```

## 注意事项

- 当项目存在多个版本的同一依赖时使用
- 去重后所有引用该依赖的包都会使用同一个版本
- 可能导致版本不兼容问题，需谨慎使用
- 适用于 monorepo 或存在依赖冲突的场景
