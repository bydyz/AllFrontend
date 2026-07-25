# ssr.noExternal

强制将指定依赖打包进 SSR 产物，覆盖 `external` 的外部化设置。

## 配置方式

- **类型**: `string | RegExp | (string | RegExp)[] | true`
- **默认值**: `[]`

```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  ssr: {
    external: ['lodash-es'],     // 先外部化
    noExternal: ['lodash-es'],   // 再强制不外部化 → 最终不外部化
  },
})
```

## 进阶配置

支持字符串、正则表达式和数组混合使用：

```javascript
export default defineConfig({
  ssr: {
    noExternal: [
      'my-internal-lib',          // 字符串匹配
      /^@scope\/internal/,        // 正则匹配
    ],
  },
})
```

设置为 `true` 会禁止外部化**所有**依赖：

```javascript
export default defineConfig({
  ssr: {
    noExternal: true,  // 所有依赖都打包进 SSR 产物
  },
})
```

## 注意事项

- `noExternal` 优先级**高于** `external`，冲突时以 `noExternal` 为准
- 设置为 `true` 等同于将所有依赖打包，可能导致产物体积增大
- 常用于需要将某些 CJS 依赖转换为 ESM 的场景
