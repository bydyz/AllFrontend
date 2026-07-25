# publicDir - 静态资源目录

指定静态资源目录，该目录下的文件会被原样复制到构建输出目录。

## 配置方式

- **类型**: `string | false`
- **默认值**: `"public"`

```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  // 自定义静态资源目录
  publicDir: 'static',
})
```

## 进阶配置

禁用静态资源目录：

```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  // 不需要静态资源目录时可以禁用
  publicDir: false,
})
```

使用绝对路径：

```javascript
// vite.config.js
import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
  publicDir: path.resolve(__dirname, 'public'),
})
```

## 注意事项

- 该目录下的文件会被原样复制，不会经过构建处理
- 文件通过 `/文件名` 路径访问（如 `/favicon.ico`）
- `publicDir` 相对于 `root` 目录解析
- 建议将 `favicon.ico`、`robots.txt` 等放置在此目录
