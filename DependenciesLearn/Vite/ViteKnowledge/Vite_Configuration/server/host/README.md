# host

指定开发服务器监听的网络地址。用于控制服务器可被哪些网络访问。

## 配置方式

- **类型**: `string | boolean`
- **默认值**: `'localhost'`

```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    // 默认只监听 localhost（仅本机可访问）
    host: 'localhost',

    // 监听所有网络接口，允许局域网内其他设备访问
    host: '0.0.0.0',

    // 等同于 '0.0.0.0'，监听所有地址
    host: true,

    // 指定特定 IP 地址
    host: '192.168.1.100'
  }
})
```

## 进阶配置

### 通过环境变量设置

```bash
# .env.development
VITE_HOST=0.0.0.0
```

### 配合 --host CLI 参数

```bash
# 命令行方式启动，监听所有地址
vite --host 0.0.0.0

# 或简写
vite --host
```

## 注意事项

- 设为 `true` 或 `'0.0.0.0'` 时，局域网内所有设备都可以访问开发服务器
- 在公共网络环境下，请勿设置为监听所有地址，以防安全风险
- 配合 `allowedHosts` 可进一步控制允许访问的主机名
