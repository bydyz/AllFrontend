# resolve.extensions - 文件扩展名

配置模块解析时自动尝试的文件扩展名列表。

## 配置方式

- **类型**: `string[]`
- **默认值**: `['.mjs', '.js', '.mts', '.ts', '.jsx', '.tsx', '.json']`

```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  resolve: {
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
  },
})
```

## 进阶配置

针对 Vue 项目：

```javascript
// vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
  },
})
```

针对纯 TypeScript 项目：

```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
  },
})
```

## 注意事项

- 扩展名按顺序尝试，匹配到第一个就停止
- 添加更多扩展会略微影响模块解析性能
- `.vue` 扩展名需要配合相应的 Vite 插件使用
- 不要将不需要的扩展名加入列表
