# rollupOptions — Rollup 打包选项（已弃用）

> 该配置项在 Vite 6+ 中已被 [rolldownOptions](../rolldownOptions/) 替代。新项目请使用 `rolldownOptions`。

## 配置方式

- **类型**: `Record<string, any>`（Rollup 配置格式）

```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    // 已弃用，请迁移到 rolldownOptions
    rollupOptions: {
      output: {
        chunkFileNames: 'assets/[name]-[hash].js',
        manualChunks: {
          vendor: ['vue', 'vue-router'],
        },
      },
      external: ['vue'],
    }
  }
})
```

## 迁移到 rolldownOptions

```javascript
// 直接将 rollupOptions 重命名为 rolldownOptions 即可
build: {
  rolldownOptions: {
    // 配置内容不变
  }
}
```

## 子目录

- [input/](./input/) — 入口配置详解

## 注意事项

- 此配置在 Vite 6+ 中仍可用，但会收到弃用警告
- 配置格式与 Rolldown 兼容，请参考 [rolldownOptions](../rolldownOptions/)
