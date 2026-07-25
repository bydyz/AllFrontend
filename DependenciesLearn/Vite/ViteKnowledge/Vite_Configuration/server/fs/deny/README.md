# deny

指定禁止访问的文件模式，优先级高于 `allow`。

## 配置方式

- **类型**: `string[]`
- **默认值**: `['.env', '.env.*', '*.{pem,key,crt}']`

```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    fs: {
      deny: [
        // 环境变量文件（默认已包含）
        '.env',
        '.env.*',

        // 证书和密钥文件（默认已包含）
        '*.{pem,key,crt}',

        // 其他敏感文件
        '**/*.secret',
        '**/secrets/**',

        // 数据库配置
        'config/database.yml'
      ]
    }
  }
})
```

## 进阶配置

### 自定义拒绝模式

```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    fs: {
      deny: [
        // 环境变量文件
        '.env',
        '.env.local',
        '.env.*.local',

        // 证书和密钥
        '*.pem',
        '*.key',
        '*.crt',

        // 敏感配置文件
        '**/credentials/**',
        '**/secrets/**',

        // 数据库配置
        'database.yml',
        'db/**/*.sqlite',

        // 日志文件（防止泄露敏感信息）
        '**/*.log'
      ]
    }
  }
})
```

### 配合 allow 使用

```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    fs: {
      strict: true,
      allow: [
        '/shared-components',
        '/common-utils'
      ],
      deny: [
        // 即使路径在 allow 中，也会被拒绝
        '/shared-components/**/*.secret'
      ]
    }
  }
})
```

## 优先级规则

```
请求路径
    ↓
检查 deny 列表 → 匹配 → ❌ 拒绝
    ↓
检查 allow 列表 → 匹配 → ✅ 允许
    ↓
默认拒绝
```

## 注意事项

- `deny` 的优先级高于 `allow`
- 默认的 `deny` 列表已包含敏感文件，建议不要完全覆盖
- 使用 glob 模式可以精确控制拒绝范围
- 修改 `deny` 配置后需要重启开发服务器
- 生产环境同样会应用 `deny` 规则
