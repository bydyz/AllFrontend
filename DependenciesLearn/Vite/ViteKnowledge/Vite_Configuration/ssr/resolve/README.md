# ssr.resolve SSR 解析配置

控制 SSR 模式下模块解析的行为，包括条件导出、外部条件和主字段优先级。

## 配置方式

```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  ssr: {
    resolve: {
      conditions: ['module', 'node'],                    // 导出条件
      externalConditions: ['node', 'module-sync'],       // 外部化条件
      mainFields: ['module', 'jsnext:main', 'jsnext'],   // 主字段优先级
    },
  },
})
```

## 子配置项

| 配置项 | 说明 |
|--------|------|
| `conditions` | 控制 `exports` 字段的条件匹配 |
| `externalConditions` | 外部化依赖使用的额外条件 |
| `mainFields` | 当 `exports` 不存在时的字段查找顺序 |

## 注意事项

- SSR 模式的解析条件与浏览器模式不同（使用 `node` 而非 `browser`）
- 这些配置通常不需要手动修改，除非遇到特定依赖的解析问题
- 修改后可能影响第三方库的模块加载方式
