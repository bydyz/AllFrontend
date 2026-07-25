# origin

配置在开发模式下生成资源 URL 时使用的源地址。

## 配置方式

- **类型**: `string`
- **默认值**: `''`

```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    // 使用默认源（相对路径）
    origin: '',

    // 使用完整的服务器地址
    origin: 'http://localhost:3000',

    // 使用 HTTPS 地址
    origin: 'https://dev.example.com',

    // 使用自定义域名
    origin: 'https://myapp.local'
  }
})
```

## 进阶配置

### 配合反向代理使用

```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    // 当通过反向代理访问时，设置正确的 origin
    origin: 'https://dev.myapp.com',

    // 配合 host 使用
    host: '0.0.0.0',
    port: 3000
  }
})
```

### 环境变量配置

```bash
# .env.development
VITE_ORIGIN=https://dev.example.com
```

### 动态 origin 配置

```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    origin: process.env.VITE_ORIGIN || 'http://localhost:5173'
  }
})
```

## 使用场景

### 场景一：本地开发通过局域网访问

```javascript
// vite.config.js
import { defineConfig } from 'vite'
import os from 'os'

// 获取本机 IP 地址
const networkInterfaces = os.networkInterfaces()
const localIP = Object.values(networkInterfaces)
  .flat()
  .find(ip => ip.family === 'IPv4' && !ip.internal)?.address

export default defineConfig({
  server: {
    host: '0.0.0.0',
    origin: `http://${localIP}:5173`
  }
})
```

### 场景二：Docker 容器内

```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    origin: 'http://localhost:3000',
    host: '0.0.0.0',
    port: 3000
  }
})
```

## 注意事项

- `origin` 只影响开发模式下的资源 URL 生成
- 不要包含路径部分（如 `/app`），只使用协议、主机和端口
- 在生产环境中，资源 URL 由构建配置决定
- 配置 `origin` 后，所有生成的资源 URL 都会使用该地址
