# https

配置 HTTPS / TLS，启用加密连接。常用于本地开发需要 HTTPS 的场景。

## 配置方式

- **类型**: `https.ServerOptions`
- **默认值**: `{}`

```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    // 启用 HTTPS（自动生成自签名证书）
    https: true,

    // 使用自定义证书
    https: {
      key: fs.readFileSync('path/to/private-key.pem'),
      cert: fs.readFileSync('path/to/certificate.pem')
    },

    // 空对象也会启用 HTTPS（使用自签名证书）
    https: {}
  }
})
```

## 进阶配置

### 使用 mkcert 生成本地证书

```bash
# 安装 mkcert
brew install mkcert  # macOS
choco install mkcert # Windows

# 创建本地 CA
mkcert -install

# 生成证书
mkcert localhost 127.0.0.1 ::1
```

### 完整的 TLS 配置示例

```javascript
// vite.config.js
import { defineConfig } from 'vite'
import fs from 'fs'

export default defineConfig({
  server: {
    https: {
      key: fs.readFileSync('./certs/localhost-key.pem'),
      cert: fs.readFileSync('./certs/localhost.pem'),
      // 可选：指定 TLS 版本
      minVersion: 'TLSv1.2'
    }
  }
})
```

### 配合 CLI 参数

```bash
# 启用 HTTPS
vite --https
```

## 注意事项

- 不提供证书时，Vite 会使用 `@vitejs/plugin-basic-ssl` 自动生成自签名证书
- 自签名证书在浏览器中会显示安全警告，需要手动信任
- 生产环境应使用正式的 SSL 证书
- 环境变量 `VITE_HTTPS=true` 可启用 HTTPS
