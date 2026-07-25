# sourcemap — Source Map

控制是否生成 Source Map 文件，用于在生产环境中调试源代码。

## 配置方式

- **类型**: `boolean | 'inline' | 'hidden'`
- **默认值**: `false`

```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    // 生成独立的 .map 文件（推荐）
    sourcemap: true,

    // 将 Source Map 内联到 JS 文件中（体积增大但无需额外文件）
    sourcemap: 'inline',

    // 生成 Source Map 但不在 bundle 中添加引用注释
    sourcemap: 'hidden',

    // 禁用 Source Map（默认）
    sourcemap: false,
  }
})
```

## 选项对比

| 值 | 说明 | 适用场景 |
|---|------|----------|
| `true` | 生成独立 `.map` 文件，JS 文件末尾添加 `//# sourceMappingURL` 注释 | 生产环境调试 |
| `'inline'` | Source Map 内联到 JS 文件中，文件体积增大 | 临时调试 |
| `'hidden'` | 生成 `.map` 文件，但不添加引用注释 | 上传 Source Map 到错误监控平台 |
| `false` | 不生成 Source Map | 正式发布 |

## 注意事项

- 生成 Source Map 会增加构建时间
- `hidden` 模式适合将 Source Map 上传到 Sentry 等错误监控平台，而不暴露给用户
- 不要在正式发布的生产环境中暴露 Source Map（`true` 模式），可能泄露源码
- `inline` 模式会使 JS 文件体积显著增大
