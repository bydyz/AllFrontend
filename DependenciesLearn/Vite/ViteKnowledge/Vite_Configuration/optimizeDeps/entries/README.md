# optimizeDeps.entries

自定义依赖优化的入口文件，用于覆盖 Vite 自动检测的入口。

## 配置方式

- **类型**: `string | string[]`
- **默认值**: `[]`（自动从 `index.html` 扫描）

```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  optimizeDeps: {
    // 自定义入口文件，用于发现需要优化的依赖
    entries: ['src/main.ts', 'src/worker.ts'],
  },
})
```

## 进阶配置

当项目有多个入口或特殊结构时需要手动指定：

```javascript
export default defineConfig({
  optimizeDeps: {
    entries: [
      'src/main.ts',        // 主入口
      'src/entry-worker.ts', // Worker 入口
      'scripts/seed.ts',     // 脚本入口
    ],
  },
})
```

## 注意事项

- 仅在自动扫描无法覆盖所有依赖时需要设置
- Vite 从 `index.html` 自动推断入口，单页应用通常不需要配置
- 配置后会影响依赖预构建的范围
