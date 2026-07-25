# rolldownOptions — Rolldown 打包选项

`rolldownOptions` 是 Vite 6+ 引入的新配置项，用于替代原来的 `rollupOptions`。Vite 底层打包工具从 Rollup 过渡到 Rolldown。

## 配置方式

- **类型**: `Record<string, any>`（与 Rolldown/Rollup 配置兼容）

```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rolldownOptions: {
      // 输出格式
      output: {
        // 指定 chunk 文件命名规则
        chunkFileNames: 'assets/[name]-[hash].js',
        // 指定入口文件命名规则
        entryFileNames: 'assets/[name]-[hash].js',
        // 指定资源文件命名规则
        assetFileNames: 'assets/[name]-[hash].[ext]',
        // 手动分包
        manualChunks: {
          vendor: ['vue', 'vue-router'],
          utils: ['lodash-es', 'dayjs'],
        },
      },
      // 外部依赖（不打包到 bundle 中）
      external: ['vue'],
      // 全局变量名映射
      globals: {
        vue: 'Vue',
      },
    }
  }
})
```

## 与 rollupOptions 的关系

| 配置项 | 状态 | 说明 |
|--------|------|------|
| `rollupOptions` | **已弃用** | Vite 5 及更早版本使用 |
| `rolldownOptions` | **推荐** | Vite 6+ 使用 |

```javascript
// 迁移示例
// 旧写法（Vite 5）
build: {
  rollupOptions: { ... }
}

// 新写法（Vite 6+）
build: {
  rolldownOptions: { ... }
}
```

## 参考资料

- [Rolldown 官方文档](https://rolldown.rs/)
- [Vite 构建选项文档](https://cn.vitejs.dev/config/build-options.html)

## 注意事项

- `rolldownOptions` 的配置格式与 Rollup 高度兼容，大部分配置可以直接迁移
- Vite 6+ 中 `rollupOptions` 仍然可用，但会收到弃用警告
- 如果遇到不兼容的配置项，请参考 Rolldown 官方文档
- Rolldown 是 Rust 实现的打包工具，比 Rollup 性能更好
