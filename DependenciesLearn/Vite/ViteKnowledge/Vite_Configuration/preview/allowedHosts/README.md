# preview.allowedHosts

限制预览服务器允许访问的主机名列表，防止 DNS 重绑定攻击。

## 配置方式

- **类型**: `string[] | true`
- **默认值**: 继承自 `server.allowedHosts`

```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  preview: {
    // 只允许特定域名访问
    allowedHosts: ['example.com', 'staging.example.com'],
  },
})
```

## 进阶配置

设置为 `true` 时允许所有主机名访问（不推荐在生产环境使用）。

```javascript
export default defineConfig({
  preview: {
    allowedHosts: true,  // 允许所有主机（仅限开发环境）
  },
})
```

## 注意事项

- 这是 Vite 6.1+ 引入的安全特性
- 如果不需要主机名限制，可设置为 `true`
- 该配置继承自 `server.allowedHosts`，preview 无需单独设置
