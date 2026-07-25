# lib — 库模式

将项目构建为库（Library）模式，适用于开发可复用的组件库、工具库等。

## 配置方式

- **类型**: `string | { entry: string, name?: string, formats?: string[], fileName?: string | ((format: string) => string), cssFileName?: string }`

```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    lib: {
      // 入口文件
      entry: 'src/index.js',
      // 库名称（UMD/IIFE 格式下的全局变量名）
      name: 'MyLib',
      // 输出格式
      formats: ['es', 'umd'],
      // 输出文件名
      fileName: 'my-lib',
      // CSS 文件名
      cssFileName: 'style',
    }
  }
})
```

## 格式说明

| 格式 | 说明 | 使用场景 |
|------|------|----------|
| `'es'` | ES Module 格式 | 现代打包工具、支持 tree-shaking |
| `'umd'` | Universal Module Definition | 浏览器直接使用、AMD/CJS 环境 |
| `'cjs'` | CommonJS 格式 | Node.js 环境 |
| `'iife'` | 立即执行函数 | 浏览器 `<script>` 标签 |

## 进阶配置

### 自定义文件名

```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    lib: {
      entry: 'src/index.js',
      name: 'MyLib',
      formats: ['es', 'umd'],
      // 根据格式自定义文件名
      fileName: (format) => {
        if (format === 'es') return 'my-lib.esm.js'
        if (format === 'umd') return 'my-lib.umd.js'
        return `my-lib.${format}.js`
      },
    }
  }
})
```

### package.json 配置

```json
{
  "name": "my-lib",
  "version": "1.0.0",
  "main": "./dist/my-lib.umd.js",
  "module": "./dist/my-lib.esm.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/my-lib.esm.js",
      "require": "./dist/my-lib.umd.js"
    }
  }
}
```

## 注意事项

- 启用 `lib` 模式时，`rollupOptions.external` 会自动将 `dependencies` 和 `peerDependencies` 设为外部依赖
- 建议在 `package.json` 中正确配置 `main`、`module` 和 `exports` 字段
- 库模式下 CSS 代码分割默认禁用
- 使用 `rollupOptions.output.globals` 配置外部依赖的全局变量名
