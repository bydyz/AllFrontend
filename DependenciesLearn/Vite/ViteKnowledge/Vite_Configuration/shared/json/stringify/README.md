# json.stringify - 序列化方式

配置 JSON 文件的序列化方式，优化大型 JSON 文件的加载性能。

## 配置方式

- **类型**: `boolean | 'auto'`
- **默认值**: `'auto'`

```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  json: {
    stringify: 'auto',
  },
})
```

## 进阶配置

三种序列化模式：

```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  json: {
    // 'auto'：默认，大型 JSON 文件自动使用 JSON.stringify
    stringify: 'auto',

    // true：始终使用 JSON.stringify（优化性能）
    // stringify: true,

    // false：始终使用原始导入（保持原样）
    // stringify: false,
  },
})
```

## 注意事项

- `'auto'`：默认模式，Vite 会自动判断是否优化
- `true`：始终使用 `JSON.stringify` 转换，减少请求大小
- `false`：始终使用原始 JSON 导入方式
- 大型 JSON 文件建议使用 `'auto'` 或 `true`
- 使用 `JSON.stringify` 后，JSON 文件作为 ES Module 导出，支持 Tree Shaking
