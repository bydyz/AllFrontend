# envDir - 环境变量目录

指定加载 `.env` 文件的目录路径。

## 配置方式

- **类型**: `string | false`
- **默认值**: `root`（项目根目录）

```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  // 从 config 目录加载环境变量
  envDir: 'config',
})
```

## 进阶配置

使用绝对路径：

```javascript
// vite.config.js
import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
  // 使用绝对路径
  envDir: path.resolve(__dirname, 'env'),
})
```

禁用环境变量加载：

```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  // 不加载任何 .env 文件
  envDir: false,
})
```

## 注意事项

- 环境变量目录相对于 `root` 目录解析
- 目录中可以包含 `.env`、`.env.local`、`.env.[mode]` 等文件
- 修改 `envDir` 后，Vite 会从新目录加载环境变量
- 设置为 `false` 可以完全禁用环境变量加载
- monorepo 中每个子包可以配置不同的环境变量目录
