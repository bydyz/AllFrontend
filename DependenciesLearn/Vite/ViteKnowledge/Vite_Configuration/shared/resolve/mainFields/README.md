# resolve.mainFields - 主字段

配置从 `package.json` 中读取的字段顺序，决定使用哪个入口文件。

## 配置方式

- **类型**: `string[]`
- **默认值**: `['browser', 'module', 'jsnext:main', 'jsnext']`

```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  resolve: {
    mainFields: ['browser', 'module', 'main'],
  },
})
```

## 进阶配置

针对特定场景调整：

```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  resolve: {
    mainFields: [
      'browser',  // 浏览器版本
      'module',   // ES Module 版本
      'main',     // CommonJS 版本
    ],
  },
})
```

对应的 `package.json` 结构：

```json
{
  "name": "my-package",
  "browser": "./dist/browser.js",
  "module": "./dist/esm.js",
  "main": "./dist/cjs.js"
}
```

## 注意事项

- 按顺序匹配，第一个存在的字段会被使用
- `browser` 字段优先级最高，通常用于浏览器专用版本
- `module` 字段提供 ES Module 版本，支持 Tree Shaking
- `main` 字段是传统的 CommonJS 入口
- 修改此配置可能影响依赖解析结果
