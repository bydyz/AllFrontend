# envPrefix - 环境变量前缀

指定哪些环境变量会被暴露到客户端代码中。

## 配置方式

- **类型**: `string | string[]`
- **默认值**: `'VITE_'`

```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  // 暴露 VITE_ 开头的环境变量
  envPrefix: 'VITE_',
})
```

## 进阶配置

使用多个前缀：

```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  // 暴露 VITE_ 和 PUBLIC_ 开头的环境变量
  envPrefix: ['VITE_', 'PUBLIC_'],
})
```

自定义前缀：

```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  // 只暴露 APP_ 开头的环境变量
  envPrefix: 'APP_',
})
```

使用示例：

```bash
# .env 文件
VITE_API_URL=https://api.example.com
VITE_APP_TITLE=My App
PUBLIC_CDN_URL=https://cdn.example.com
SECRET_KEY=secret  # 不会被暴露
```

```javascript
// 在代码中访问
console.log(import.meta.env.VITE_API_URL)
console.log(import.meta.env.PUBLIC_CDN_URL)
```

## 注意事项

- 默认只暴露 `VITE_` 开头的环境变量
- 环境变量在构建时会被静态替换
- 不要暴露敏感信息到客户端
- 使用 `string[]` 可以配置多个前缀
- 前缀匹配是精确的，`VITE_` 不会匹配 `VITEAPP`
