# future - 未来特性

配置未来特性的预览行为，提前体验即将发布的功能。

## 配置方式

- **类型**: `Record<string, 'warn' | undefined>`

```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  future: {
    // 启用未来特性并显示警告
    'vite-6': 'warn',
  },
})
```

## 进阶配置

启用多个未来特性：

```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  future: {
    // Vite 6 特性
    'vite-6': 'warn',
    // 其他未来特性
    'new-module-resolution': 'warn',
  },
})
```

## 注意事项

- 未来特性可能不稳定，不建议在生产环境使用
- `'warn'`：启用特性并显示弃用警告
- `undefined` 或不设置：禁用该特性
- 这些特性可能在后续版本中成为默认行为
- 查看 Vite 官方文档了解可用的未来特性列表
- 建议定期检查并更新未来特性配置
