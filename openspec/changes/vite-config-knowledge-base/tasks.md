## 1. 根目录与总览

- [x] 1.1 创建 `Vite_Configuration/README.md` 总览文档，包含配置体系介绍和 7 大分组索引

## 2. shared 共享配置

- [x] 2.1 创建 `shared/` 目录结构和 README.md
- [x] 2.2 创建 `shared/root/`、`shared/base/`、`shared/mode/`、`shared/define/`、`shared/publicDir/`、`shared/cacheDir/` 配置文档
- [x] 2.3 创建 `shared/resolve/` 目录和 README.md
- [x] 2.4 创建 `shared/resolve/alias/`、`dedupe/`、`conditions/`、`mainFields/`、`extensions/`、`preserveSymlinks/`、`tsconfigPaths/` 配置文档
- [x] 2.5 创建 `shared/html/` 目录和 `cspNonce/`、`additionalAssetSources/` 配置文档
- [x] 2.6 创建 `shared/css/` 目录和 README.md
- [x] 2.7 创建 `shared/css/modules/`、`postcss/`、`preprocessorOptions/`、`preprocessorMaxWorkers/`、`devSourcemap/`、`transformer/`、`lightningcss/` 配置文档
- [x] 2.8 创建 `shared/json/` 目录和 `namedExports/`、`stringify/` 配置文档
- [x] 2.9 创建 `shared/oxc/`、`shared/assetsInclude/`、`shared/logLevel/`、`shared/customLogger/`、`shared/clearScreen/`、`shared/envDir/`、`shared/envPrefix/`、`shared/appType/`、`shared/devtools/`、`shared/future/` 配置文档

## 3. server 开发服务器配置

- [x] 3.1 创建 `server/` 目录结构和 README.md
- [x] 3.2 创建 `server/host/`、`server/allowedHosts/`、`server/port/`、`server/strictPort/`、`server/https/`、`server/open/` 配置文档
- [x] 3.3 创建 `server/proxy/` 配置文档（含 4 种配置方式示例）
- [x] 3.4 创建 `server/cors/`、`server/headers/`、`server/hmr/`、`server/ws/`、`server/forwardConsole/`、`server/warmup/`、`server/watch/`、`server/middlewareMode/` 配置文档
- [x] 3.5 创建 `server/fs/` 目录和 `strict/`、`allow/`、`deny/` 子配置文档
- [x] 3.6 创建 `server/origin/`、`server/sourcemapIgnoreList/` 配置文档

## 4. build 构建配置

- [x] 4.1 创建 `build/` 目录结构和 README.md
- [x] 4.2 创建 `build/target/`、`build/modulePreload/`、`build/outDir/`、`build/assetsDir/`、`build/assetsInlineLimit/` 配置文档
- [x] 4.3 创建 `build/cssCodeSplit/`、`build/cssTarget/`、`build/cssMinify/`、`build/sourcemap/`、`build/chunkImportMap/` 配置文档
- [x] 4.4 创建 `build/rolldownOptions/` 目录和 README.md（标注替代 rollupOptions）
- [x] 4.5 保留 `build/rollupOptions/` 已有内容，更新 README.md 标注废弃
- [x] 4.6 创建 `build/dynamicImportVarsOptions/`、`build/lib/`、`build/license/`、`build/manifest/` 配置文档
- [x] 4.7 创建 `build/ssrManifest/`、`build/ssr/`、`build/emitAssets/`、`build/minify/`、`build/terserOptions/` 配置文档
- [x] 4.8 创建 `build/write/`、`build/emptyOutDir/`、`build/copyPublicDir/`、`build/reportCompressedSize/`、`build/chunkSizeWarningLimit/`、`build/watch/` 配置文档

## 5. preview 预览服务器配置

- [x] 5.1 创建 `preview/` 目录结构和 README.md
- [x] 5.2 创建 `preview/host/`、`preview/allowedHosts/`、`preview/port/`、`preview/strictPort/`、`preview/https/`、`preview/open/`、`preview/proxy/`、`preview/cors/`、`preview/headers/` 配置文档（含继承说明）

## 6. optimizeDeps 依赖优化配置

- [x] 6.1 创建 `optimizeDeps/` 目录结构和 README.md
- [x] 6.2 创建 `optimizeDeps/entries/`、`optimizeDeps/exclude/`、`optimizeDeps/include/`、`optimizeDeps/rolldownOptions/` 配置文档
- [x] 6.3 创建 `optimizeDeps/force/`、`optimizeDeps/noDiscovery/`、`optimizeDeps/holdUntilCrawlEnd/`、`optimizeDeps/needsInterop/` 配置文档

## 7. ssr 配置

- [x] 7.1 创建 `ssr/` 目录结构和 README.md
- [x] 7.2 创建 `ssr/external/`、`ssr/noExternal/`、`ssr/target/` 配置文档
- [x] 7.3 创建 `ssr/resolve/` 目录和 `conditions/`、`externalConditions/`、`mainFields/` 子配置文档

## 8. worker 配置

- [x] 8.1 创建 `worker/` 目录结构和 README.md
- [x] 8.2 创建 `worker/format/`、`worker/plugins/`、`worker/rolldownOptions/` 配置文档

## 9. 插件配置

- [x] 9.1 创建 `plugins/` 目录结构和 README.md
- [x] 9.2 创建 `plugins/@vitejs/plugin-vue/` 配置文档
