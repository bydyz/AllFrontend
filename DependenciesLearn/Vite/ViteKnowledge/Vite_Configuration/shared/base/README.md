# base - 公共基础路径

设置生产构建时公共基础路径，用于生成资源的 URL 前缀。

## 配置方式

- **类型**: `string`
- **默认值**: `'/'`

```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  // 部署到子路径时使用
  base: '/my-app/',
})
```

## 进阶配置

根据部署环境动态设置 `base`：

```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  // 开发环境使用根路径，生产环境使用子路径
  base: process.env.NODE_ENV === 'production' ? '/dist/' : '/',
})
```

使用环境变量控制：

```javascript
// vite.config.js
import { defineConfig, loadEnv } from 'vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    base: env.VITE_BASE_PATH || '/',
  }
})
```

## 注意事项

- 开发模式下 `base` 不生效，始终为 `/`
- 使用相对路径 `./` 可以适应任意部署路径
- CDN 部署时建议设置为 CDN 地址或子路径
