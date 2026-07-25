# worker.rolldownOptions

配置 Worker 脚本构建时的 Rolldown（Rollup/Rolldown）打包选项。

## 配置方式

- **类型**: `OutputOptions`
- **默认值**: `{}`

```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  worker: {
    rolldownOptions: {
      output: {
        // 控制 Worker 输出的文件名格式
        entryFileNames: 'worker-[name].[hash].js',
      },
    },
  },
})
```

## 进阶配置

可以自定义 Worker 的外部化和入口：

```javascript
export default defineConfig({
  worker: {
    rolldownOptions: {
      // 外部化某些依赖，不打包进 Worker
      external: ['some-large-lib'],
      output: {
        // Worker 输出格式
        format: 'iife',
        // 自定义产物文件名
        chunkFileNames: 'worker-chunk-[hash].js',
      },
    },
  },
})
```

## 注意事项

- 该选项传递给底层打包工具（Rolldown 或 Rollup）
- Worker 是独立构建，配置不会影响主应用
- 一般情况下不需要修改此配置
- 如需为 Worker 单独配置外部化，可在此处设置 `external`
