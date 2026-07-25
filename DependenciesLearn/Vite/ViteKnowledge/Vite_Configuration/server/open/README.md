# open

开发服务器启动后自动打开浏览器。

## 配置方式

- **类型**: `boolean | string`
- **默认值**: `false`

```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    // 默认不自动打开
    open: false,

    // 自动打开默认浏览器
    open: true,

    // 打开指定 URL
    open: '/docs',

    // 打开完整 URL
    open: 'http://localhost:3000/dashboard'
  }
})
```

## 进阶配置

### 指定浏览器打开

```bash
# 使用 Chrome 打开
BROWSER=google-chrome vite

# 使用 Firefox 打开
BROWSER=firefox vite

# Windows 下指定浏览器路径
set BROWSER="C:\Program Files\Google\Chrome\Application\chrome.exe"
vite
```

### 配合 path 参数

```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    open: '/login',  // 启动后打开登录页
    port: 3000
  }
})
```

## 注意事项

- 在无头环境（如 CI/CD、Docker）中请勿启用此选项
- `open` 选项在 `--open` CLI 参数下也会生效
- 指定 URL 时会与 `server.origin` 拼接
