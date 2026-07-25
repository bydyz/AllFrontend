# port

指定开发服务器监听的端口号。

## 配置方式

- **类型**: `number`
- **默认值**: `5173`

```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    // 使用默认端口 5173
    port: 5173,

    // 使用常用端口 3000
    port: 3000,

    // 使用 8080 端口
    port: 8080
  }
})
```

## 进阶配置

### 通过环境变量设置

```bash
# .env.development
VITE_PORT=3000
```

### 配合 CLI 参数

```bash
# 指定端口启动
vite --port 3000
```

## 注意事项

- 如果指定端口已被占用，Vite 会自动尝试下一个可用端口（除非设置了 `strictPort`）
- 端口号范围为 0-65535，常用端口建议使用 3000、8080 等
- 部分端口（如 80、443）需要管理员权限才能使用
