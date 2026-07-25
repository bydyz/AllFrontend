# html.cspNonce - CSP nonce 值

设置 Content Security Policy 的 nonce 值，用于内联脚本和样式。

## 配置方式

- **类型**: `string`

```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  html: {
    cspNonce: 'a1b2c3d4e5f6',
  },
})
```

## 进阶配置

动态生成 nonce 值：

```javascript
// vite.config.js
import { defineConfig } from 'vite'
import crypto from 'crypto'

export default defineConfig({
  html: {
    // 每次构建生成随机 nonce
    cspNonce: crypto.randomBytes(16).toString('hex'),
  },
})
```

配合 CSP 头使用：

```
Content-Security-Policy: script-src 'nonce-a1b2c3d4e5f6' 'unsafe-inline'
```

## 注意事项

- nonce 值需要与服务器返回的 CSP 头中的 nonce 一致
- 每次页面加载应该使用不同的 nonce 值
- 用于允许内联 `<script>` 和 `<style>` 标签
- 开发环境和生产环境可能需要不同的 nonce 策略
