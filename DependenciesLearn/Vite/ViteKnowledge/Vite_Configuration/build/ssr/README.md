# ssr — SSR 构建

配置服务端渲染（SSR）构建行为，指定 SSR 入口文件或启用 SSR 模式。

## 配置方式

- **类型**: `boolean | string`
- **默认值**: `false`

```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    // 启用 SSR 构建模式
    ssr: true,

    // 指定 SSR 入口文件
    ssr: 'src/ssr-entry.js',

    // 指定 SSR 入口为数组
    ssr: ['src/ssr-entry.js', 'src/another-entry.js'],

    // 禁用（默认，客户端构建）
    ssr: false,
  }
})
```

## 进阶配置

### 完整的 SSR 构建配置

```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    // SSR 入口文件
    ssr: 'src/server entry.js',
    // SSR 构建输出为 Node.js 格式
    rollupOptions: {
      input: 'src/server entry.js',
      output: {
        format: 'cjs',
      },
      external: ['vue', 'vue-router'],
    },
  }
})
```

### package.json 脚本

```json
{
  "scripts": {
    "dev": "vite",
    "build:client": "vite build",
    "build:ssr": "vite build --ssr src/server-entry.js",
    "start": "node dist/server entry.js"
  }
}
```

## 注意事项

- SSR 构建时，`ssr` 选项会覆盖默认的客户端构建配置
- 需要将框架（如 Vue、React）和路由库设为外部依赖
- SSR 构建产物通常是 Node.js 兼容格式（CJS 或 ESM）
- 配合 `vite build --ssr` 命令使用
