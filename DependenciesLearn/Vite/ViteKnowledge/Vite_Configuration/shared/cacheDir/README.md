# cacheDir - 缓存目录

指定 Vite 的缓存目录，用于存储预构建依赖的缓存文件。

## 配置方式

- **类型**: `string`
- **默认值**: `"node_modules/.vite"`

```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  // 自定义缓存目录
  cacheDir: '.vite-cache',
})
```

## 进阶配置

使用绝对路径：

```javascript
// vite.config.js
import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
  // 将缓存放在项目根目录外
  cacheDir: path.resolve(__dirname, '../.vite-cache'),
})
```

## 注意事项

- 缓存目录包含预构建依赖的打包结果
- 删除缓存目录会触发重新预构建
- 建议将缓存目录加入 `.gitignore`
- 多个项目共享缓存目录可能导致冲突
- 在 CI/CD 环境中建议禁用缓存或使用独立缓存目录
