# resolve.preserveSymlinks - 保留符号链接

是否保留符号链接路径，而不是解析为真实路径。

## 配置方式

- **类型**: `boolean`
- **默认值**: `false`

```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  resolve: {
    preserveSymlinks: true,
  },
})
```

## 进阶配置

在 monorepo 中使用符号链接时：

```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  resolve: {
    // 保留符号链接路径，避免重复依赖
    preserveSymlinks: true,
    // 配合路径别名使用
    alias: {
      '@': '/src',
    },
  },
})
```

## 注意事项

- `false`（默认）：将符号链接解析为真实路径
- `true`：保留符号链接的原始路径
- monorepo 中使用 `pnpm` 或 `yarn` 符号链接时可能需要开启
- 开启后可能导致某些依赖出现多个实例
- 与 Webpack 的 `resolve.symlinks: false` 行为一致
