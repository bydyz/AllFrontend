# devtools - 开发工具

配置 Vite 开发工具选项。

## 配置方式

- **类型**: `boolean | DevToolsConfig`
- **默认值**: `false`

```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  // 启用开发工具
  devtools: true,
})
```

## 进阶配置

完整的开发工具配置：

```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  devtools: {
    // 启用调试器
    debugger: true,
    // 启用性能分析
    profiler: true,
    // 启用组件检查
    componentInspector: true,
  },
})
```

## 注意事项

- 开发工具仅在开发模式下生效
- 启用开发工具可能影响性能
- 生产构建会自动禁用开发工具
- 配合 Vue DevTools 或 React DevTools 使用
- 部分功能需要安装额外的浏览器扩展
