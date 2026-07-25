# optimizeDeps.rolldownOptions

配置预构建过程中使用的 Rolldown（或 esbuild）打包选项。

## 配置方式

- **类型**: `DepsOptimizerOptions['rolldownOptions']`
- **默认值**: `{}`

```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  optimizeDeps: {
    rolldownOptions: {
      // 自定义 Rolldown 打包行为
      output: {
        // 控制输出格式
        format: 'es',
      },
    },
  },
})
```

## 进阶配置

可以根据需要调整打包策略：

```javascript
export default defineConfig({
  optimizeDeps: {
    rolldownOptions: {
      // 自定义外部化规则
      external: [],
      // 自定义入口
      input: {},
      // Rollup 兼容选项
      plugins: [],
    },
  },
})
```

## 注意事项

- 该选项传递给底层打包工具（Rolldown 或 esbuild）
- Vite 5.x 使用 esbuild，Vite 6+ 默认使用 Rolldown
- 一般情况下不需要修改此配置
