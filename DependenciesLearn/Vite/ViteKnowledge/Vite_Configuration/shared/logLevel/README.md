# logLevel - 日志级别

控制 Vite 日志输出的详细程度。

## 配置方式

- **类型**: `'info' | 'warn' | 'error' | 'silent'`
- **默认值**: `'info'`

```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  logLevel: 'info',
})
```

## 进阶配置

根据环境设置日志级别：

```javascript
// vite.config.js
import { defineConfig, loadEnv } from 'vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    // 生产构建时减少日志输出
    logLevel: mode === 'production' ? 'warn' : 'info',
  }
})
```

使用命令行参数：

```bash
# 静默模式
vite --logLevel silent

# 只显示警告和错误
vite --logLevel warn

# 显示所有日志
vite --logLevel info
```

## 注意事项

- `info`：显示所有日志（默认）
- `warn`：只显示警告和错误
- `error`：只显示错误
- `silent`：不显示任何日志
- CI/CD 环境建议使用 `warn` 或 `error`
- 调试问题时可以使用 `info` 查看详细日志
