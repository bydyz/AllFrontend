# manifest — 清单文件

控制是否生成 `manifest.json` 文件，该文件记录了源文件到构建产物的映射关系，常用于服务端集成。

## 配置方式

- **类型**: `boolean | string`
- **默认值**: `false`

```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    // 生成 manifest.json
    manifest: true,

    // 自定义文件名
    manifest: 'asset-manifest.json',

    // 禁用（默认）
    manifest: false,
  }
})
```

## manifest.json 结构

```json
{
  "src/main.js": {
    "file": "assets/main-[hash].js",
    "src": "src/main.js"
  },
  "src/style.css": {
    "file": "assets/main-[hash].css",
    "src": "src/style.css"
  },
  "node_modules/.vite/deps/vue.js": {
    "file": "assets/vendor-[hash].js"
  }
}
```

## 进阶配置

### 服务端集成示例

```javascript
// server.js (Node.js/Express)
import express from 'express'
import { createServer as createViteServer } from 'vite'

const app = express()

// 读取 manifest.json 来获取构建产物路径
const manifest = await import('./dist/manifest.json')

app.get('/', (req, res) => {
  const entryChunk = manifest.default['src/main.js']
  const cssChunk = manifest.default['src/style.css']

  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <link rel="stylesheet" href="/${cssChunk.file}">
    </head>
    <body>
      <div id="app"></div>
      <script type="module" src="/${entryChunk.file}"></script>
    </body>
    </html>
  `)
})
```

## 注意事项

- 清单文件位于 `outDir` 目录下
- 对于 SSR 应用特别有用，可以在服务端准确引用构建产物
- 文件名包含哈希值，便于缓存管理
- 适用于需要服务端渲染或传统服务端集成的场景
