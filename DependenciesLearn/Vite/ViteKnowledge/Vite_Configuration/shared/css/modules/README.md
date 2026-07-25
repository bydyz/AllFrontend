# css.modules - CSS Modules 配置

配置 CSS Modules 的行为，包括命名约定、作用域等。

## 配置方式

- **类型**: `CSSModulesOptions`

```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  css: {
    modules: {
      // 使用 camelCase 命名
      localsConvention: 'camelCase',
      // 生成唯一的类名
      generateScopedName: '[name]__[local]___[hash:base64:5]',
    },
  },
})
```

## 进阶配置

完整的 CSS Modules 配置：

```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  css: {
    modules: {
      // 命名约定：camelCase、camelCaseOnly、dashes、dashesOnly
      localsConvention: 'camelCaseOnly',
      // 作用域行为：local、global、pure
      scopeBehaviour: 'local',
      // 生成类名的模式
      generateScopedName: '[name]__[local]___[hash:base64:5]',
      // 全局模式下的文件名模式
      globalModulePaths: /global\.css$/,
      // 启用命名导出
      exportsOnly: false,
    },
  },
})
```

## 注意事项

- 文件名包含 `.module.` 时自动启用 CSS Modules
- `localsConvention` 控制导出的类名格式
- `scopeBehaviour: 'global'` 可以全局启用 CSS Modules
- 配合 TypeScript 需要声明类型
