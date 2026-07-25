# 构建配置 (Build Configuration)

Vite 的 `build` 选项用于配置生产环境构建行为，包括输出目录、压缩策略、代码分割、CSS 处理、Source Map、SSR 等各个方面。

## 配置目录

| 配置项 | 说明 | 默认值 |
|--------|------|--------|
| [target](./target/) | 浏览器兼容目标 | `baseline-widely-available` |
| [modulePreload](./modulePreload/) | 模块预加载 | `true` |
| [outDir](./outDir/) | 输出目录 | `dist` |
| [assetsDir](./assetsDir/) | 静态资源目录 | `assets` |
| [assetsInlineLimit](./assetsInlineLimit/) | 资源内联限制 | `4096` |
| [cssCodeSplit](./cssCodeSplit/) | CSS 代码分割 | `true` |
| [cssTarget](./cssTarget/) | CSS 兼容目标 | - |
| [cssMinify](./cssMinify/) | CSS 压缩 | `lightningcss` |
| [sourcemap](./sourcemap/) | Source Map | `false` |
| [chunkImportMap](./chunkImportMap/) | Chunk Import Map | `false`（实验性） |
| [rolldownOptions](./rolldownOptions/) | Rolldown 打包选项（原 rollupOptions） | - |
| [dynamicImportVarsOptions](./dynamicImportVarsOptions/) | 动态导入变量选项 | - |
| [lib](./lib/) | 库模式配置 | - |
| [license](./license/) | 许可证输出 | `false` |
| [manifest](./manifest/) | 清单文件 | `false` |
| [ssrManifest](./ssrManifest/) | SSR 清单 | `false` |
| [ssr](./ssr/) | SSR 构建 | `false` |
| [emitAssets](./emitAssets/) | 发射资源 | `false` |
| [minify](./minify/) | 压缩方式 | `oxc` |
| [terserOptions](./terserOptions/) | Terser 选项 | - |
| [write](./write/) | 写入磁盘 | `true` |
| [emptyOutDir](./emptyOutDir/) | 清空输出目录 | `true` |
| [copyPublicDir](./copyPublicDir/) | 复制公共目录 | `true` |
| [reportCompressedSize](./reportCompressedSize/) | 报告压缩大小 | `true` |
| [chunkSizeWarningLimit](./chunkSizeWarningLimit/) | Chunk 大小警告限制 | `500` |
| [watch](./watch/) | 监听模式 | `null` |

## 基本用法

```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    // 构建输出目录
    outDir: 'dist',
    // 启用 Source Map 调试
    sourcemap: true,
    // 使用 oxc 压缩
    minify: 'oxc',
    // 超过 1000KB 的 chunk 发出警告
    chunkSizeWarningLimit: 1000,
  }
})
```

## 注意事项

- 构建配置仅在 `vite build` 命令下生效，开发服务器使用不同的默认值
- `rollupOptions` 已被 `rolldownOptions` 替代（Vite 6+），旧名称仍可用但已弃用
- `minify` 选项在 Vite 6+ 中默认使用 `oxc`，之前版本默认使用 `esbuild`
