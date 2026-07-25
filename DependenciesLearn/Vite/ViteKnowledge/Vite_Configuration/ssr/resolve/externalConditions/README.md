# ssr.resolve.externalConditions

为外部化依赖提供额外的解析条件，用于确定哪些文件版本应被加载。

## 配置方式

- **类型**: `string[]`
- **默认值**: `['node', 'module-sync']`

```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  ssr: {
    resolve: {
      externalConditions: ['node', 'module-sync', 'import'],
    },
  },
})
```

## 进阶配置

自定义外部化条件以满足特殊需求：

```javascript
export default defineConfig({
  ssr: {
    resolve: {
      externalConditions: [
        'node',            // Node.js 环境条件
        'module-sync',     // 同步 ESM 加载
        'import',          // import 条件
      ],
    },
  },
})
```

## 与 `conditions` 的区别

| 配置 | 作用范围 |
|------|---------|
| `conditions` | 应用于所有依赖（包括内部构建的） |
| `externalConditions` | 仅应用于被标记为 external 的依赖 |

## 注意事项

- `'module-sync'` 用于支持 Node.js 同步 ESM 加载
- 当外部依赖的 `exports` 字段匹配失败时，会回退到 `mainFields`
- 一般不需要修改此配置
