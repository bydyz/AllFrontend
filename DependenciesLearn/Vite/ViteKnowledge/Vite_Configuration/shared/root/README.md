# root - 项目根目录

指定 Vite 项目的根目录，其他路径配置（如 `base`、`publicDir`）都相对于此目录解析。

## 配置方式

- **类型**: `string`
- **默认值**: `process.cwd()`（当前工作目录）

```javascript
// vite.config.js
import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
  // 将项目根目录设置为当前配置文件所在目录
  root: path.resolve(__dirname),
})
```

## 进阶配置

通常在 monorepo 项目中，每个子包会配置自己的 `root`：

```javascript
// packages/app/vite.config.js
import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
  // 指向子包目录
  root: path.resolve(__dirname),
  // 公共基础路径使用相对路径
  base: './',
})
```

## 注意事项

- `index.html` 文件必须位于 `root` 目录下
- 环境变量文件（如 `.env`）也会从 `root` 目录加载
- 修改 `root` 后，`publicDir` 的默认路径也会相应变化
