# ssr.external

将指定依赖外部化，使其在 SSR 运行时通过原生模块加载，而非打包进 SSR 产物。

## 配置方式

- **类型**: `string[] | true`
- **默认值**: `[]`

```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  ssr: {
    // 外部化这些依赖，SSR 产物中保留 require/import 语句
    external: ['lodash', 'moment'],
  },
})
```

## 进阶配置

设置为 `true` 会外部化所有 `node_modules` 中的依赖：

```javascript
export default defineConfig({
  ssr: {
    external: true,  // 外部化所有 node_modules 依赖
  },
})
```

也可以使用 Rollup 风格的模式匹配：

```javascript
export default defineConfig({
  ssr: {
    external: [
      /^lodash/,       // 匹配 lodash 及其子模块
      /^@vue\//,       // 匹配所有 @vue 作用域包
    ],
  },
})
```

## 注意事项

- 外部化的依赖不会被 Vite 的构建工具处理，保持原样
- 对于纯 ESM 依赖，外部化可能导致 Node.js 加载失败
- 与 `ssr.noExternal` 同时使用时，`noExternal` 优先级更高
