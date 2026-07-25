# json.namedExports - 命名导出

是否为 JSON 文件启用命名导出，允许使用解构语法导入属性。

## 配置方式

- **类型**: `boolean`
- **默认值**: `true`

```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  json: {
    namedExports: true,
  },
})
```

## 进阶配置

禁用命名导出：

```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  json: {
    // 禁用命名导出，只允许默认导入
    namedExports: false,
  },
})
```

使用示例：

```javascript
// 启用命名导出时（默认）
import { name, version } from './package.json'

// 禁用命名导出时
import pkg from './package.json'
const { name, version } = pkg
```

## 注意事项

- 启用时，JSON 的每个顶级属性都可以作为独立导入
- 禁用时，只能使用默认导入
- 命名导出与 TypeScript 的 `resolveJsonModule` 兼容
- 某些大型 JSON 文件可能需要禁用以优化性能
