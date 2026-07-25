# resolve.tsconfigPaths - tsconfig 路径

是否从 `tsconfig.json` 的 `compilerOptions.paths` 中读取路径别名。

## 配置方式

- **类型**: `boolean`
- **默认值**: `false`

```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  resolve: {
    tsconfigPaths: true,
  })
})
```

## 进阶配置

配合 `tsconfig.json` 使用：

```json
// tsconfig.json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@components/*": ["src/components/*"],
      "@utils/*": ["src/utils/*"]
    }
  }
}
```

无需在 `vite.config.js` 中重复配置别名：

```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  resolve: {
    // 自动读取 tsconfig.json 中的 paths 配置
    tsconfigPaths: true,
  },
})
```

## 注意事项

- 开启后会自动读取 `tsconfig.json` 中的 `paths` 配置
- 需要项目中存在 `tsconfig.json` 文件
- 如果同时配置了 `resolve.alias`，两者会合并
- 可以减少配置重复，保持 TypeScript 和 Vite 配置一致
- 需要 Vite 4.0+ 版本支持
