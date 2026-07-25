# optimizeDeps.include

强制将某些依赖纳入预构建，即使它们未被自动检测到。

## 配置方式

- **类型**: `string[]`
- **默认值**: `[]`
- **支持 glob 模式**: 如 `lodash-es/*`

```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  optimizeDeps: {
    // 强制预构建这些依赖
    include: ['lodash-es', 'dayjs'],
  },
})
```

## 进阶配置

支持 glob 模式匹配子模块：

```javascript
export default defineConfig({
  optimizeDeps: {
    include: [
      'lodash-es',              // 整个包
      'lodash-es/*',            // 所有子模块
      'date-fns/*',             // date-fns 的子模块
      'pinia > @vue/devtools-api', // 嵌套依赖
    ],
  },
})
```

## 注意事项

- 当依赖以非标准方式导入时（如动态拼接路径），自动检测可能遗漏
- 嵌套依赖使用 `>` 分隔，如 `'parent > child'`
- 常用于解决 `optimized dependency is not being optimized` 警告
