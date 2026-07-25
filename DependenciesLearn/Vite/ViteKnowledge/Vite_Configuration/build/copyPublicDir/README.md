# copyPublicDir — 复制公共目录

控制构建时是否将 `public` 目录中的文件复制到输出目录。

## 配置方式

- **类型**: `boolean`
- **默认值**: `true`

```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    // 复制 public 目录到 dist（默认）
    copyPublicDir: true,

    // 不复制 public 目录
    copyPublicDir: false,
  }
})
```

## 目录结构

### 默认行为（copyPublicDir: true）

```
public/
├── favicon.ico
└── robots.txt

dist/
├── assets/
│   ├── index-[hash].js
│   └── index-[hash].css
├── favicon.ico      ← 从 public 复制
├── robots.txt       ← 从 public 复制
└── index.html
```

### 禁用后（copyPublicDir: false）

```
dist/
├── assets/
│   ├── index-[hash].js
│   └── index-[hash].css
└── index.html       ← 不包含 public 中的文件
```

## 注意事项

- `public` 目录中的文件会被原样复制，不经过构建处理
- 适合存放 favicon、robots.txt 等静态资源
- 设为 `false` 时，需要自行处理 `public` 目录中的资源
- 在某些 SSR 场景下可能需要禁用
