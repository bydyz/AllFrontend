# optimizeDeps.noDiscovery

禁用依赖自动发现机制，Vite 将不会自动扫描并预构建 `node_modules` 中的依赖。

## 配置方式

- **类型**: `boolean`
- **默认值**: `false`

```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  optimizeDeps: {
    noDiscovery: true,  // 禁用自动发现，仅预构建 include 中指定的依赖
    include: ['lodash-es', 'vue'],  // 手动指定需要优化的依赖
  },
})
```

## 进阶配置

配合 `include` 实现精确控制：

```javascript
export default defineConfig({
  optimizeDeps: {
    noDiscovery: true,
    include: [
      'vue',
      'vue-router',
      'pinia',
    ],
    // 此时只有 include 中列出的依赖会被预构建
  },
})
```

## 注意事项

- 设置为 `true` 后，只有 `include` 中的依赖会被预构建
- 不在 `include` 中的 CJS 依赖在浏览器中会加载失败
- 适用于需要完全控制预构建范围的场景
- 日常开发中不建议开启，可能导致依赖加载问题
