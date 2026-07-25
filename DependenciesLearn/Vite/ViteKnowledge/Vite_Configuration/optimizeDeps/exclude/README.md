# optimizeDeps.exclude

排除不需要预构建的依赖，这些依赖将保持原始格式或交给其他插件处理。

## 配置方式

- **类型**: `string[]`
- **默认值**: `[]`

```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  optimizeDeps: {
    // 排除以下依赖，不进行预构建
    exclude: ['@vue/compiler-sfc', 'vue'],
  },
})
```

## 进阶配置

常见需要排除的依赖类型：

```javascript
export default defineConfig({
  optimizeDeps: {
    exclude: [
      'vue',                              // 框架本身通常不需要
      '@vue/runtime-dom',                 // 已经是 ESM 的包
      'some-cjs-package-needing-native',  // 含原生模块的包
    ],
  },
})
```

## 注意事项

- 被排除的依赖如果是 CJS 模块，在浏览器中可能无法直接加载
- 如果依赖已经被其他工具处理（如 SSR 中的外部化），才需要排除
- 排除后需手动处理该依赖的 ESM 转换
