# preview.strictPort

控制当指定端口已被占用时，预览服务器的行为。

## 配置方式

- **类型**: `boolean`
- **默认值**: 继承自 `server.strictPort`（`false`）

```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  preview: {
    port: 4173,
    strictPort: true,  // 端口被占用时直接报错退出
  },
})
```

## 行为对比

| `strictPort` | 端口可用 | 端口被占用 |
|-------------|---------|-----------|
| `false`（默认） | 正常启动 | 自动递增端口并输出警告 |
| `true` | 正常启动 | 直接报错退出 |

## 注意事项

- 默认为 `false`，端口被占用时会自动尝试下一个端口
- 在脚本中调用 `vite preview` 时建议设置 `true`，便于通过退出码判断是否成功启动
