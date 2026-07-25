# optimizeDeps.needsInterop

声明哪些依赖需要 ESM/CJS 互操作处理。**（实验性功能）**

## 配置方式

- **类型**: `string[]`
- **默认值**: `[]`
- **状态**: 实验性（Experimental）

```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  optimizeDeps: {
    // 指定需要互操作处理的 CJS 依赖
    needsInterop: ['some-cjs-package'],
  },
})
```

## 进阶配置

当 CJS 依赖导出方式特殊时使用：

```javascript
export default defineConfig({
  optimizeDeps: {
    needsInterop: [
      'old-cjs-package',      // 导出方式不标准的 CJS 包
      'legacy-module',        // 旧版模块系统
    ],
    include: ['old-cjs-package', 'legacy-module'],
  },
})
```

## 注意事项

- 用于解决 `Failed to resolve import` 或 `default export` 问题
- 需要配合 `include` 一起使用
- 该功能标记为实验性，API 可能变更
- 适用于导出方式不规范的 CJS 依赖
