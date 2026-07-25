# emptyOutDir — 清空输出目录

控制构建前是否清空输出目录中的旧文件。

## 配置方式

- **类型**: `boolean`
- **默认值**: `true`

```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    outDir: 'dist',
    // 构建前清空 dist（默认）
    emptyOutDir: true,

    // 保留旧文件，增量构建
    emptyOutDir: false,
  }
})
```

## 进阶配置

### 增量构建

```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    outDir: 'dist',
    // 不清空旧文件，适合增量构建
    emptyOutDir: false,
  }
})
```

## 注意事项

- 当 `outDir` 指向项目根目录之外的路径时，`emptyOutDir` 会被强制设为 `true`
- 这是一个安全措施，防止意外删除项目根目录外的文件
- 在 CI/CD 环境中，建议保持默认值 `true`，确保每次构建都是干净的
- 增量构建场景下可以设为 `false`，但要确保没有冲突的旧文件
