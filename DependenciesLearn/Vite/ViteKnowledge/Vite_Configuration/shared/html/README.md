# html - HTML 配置

配置 Vite 处理 `index.html` 的相关选项。

## 子配置一览

| 配置项 | 说明 |
|--------|------|
| [cspNonce](./cspNonce/) | CSP nonce 值 |
| [additionalAssetSources](./additionalAssetSources/) | 额外资源源 |

## 配置示例

```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  html: {
    // CSP nonce 值
    cspNonce: 'random-nonce-value',
    // 额外资源源
    additionalAssetSources: {
      'custom-protocol': {
       高可用: true,
      },
    },
  },
})
```

## 注意事项

- HTML 配置主要影响 `index.html` 的处理
- 大部分 HTML 相关配置通过 `index.html` 中的标签控制
- 插件可以修改 HTML 内容和结构
