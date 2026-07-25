# preview.https

配置预览服务器使用 HTTPS 协议。

## 配置方式

- **类型**: `boolean | https.ServerOptions`
- **默认值**: 继承自 `server.https`

```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  preview: {
    https: true,  // 使用自签名证书启用 HTTPS
  },
})
```

## 进阶配置

可以传入完整的 HTTPS 服务器选项：

```javascript
import fs from 'fs'

export default defineConfig({
  preview: {
    https: {
      key: fs.readFileSync('certs/key.pem'),   // 私钥文件
      cert: fs.readFileSync('certs/cert.pem'), // 证书文件
    },
  },
})
```

## 注意事项

- 设置 `true` 会使用 Vite 内置的自签名证书，浏览器会提示不安全
- 生产环境建议使用正式的 SSL 证书
- 在本地开发中可以用 `@vitejs/plugin-basic-ssl` 插件自动生成证书
