# Vite 配置知识库

> 基于 Vite 8 官方文档，系统性整理所有配置项的中文学习资料。

## 配置体系概览

Vite 的配置文件是 `vite.config.js`（也支持 `.ts`、`.mjs`、`.mts` 等），位于项目根目录。

```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  // 配置项
})
```

Vite 配置分为 **7 大分组**，覆盖开发、构建、预览等所有场景：

## 配置分组索引

| 分组 | 说明 | 适用场景 |
|------|------|----------|
| [shared](./shared/) | 共享配置 | dev + build + preview |
| [server](./server/) | 开发服务器 | dev |
| [build](./build/) | 构建配置 | build |
| [preview](./preview/) | 预览服务器 | preview |
| [optimizeDeps](./optimizeDeps/) | 依赖优化 | dev |
| [ssr](./ssr/) | SSR 配置 | dev + build |
| [worker](./worker/) | Worker 配置 | dev + build + preview |
| [plugins](./plugins/) | 插件配置 | 取决于插件 |

## 快速导航

### shared 共享配置
- `root` - 项目根目录
- `base` - 公共基础路径
- `mode` - 模式
- `define` - 全局常量替换
- `plugins` - 插件数组
- `publicDir` - 静态资源目录
- `cacheDir` - 缓存目录
- `resolve` - 模块解析（alias、conditions、extensions 等）
- `html` - HTML 相关（cspNonce、additionalAssetSources）
- `css` - CSS 相关（modules、postcss、preprocessorOptions 等）
- `json` - JSON 处理（namedExports、stringify）
- `oxc` - Oxc 转换器
- `assetsInclude` - 静态资源包含
- `logLevel` / `customLogger` - 日志
- `clearScreen` - 清屏
- `envDir` / `envPrefix` - 环境变量
- `appType` - 应用类型
- `devtools` / `future` - 实验性功能

### server 开发服务器
- `host` / `port` / `strictPort` - 网络
- `https` - TLS
- `open` - 自动打开
- `proxy` - 代理
- `cors` - 跨域
- `hmr` / `ws` - 热更新
- `middlewareMode` - 中间件模式
- `fs` - 文件系统限制

### build 构建
- `target` - 浏览器兼容
- `outDir` / `assetsDir` - 输出目录
- `sourcemap` - Source Map
- `rolldownOptions` - Rolldown 打包选项
- `lib` - 库模式
- `minify` - 压缩
- `manifest` - 清单文件

### preview 预览服务器
- 继承大部分 `server` 配置，默认端口 4173

### optimizeDeps 依赖优化
- `include` / `exclude` - 依赖包含/排除
- `force` - 强制重新优化

### ssr
- `external` / `noExternal` - 外部化
- `target` - SSR 目标

### worker
- `format` - 输出格式
- `plugins` - Worker 插件

## 使用说明

1. 每个配置项一个独立文件夹
2. 每个文件夹包含 `README.md`，按需包含：
   - **总叙述**：一句话说明配置是什么
   - **配置方式**：类型、默认值、语法示例
   - **进阶配置**：高级用法（如有）
   - **注意事项**：常见坑点（如有）
3. 所有代码示例带中文注释

## 版本信息

- 适用版本：Vite 8.x
- 文档来源：[Vite 官方文档](https://vitejs.dev/config/)
