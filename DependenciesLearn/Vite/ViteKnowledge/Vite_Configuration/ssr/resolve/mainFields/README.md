# ssr.resolve.mainFields

当依赖没有 `exports` 字段时，指定查找入口的字段顺序。

## 配置方式

- **类型**: `string[]`
- **默认值**: `['module', 'jsnext:main', 'jsnext']`

```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  ssr: {
    resolve: {
      mainFields: ['module', 'jsnext:main', 'jsnext'],
    },
  },
})
```

## 进阶配置

可以添加 `main` 字段以支持传统 CJS 包：

```javascript
export default defineConfig({
  ssr: {
    resolve: {
      mainFields: [
        'module',           // 优先使用 ESM 入口
        'jsnext:main',      // 旧版 ESM 入口
        'jsnext',           // 更旧的 ESM 入口
        'main',             // 传统 CJS 入口
      ],
    },
  },
})
```

## 字段查找逻辑

1. 优先检查 `package.json` 的 `exports` 字段
2. 如果没有 `exports`，按 `mainFields` 顺序查找
3. 按数组顺序返回第一个找到的字段值

## 注意事项

- 与浏览器模式不同，SSR 默认不包含 `browser` 字段
- 放在前面的字段优先级更高
- `'module'` 字段通常指向 ESM 版本，适合 SSR 环境
