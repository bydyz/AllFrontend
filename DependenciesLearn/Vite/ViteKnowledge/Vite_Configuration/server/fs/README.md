# fs

文件系统限制配置，控制 Vite 服务器允许访问的文件范围。

## 配置概览

| 配置项 | 说明 |
|--------|------|
| [strict](./strict/) | 严格模式，限制项目根目录外的文件访问 |
| [allow](./allow/) | 允许列表，指定额外可访问的路径 |
| [deny](./deny/) | 拒绝列表，指定禁止访问的文件模式 |

## 基础用法

```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    fs: {
      strict: true,      // 启用严格模式
      allow: [           // 允许访问的路径
        '/path/to/allowed/dir'
      ],
      deny: [            // 拒绝访问的模式
        '.env',
        '.env.*',
        '**/secrets/**'
      ]
    }
  }
})
```

## 安全机制

```
客户端请求文件
    ↓
检查是否在 strict 模式下
    ↓
检查路径是否在 allow 列表中
    ↓
检查路径是否在 deny 列表中
    ↓
返回文件或拒绝访问
```

## 注意事项

- `fs` 配置在开发和生产环境中都生效
- 默认的 `deny` 列表包含 `.env` 等敏感文件
- 在 monorepo 项目中，可能需要配置 `allow` 以访问其他包的文件
- 严格模式下，访问项目根目录外的文件会被拒绝
