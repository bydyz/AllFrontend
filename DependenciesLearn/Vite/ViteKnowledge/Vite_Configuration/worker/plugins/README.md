# worker.plugins

为 Worker 脚本的构建配置专用的 Vite 插件。

## 配置方式

- **类型**: `() => (Plugin | Plugin[])[]`
- **默认值**: `[]`

```javascript
// vite.config.js
import { defineConfig } from 'vite'
import myPlugin from './my-plugin'

export default defineConfig({
  worker: {
    // 返回 Worker 构建使用的插件列表
    plugins: () => [
      myPlugin(),  // 为 Worker 添加自定义插件
    ],
  },
})
```

## 进阶配置

可以组合多个插件：

```javascript
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],  // 主构建使用的插件
  worker: {
    plugins: () => [
      // Worker 可以使用不同的插件组合
      // 例如不需要 vue() 插件
    ],
  },
})
```

## 注意事项

- 使用工厂函数形式，确保每次构建都创建新的插件实例
- Worker 插件独立于主构建的插件
- 如果不需要为 Worker 添加额外插件，保持默认值即可
- 常见场景：Worker 中使用 TypeScript、特殊资源加载等
