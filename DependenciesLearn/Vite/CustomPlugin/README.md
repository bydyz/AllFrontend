# Vite 自定义插件开发指南

> 渐进式学习路径：从基础概念到实际开发

## 目录

- [Vite 插件基础概念](#vite-插件基础概念)
- [插件钩子系统](#插件钩子系统)
- [渐进式学习路径](#渐进式学习路径)
- [调试技巧](#调试技巧)
- [性能优化](#性能优化)
- [插件类型分类](#插件类型分类)

---

## Vite 插件基础概念

### 1. 插件是什么？

Vite 插件是一个函数，接收一个 `config` 对象并返回一个插件对象。插件对象包含各种钩子函数，用于在构建生命周期的不同阶段执行特定操作。

```javascript
// 最简单的插件
function myPlugin() {
  return {
    name: 'my-plugin',
    // 钩子函数
  }
}
```

### 2. 插件系统架构

```
┌─────────────────────────────────────────────────────────────┐
│                    Vite 插件系统架构                        │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │                  Vite 核心引擎                       │   │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  │   │
│  │  │ 开发服务器  │  │  模块解析   │  │  热更新     │  │   │
│  │  └─────────────┘  └─────────────┘  └─────────────┘  │   │
│  └─────────────────────────────────────────────────────┘   │
│                           │                                 │
│                           ▼                                 │
│  ┌─────────────────────────────────────────────────────┐   │
│  │                  插件钩子系统                        │   │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  │   │
│  │  │  配置钩子   │  │  转换钩子   │  │  服务钩子   │  │   │
│  │  └─────────────┘  └─────────────┘  └─────────────┘  │   │
│  └─────────────────────────────────────────────────────┘   │
│                           │                                 │
│                           ▼                                 │
│  ┌─────────────────────────────────────────────────────┐   │
│  │                  插件执行流程                        │   │
│  │  1. 配置阶段 → 2. 转换阶段 → 3. 服务阶段            │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 插件钩子系统

### 钩子分类

```
┌─────────────────────────────────────────────────────────────┐
│                    Vite 插件钩子分类                        │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  配置钩子 (Config Hooks)                             │   │
│  │  • config - 修改 Vite 配置                          │   │
│  │  • configResolved - 配置解析完成                    │   │
│  │  • configureServer - 配置开发服务器                 │   │
│  │  • configurePreviewServer - 配置预览服务器          │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  转换钩子 (Transform Hooks)                          │   │
│  │  • resolveId - 解析模块 ID                          │   │
│  │  • load - 加载模块内容                              │   │
│  │  • transform - 转换模块代码                         │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  服务钩子 (Server Hooks)                             │   │
│  │  • configureServer - 添加中间件                     │   │
│  │  • handleHotUpdate - 处理 HMR                       │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  构建钩子 (Build Hooks)                              │   │
│  │  • buildStart - 构建开始                            │   │
│  │  • generateBundle - 生成输出文件                    │   │
│  │  • closeBundle - 构建完成                           │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 钩子执行顺序

```
开发模式:
┌──────────────┐
│ config       │ ← 配置阶段
├──────────────┤
│configResolved│
├──────────────┤
│configureServer│
├──────────────┤
│resolveId     │ ← 转换阶段（按需）
├──────────────┤
│load          │
├──────────────┤
│transform     │
└──────────────┘

构建模式:
┌──────────────┐
│ config       │
├──────────────┤
│configResolved│
├──────────────┤
│buildStart   │
├──────────────┤
│resolveId    │ ← 转换阶段
├──────────────┤
│load         │
├──────────────┤
│transform    │
├──────────────┤
│generateBundle│
├──────────────┤
│closeBundle  │
└──────────────┘
```

---

## 渐进式学习路径

### 阶段 1：最小化插件（5分钟）

从最简单的插件开始，理解插件的基本结构：

```javascript
// vite-plugin-hello.js
export default function helloPlugin() {
  return {
    name: 'vite-plugin-hello',
    configResolved(config) {
      console.log('🎯 插件已加载，项目根目录:', config.root)
    }
  }
}
```

**使用方式：**
```javascript
// vite.config.js
import { defineConfig } from 'vite'
import helloPlugin from './vite-plugin-hello'

export default defineConfig({
  plugins: [helloPlugin()]
})
```

### 阶段 2：带配置的插件（10分钟）

学习如何为插件添加配置选项：

```javascript
// vite-plugin-log.js
export default function logPlugin(options = {}) {
  const { prefix = '[LOG]', color = 'cyan' } = options
  
  return {
    name: 'vite-plugin-log',
    configResolved(config) {
      console.log(`${prefix} 插件配置完成`, { color })
    },
    transform(code, id) {
      // 只处理 .js 和 .ts 文件
      if (/\.(js|ts)$/.test(id)) {
        console.log(`${prefix} 转换文件: ${id}`)
      }
      return code
    }
  }
}
```

**使用方式：**
```javascript
// vite.config.js
import logPlugin from './vite-plugin-log'

export default defineConfig({
  plugins: [
    logPlugin({ 
      prefix: '[MY_APP]',
      color: 'green' 
    })
  ]
})
```

### 阶段 3：实际功能插件（30分钟）

创建一个实际有用的插件 - 自动注入环境变量：

```javascript
// vite-plugin-env-inject.js
import fs from 'fs'
import path from 'path'

export default function envInjectPlugin(options = {}) {
  const { envFile = '.env', prefix = 'VITE_' } = options
  
  return {
    name: 'vite-plugin-env-inject',
    configResolved(config) {
      const envPath = path.resolve(config.root, envFile)
      if (fs.existsSync(envPath)) {
        const envContent = fs.readFileSync(envPath, 'utf-8')
        const envVars = {}
        
        envContent.split('\n').forEach(line => {
          const [key, ...valueParts] = line.split('=')
          if (key && key.startsWith(prefix)) {
            envVars[key.trim()] = valueParts.join('=').trim()
          }
        })
        
        console.log('🌍 已注入环境变量:', Object.keys(envVars))
      }
    }
  }
}
```

### 阶段 4：转换类插件（1小时）

创建一个 Markdown 转换插件：

```javascript
// vite-plugin-markdown.js
import { marked } from 'marked'

export default function markdownPlugin(options = {}) {
  return {
    name: 'vite-plugin-markdown',
    transform(code, id) {
      // 只处理 .md 文件
      if (!id.endsWith('.md')) return
      
      // 转换 Markdown 为 HTML
      const html = marked(code)
      
      // 导出为 Vue 组件
      return `
        <template>
          <div v-html="${html}"></div>
        </template>
        <script>
        export default {
          name: 'MarkdownComponent'
        }
        </script>
      `
    }
  }
}
```

### 阶段 5：服务插件（1小时）

创建一个 API 代理插件：

```javascript
// vite-plugin-api-proxy.js
import { createProxyMiddleware } from 'http-proxy-middleware'

export default function apiProxyPlugin(options = {}) {
  const { target = 'http://localhost:3000', pathFilter = '/api' } = options
  
  return {
    name: 'vite-plugin-api-proxy',
    configureServer(server) {
      server.middlewares.use(
        pathFilter,
        createProxyMiddleware({
          target,
          changeOrigin: true,
          pathRewrite: {
            '^/api': ''
          }
        })
      )
    }
  }
}
```

---

## 调试技巧

### 1. 使用调试标志

```bash
# 启用 Vite 调试模式
npx vite --debug

# 或者在配置中
export default defineConfig({
  logLevel: 'info',
  clearScreen: false
})
```

### 2. 插件调试模板

```javascript
// vite-plugin-debug.js
export default function debugPlugin() {
  return {
    name: 'vite-plugin-debug',
    config(config, { command }) {
      console.log('🔧 Config hook:', { command })
      return config
    },
    configResolved(config) {
      console.log('✅ Config resolved:', config.mode)
    },
    transform(code, id) {
      if (id.includes('main')) {
        console.log('🔄 Transforming:', id)
      }
      return code
    }
  }
}
```

### 3. 断点调试

在插件代码中使用 `debugger` 语句：

```javascript
transform(code, id) {
  if (id.includes('important-file')) {
    debugger // 会在 Node.js 调试器中暂停
  }
  return code
}
```

然后使用：
```bash
node --inspect node_modules/.bin/vite
```

### 4. 日志级别控制

```javascript
// 使用 Vite 内置日志
import { createLogger } from 'vite'

export default function logPlugin() {
  let logger
  
  return {
    name: 'vite-plugin-log',
    configResolved(config) {
      logger = config.logger
    },
    transform(code, id) {
      // 不同级别的日志
      logger.info(`处理文件: ${id}`)
      logger.warn(`警告信息`)
      logger.error(`错误信息`)
      logger.debug(`调试信息`)
      
      return code
    }
  }
}
```

---

## 性能优化

### 1. 避免不必要的转换

```javascript
// 好的做法
transform(code, id) {
  // 只处理特定文件
  if (!id.endsWith('.vue')) return
  
  // 只在必要时处理
  if (!code.includes('template')) return
  
  return transformedCode
}
```

### 2. 使用缓存

```javascript
// vite-plugin-cache.js
const cache = new Map()

export default function cachePlugin() {
  return {
    name: 'vite-plugin-cache',
    transform(code, id) {
      if (cache.has(id)) {
        return cache.get(id)
      }
      
      const result = heavyTransform(code)
      cache.set(id, result)
      return result
    }
  }
}
```

### 3. 异步处理

```javascript
// 异步转换
async transform(code, id) {
  if (!id.endsWith('.md')) return
  
  // 异步操作不会阻塞主线程
  const html = await markedAsync(code)
  return html
}
```

### 4. 条件编译

```javascript
// vite-plugin-conditional.js
export default function conditionalPlugin() {
  return {
    name: 'vite-plugin-conditional',
    transform(code, id) {
      // 生产环境才执行的逻辑
      if (process.env.NODE_ENV === 'production') {
        return optimizeCode(code)
      }
      
      // 开发环境的逻辑
      return addDevTools(code)
    }
  }
}
```

---

## 插件类型分类

### 1. 转换类插件

处理代码转换、编译、压缩等：

- **文件格式转换**：Markdown、TypeScript、JSX
- **代码优化**：压缩、混淆、tree-shaking
- **代码注入**：环境变量、全局组件

### 2. 服务类插件

扩展开发服务器功能：

- **API 代理**：跨域请求转发
- **中间件**：认证、日志、缓存
- **WebSocket**：实时通信支持

### 3. 构建类插件

优化构建流程：

- **代码分割**：按需加载
- **资源处理**：图片压缩、SVG 优化
- **构建分析**：bundle 分析、性能报告

### 4. 通用工具插件

辅助功能：

- **日志系统**：构建日志、错误报告
- **自动化**：代码生成、文件监听
- **测试支持**：单元测试、集成测试

---

## 下一步学习

1. **创建一个完整的转换插件**（如 Markdown 转换器）
2. **创建服务插件**（如 API 代理）
3. **分析现有插件源码**（如 `@vitejs/plugin-vue`）
4. **插件测试和发布**

---

## 参考资源

- [Vite 官方插件文档](https://vitejs.dev/guide/api-plugin.html)
- [Vite 插件 API](https://vitejs.dev/dev/api.html)
- [Rollup 插件文档](https://rollupjs.org/plugin-development/)
- [Awesome Vite Plugins](https://github.com/vitejs/awesome-vite#plugins)
