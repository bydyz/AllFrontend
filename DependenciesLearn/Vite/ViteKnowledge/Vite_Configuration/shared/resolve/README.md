# resolve - 路径解析配置

配置 Vite 的模块解析策略，包括路径别名、文件扩展名、导出条件等。

## 子配置一览

| 配置项 | 说明 |
|--------|------|
| [alias](./alias/) | 路径别名 |
| [dedupe](./dedupe/) | 依赖去重 |
| [conditions](./conditions/) | 条件导出 |
| [mainFields](./mainFields/) | 主字段 |
| [extensions](./extensions/) | 文件扩展名 |
| [preserveSymlinks](./preserveSymlinks/) | 保留符号链接 |
| [tsconfigPaths](./tsconfigPaths/) | tsconfig 路径 |

## 配置示例

```javascript
// vite.config.js
import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
  resolve: {
    // 路径别名
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
    // 文件扩展名
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json'],
    // 依赖去重
    dedupe: ['vue'],
    // 条件导出
    conditions: ['module', 'browser'],
  },
})
```

## 注意事项

- `resolve` 配置同时影响开发和生产构建
- 别名配置可以使用对象格式或数组格式
- 修改 `extensions` 会影响模块解析性能
