# preview.port

指定预览服务器监听的端口号。

## 配置方式

- **类型**: `number`
- **默认值**: **4173**（与 dev server 的 5173 不同）

```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  preview: {
    port: 9090,  // 自定义预览端口
  },
})
```

## 进阶配置

可以配合 `strictPort` 控制端口被占用时的行为：

```javascript
export default defineConfig({
  preview: {
    port: 4173,
    strictPort: true,  // 端口被占用时直接报错退出
  },
})
```

## 注意事项

- preview 默认端口 **4173**，与 dev server 的 **5173** 不同
- 如果 dev server 已经占用 4173，preview 会自动尝试 4174
- 设置 `strictPort: true` 后端口冲突会直接报错
