# json - JSON 配置

配置 Vite 处理 JSON 文件的行为。

## 子配置一览

| 配置项 | 说明 |
|--------|------|
| [namedExports](./namedExports/) | 命名导出 |
| [stringify](./stringify/) | 序列化方式 |

## 配置示例

```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  json: {
    // 启用命名导出
    namedExports: true,
    // 自动序列化大型 JSON
    stringify: 'auto',
  },
})
```

## 注意事项

- JSON 文件默认会开启命名导出
- `stringify: 'auto'` 会自动优化大型 JSON 文件
- 命名导出允许直接导入 JSON 的属性
