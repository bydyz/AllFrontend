# preview.host

指定预览服务器监听的主机名或 IP 地址。

## 配置方式

- **类型**: `string | boolean`
- **默认值**: 继承自 `server.host`（通常为 `'localhost'`）

```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  preview: {
    host: '0.0.0.0',  // 监听所有网络接口，允许局域网访问
  },
})
```

## 进阶配置

设置为 `'0.0.0.0'` 后，同局域网的其他设备可以通过 `http://<你的IP>:4173` 访问预览服务。

## 注意事项

- 如果 `server.host` 已经设置了 `true`（自动检测 IP），preview 默认也会自动检测
- 在 CI/CD 环境中，通常设置为 `'0.0.0.0'` 以便容器外部访问
