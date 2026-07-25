# chunkImportMap — Chunk Import Map

控制是否为动态导入的 chunk 生成 import map。这是一个实验性功能。

## 配置方式

- **类型**: `boolean`
- **默认值**: `false`

```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    // 启用 Chunk Import Map
    chunkImportMap: true,

    // 禁用（默认）
    chunkImportMap: false,
  }
})
```

## 进阶配置

启用后，Vite 会生成一个 JSON 文件，描述 chunk 之间的依赖关系：

```json
{
  "./chunk-a.js": ["./chunk-b.js", "./chunk-c.js"],
  "./chunk-b.js": []
}
```

可以用于自定义加载策略或预加载优化。

## 注意事项

- 此功能目前处于**实验阶段**，API 可能在未来版本中发生变化
- 适用于需要自定义 chunk 加载逻辑的高级场景
- 不建议在生产环境中过度依赖此功能
- 在 Vite 官方文档中标记为 `@experimental`
