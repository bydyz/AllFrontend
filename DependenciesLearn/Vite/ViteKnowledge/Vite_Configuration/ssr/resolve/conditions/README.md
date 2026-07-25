# ssr.resolve.conditions

控制 SSR 模式下 Node.js 模块解析算法的 `exports` 字段匹配条件。

## 配置方式

- **类型**: `string[]`
- **默认值**: `['module', 'node', 'development|production']`

```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  ssr: {
    resolve: {
      conditions: ['module', 'node', 'import', 'require'],
    },
  },
})
```

## 进阶配置

添加自定义条件以匹配特殊导出：

```javascript
export default defineConfig({
  ssr: {
    resolve: {
      conditions: [
        'module',           // ESM 模块
        'node',             // Node.js 环境
        'import',           // import 条件
        'require',          // require 条件
        'production',       // 生产环境条件
      ],
    },
  },
})
```

## 注意事项

- 条件匹配顺序从数组第一个开始，优先匹配
- `'module'` 放在第一位确保优先使用 ESM 版本
- `'development|production'` 会被自动替换为当前环境模式
- 不要随意移除 `'node'` 条件，否则可能导致 Node 专用依赖加载失败
