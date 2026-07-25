# allow

指定允许访问的额外文件路径，配合 `strict: true` 使用。

## 配置方式

- **类型**: `string[]`
- **默认值**: `[]`

```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    fs: {
      strict: true,
      allow: [
        // 允许访问共享组件目录
        '/shared-components',

        // 允许访问公共工具目录
        '/common-utils',

        // 允许访问 monorepo 中的其他包
        '../shared-package/src'
      ]
    }
  }
})
```

## 进阶配置

### Monorepo 场景

```javascript
// vite.config.js
import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
  server: {
    fs: {
      strict: true,
      allow: [
        // 允许访问 monorepo 根目录
        path.resolve(__dirname, '../'),

        // 允许访问共享包
        path.resolve(__dirname, '../packages/shared'),

        // 允许访问公共样式
        path.resolve(__dirname, '../common/styles')
      ]
    }
  }
})
```

### 使用 glob 模式

```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    fs: {
      strict: true,
      allow: [
        // 允许所有 packages 目录下的文件
        '../packages/**',

        // 允许 common 目录下的所有 TypeScript 文件
        '../common/**/*.ts'
      ]
    }
  }
})
```

### 动态路径配置

```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    fs: {
      strict: true,
      allow: [
        // 根据环境变量动态添加路径
        process.env.SHARED_DIR || '/shared'
      ]
    }
  }
})
```

## 注意事项

- `allow` 列表中的路径可以是绝对路径或相对路径
- 相对路径相对于项目根目录解析
- 即使路径在 `allow` 中，如果在 `deny` 中也会被拒绝
- 在生产环境中，`allow` 配置同样生效
