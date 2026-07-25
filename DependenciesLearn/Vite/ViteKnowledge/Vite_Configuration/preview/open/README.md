# preview.open

启动预览服务器时是否自动打开浏览器。

## 配置方式

- **类型**: `boolean | string`
- **默认值**: 继承自 `server.open`

```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  preview: {
    open: true,  // 自动打开默认浏览器
  },
})
```

## 进阶配置

可以指定要打开的页面路径或完整 URL：

```javascript
export default defineConfig({
  preview: {
    open: '/admin/dashboard',  // 打开指定路径
  },
})
```

## 注意事项

- 在无 GUI 环境（如服务器、CI）中应设置为 `false`
- 也可以通过环境变量 `BROWSER=none` 禁用自动打开
- 该配置继承自 `server.open`，preview 无需单独设置
