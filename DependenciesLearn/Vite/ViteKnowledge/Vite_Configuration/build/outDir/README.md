# outDir — 输出目录

指定构建产物的输出目录路径。

## 配置方式

- **类型**: `string`
- **默认值**: `'dist'`

```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    // 自定义输出目录
    outDir: 'build',

    // 输出到项目外的目录
    outDir: '../deploy/dist',

    // 使用绝对路径
    outDir: '/var/www/html',
  }
})
```

## 进阶配置

配合 `emptyOutDir` 使用，控制是否在构建前清空输出目录：

```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    outDir: 'dist',
    // 构建前先清空 dist 目录
    emptyOutDir: true,
  }
})
```

## 注意事项

- 如果 `outDir` 指向项目根目录之外的路径，`emptyOutDir` 会被强制设为 `true`（安全措施）
- 建议将输出目录添加到 `.gitignore` 中
- 使用绝对路径时要确保目录存在且有写入权限
