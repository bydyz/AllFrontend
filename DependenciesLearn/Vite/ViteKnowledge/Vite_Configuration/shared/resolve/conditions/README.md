# resolve.conditions - 条件导出

配置 Node.js 条件导出的匹配条件，影响模块解析。

## 配置方式

- **类型**: `string[]`
- **默认值**: `['module', 'browser', 'development|production']`（开发/生产模式自动切换）

```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  resolve: {
    conditions: ['module', 'browser'],
  },
})
```

## 进阶配置

添加自定义条件：

```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  resolve: {
    conditions: [
      'module',
      'browser',
      'development', // 或 'production'
      // 自定义条件
      'custom:server',
      'import',
      'require',
    ],
  },
})
```

对应 `package.json` 中的 `exports` 字段：

```json
{
  "name": "my-package",
  "exports": {
    ".": {
      "browser": "./dist/browser.js",
      "module": "./dist/esm.js",
      "require": "./dist/cjs.js",
      "default": "./dist/index.js"
    }
  }
}
```

## 注意事项

- 条件按顺序匹配，第一个匹配的条件生效
- `development` 和 `production` 根据当前模式自动选择
- 自定义条件需要配合包的 `exports` 字段使用
- 会影响第三方依赖的解析结果
