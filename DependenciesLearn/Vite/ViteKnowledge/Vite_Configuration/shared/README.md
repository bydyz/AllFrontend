# 共享配置 (Shared)

共享配置是 Vite 中所有构建模式（开发/构建）通用的配置项，它们影响项目的基础行为、路径解析、资源处理等核心功能。

## 子配置一览

| 配置项 | 说明 |
|--------|------|
| [root](./root/) | 项目根目录 |
| [base](./base/) | 公共基础路径 |
| [mode](./mode/) | 模式 |
| [define](./define/) | 全局常量替换 |
| [publicDir](./publicDir/) | 静态资源目录 |
| [cacheDir](./cacheDir/) | 缓存目录 |
| [resolve](./resolve/) | 路径解析配置 |
| [html](./html/) | HTML 相关配置 |
| [css](./css/) | CSS 相关配置 |
| [json](./json/) | JSON 相关配置 |
| [oxc](./oxc/) | Oxc 转换器 |
| [assetsInclude](./assetsInclude/) | 静态资源包含 |
| [logLevel](./logLevel/) | 日志级别 |
| [customLogger](./customLogger/) | 自定义日志 |
| [clearScreen](./clearScreen/) | 清屏 |
| [envDir](./envDir/) | 环境变量目录 |
| [envPrefix](./envPrefix/) | 环境变量前缀 |
| [appType](./appType/) | 应用类型 |
| [devtools](./devtools/) | 开发工具 |
| [future](./future/) | 未来特性 |

## 配置示例

```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  // 项目根目录
  root: process.cwd(),
  // 公共基础路径
  base: '/',
  // 模式
  mode: 'development',
  // 全局常量替换
  define: {
    __APP_VERSION__: JSON.stringify('1.0.0'),
  },
  // 静态资源目录
  publicDir: 'public',
  // 缓存目录
  cacheDir: 'node_modules/.vite',
})
```

## 注意事项

- 共享配置在开发和生产构建中都会生效
- 部分配置（如 `define`）会被注入到客户端代码中，注意不要暴露敏感信息
- `root` 配置会影响其他路径配置的解析基准
