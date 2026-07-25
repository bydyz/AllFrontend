# allowedHosts

控制哪些主机名可以访问开发服务器，用于防止 DNS 重绑定攻击。

## 配置方式

- **类型**: `string[] | true`
- **默认值**: `[]`

```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    // 默认只允许 localhost
    allowedHosts: [],

    // 允许指定的主机名
    allowedHosts: ['example.com', 'dev.local'],

    // 允许所有主机名（不推荐生产使用）
    allowedHosts: true,

    // 使用通配符匹配
    allowedHosts: ['*.example.com']
  }
})
```

## 进阶配置

### 配合 host 使用

```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    host: '0.0.0.0',        // 监听所有地址
    allowedHosts: [          // 但只允许特定主机名访问
      'myapp.local',
      '*.dev.example.com'
    ]
  }
})
```

### 环境变量配置

```bash
# .env.development
VITE_ALLOWED_HOSTS=myapp.local,dev.example.com
```

## 注意事项

- 默认情况下，Vite 只允许 `localhost` 访问，这是为了防止 DNS 重绑定攻击
- 设为 `true` 会禁用主机名检查，存在安全风险
- 通配符 `*` 只能匹配一级子域名，如 `*.example.com` 匹配 `a.example.com`，但不匹配 `a.b.example.com`
