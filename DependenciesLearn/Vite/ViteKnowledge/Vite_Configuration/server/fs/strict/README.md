# strict

启用严格模式，限制只能访问项目根目录下的文件。

## 配置方式

- **类型**: `boolean`
- **默认值**: `true`

```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    fs: {
      // 启用严格模式（默认）
      strict: true,

      // 禁用严格模式（允许访问项目根目录外的文件）
      strict: false
    }
  }
})
```

## 进阶配置

### 配合 allow 使用

```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    fs: {
      strict: true,  // 启用严格模式

      // 但允许访问特定的外部路径
      allow: [
        '/shared-components',  // 共享组件目录
        '/common-utils'        // 公共工具目录
      ]
    }
  }
})
```

## 工作原理

```
strict: true
    ↓
客户端请求: /src/components/App.vue
    ↓
检查路径是否在项目根目录内
    ↓
✅ 允许访问

客户端请求: /etc/passwd
    ↓
检查路径是否在项目根目录内
    ↓
❌ 拒绝访问
```

## 注意事项

- 严格模式是安全默认设置，防止恶意文件访问
- 禁用严格模式会暴露服务器文件系统，存在安全风险
- 在 monorepo 中访问其他包的文件时，使用 `allow` 而不是禁用 `strict`
- 如果确实需要访问项目外的文件，确保只添加必要的路径到 `allow`
