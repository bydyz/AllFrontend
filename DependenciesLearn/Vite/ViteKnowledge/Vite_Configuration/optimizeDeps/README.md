# optimizeDeps 依赖优化配置

依赖优化是 Vite 的核心特性之一。在开发模式下，Vite 将 `node_modules` 中的依赖预构建为 ESM 模块，解决以下问题：

1. **冷启动速度** — 避免大量小模块的按需编译
2. **转换 ESM/CJS** — 将 CommonJS 依赖统一转换为 ESM
3. **减少请求** — 将多个小文件合并为单个模块

## 配置方式

```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  optimizeDeps: {
    entries: [],          // 自定义入口
    include: [],          // 强制包含
    exclude: [],          // 排除
    force: false,         // 强制重新优化
    noDiscovery: false,   // 禁用自动发现
  },
})
```

## 工作原理

1. Vite 启动时扫描入口文件的 `import` 语句
2. 将 `node_modules` 中的依赖通过 `esbuild`/`Rolldown` 预构建
3. 结果缓存在 `node_modules/.vite` 目录中

## 注意事项

- 依赖优化仅在**开发模式**下生效，生产构建使用 Rollup/Rolldown
- 修改 `optimizeDeps` 配置后需手动删除 `node_modules/.vite` 缓存
- 对于大型项目，可以预热缓存以加速首次启动
