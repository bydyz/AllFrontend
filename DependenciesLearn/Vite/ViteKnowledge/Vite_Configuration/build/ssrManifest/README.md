# ssrManifest — SSR 清单

控制是否生成 SSR 清单文件。该清单记录了模块到 chunk 的映射关系，用于服务端渲染时预加载模块。

## 配置方式

- **类型**: `boolean | string`
- **默认值**: `false`

```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    // 生成 SSR 清单
    ssrManifest: true,

    // 自定义文件名
    ssrManifest: 'ssr-manifest.json',

    // 禁用（默认）
    ssrManifest: false,
  }
})
```

## 进阶配置

### SSR 清单使用示例

```javascript
// 服务端渲染代码
import { createSSRApp } from 'vue'
import { renderToString } from 'vue/server-renderer'
import manifest from './dist/ssr-manifest.json'

async function render(url) {
  const app = createSSRApp(App)

  // 根据 URL 获取需要预加载的模块
  const matchedModules = getMatchedModules(url)
  const preloadLinks = matchedModules
    .map(mod => manifest[mod])
    .filter(Boolean)
    .map(chunk => `<link rel="modulepreload" href="/${chunk.file}">`)
    .join('\n')

  const html = await renderToString(app)

  return `
    <!DOCTYPE html>
    <html>
    <head>
      ${preloadLinks}
    </head>
    <body>
      <div id="app">${html}</div>
    </body>
    </html>
  `
}
```

## 注意事项

- SSR 清单与 `manifest` 不同，它映射的是模块 ID 到 chunk 文件
- 主要用于 SSR 预加载优化，减少客户端水合时的请求
- 适用于 Vue、React 等框架的 SSR 场景
- 清单文件位于 `outDir` 目录下
