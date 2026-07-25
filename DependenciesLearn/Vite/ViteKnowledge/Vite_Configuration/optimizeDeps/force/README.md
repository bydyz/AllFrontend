# optimizeDeps.force

强制 Vite 忽略缓存，重新优化所有依赖。

## 配置方式

- **类型**: `boolean`
- **默认值**: `false`

```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  optimizeDeps: {
    force: true,  // 每次启动都重新预构建所有依赖
  },
})
```

## 进阶配置

仅在特定场景下启用：

```javascript
export default defineConfig({
  optimizeDeps: {
    // 仅在需要调试依赖问题时临时启用
    force: process.env.FORCE_OPTIMIZE === 'true',
  },
})
```

## 注意事项

- 启用后每次 `vite dev` 都会重新预构建，**显著增加启动时间**
- 通常只需删除 `node_modules/.vite` 缓存目录即可
- 不要在生产环境或日常开发中长期启用
- 用于依赖更新后缓存未自动失效的场景
