# strictPort

严格端口模式，指定端口被占用时是否终止进程。

## 配置方式

- **类型**: `boolean`
- **默认值**: `false`

```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    // 默认行为：端口被占用时自动尝试下一个端口
    strictPort: false,

    // 严格模式：端口被占用时报错退出
    strictPort: true
  }
})
```

## 进阶配置

### 配合端口配置使用

```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    port: 3000,
    strictPort: true  // 必须使用 3000 端口，否则报错
  }
})
```

### CLI 参数

```bash
# 严格端口模式
vite --port 3000 --strictPort
```

## 注意事项

- 当 `strictPort` 为 `false` 时，如果端口被占用，Vite 会自动将端口号 +1 并继续尝试
- 当 `strictPort` 为 `true` 时，如果端口被占用，Vite 会直接报错并退出
- 在 CI/CD 环境中建议开启 `strictPort`，确保端口固定
