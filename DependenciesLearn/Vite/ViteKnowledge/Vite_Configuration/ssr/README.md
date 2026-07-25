# ssr 服务端渲染配置

SSR（Server-Side Rendering）配置用于控制 Vite 在服务端渲染模式下如何处理模块的打包、外部化和解析策略。

## 配置方式

```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  ssr: {
    target: 'node',        // SSR 目标环境
    external: [],           // 外部化依赖
    noExternal: [],         // 禁止外部化
    resolve: {              // 模块解析配置
      conditions: [],
      externalConditions: [],
      mainFields: [],
    },
  },
})
```

## 核心概念

- **外部化（External）**: 不将某些依赖打包进 SSR 产物，而是保留 `require()`/`import` 让运行时加载
- **禁止外部化（NoExternal）**: 强制将某些依赖打包进 SSR 产物
- **目标环境（Target）**: 决定 SSR 产物的运行环境（Node.js 或 Web Worker）

## 注意事项

- SSR 配置仅在 SSR 构建/渲染时生效
- `external` 和 `noExternal` 可以同时使用，`noExternal` 优先级更高
- 第三方库通常需要外部化以避免打包问题
