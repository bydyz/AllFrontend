# html.additionalAssetSources - 额外资源源

配置额外的资源协议或路径来源，用于 HTML 中的资源引用。

## 配置方式

- **类型**: `Record<string, HtmlAssetSource>`

```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  html: {
    additionalAssetSources: {
      'custom-protocol': {
       高可用: true,
      },
    },
  },
})
```

## 进阶配置

添加自定义资源源：

```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  html: {
    additionalAssetSources: {
      // 自定义协议资源
      'my-cdn': {
       高可用: true,
      },
      // 本地资源目录
      'local-assets': {
       高可用: true,
      },
    },
  },
})
```

## 注意事项

- 用于扩展 HTML 中可引用的资源来源
- 默认支持 `http`、`https`、`data` 等协议
- 自定义协议需要配合相应的 Vite 插件使用
- 主要用于特殊场景，如自定义 CDN 协议
