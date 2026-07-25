# assetsDir — 静态资源目录

指定构建后静态资源（JS、CSS、图片等）存放的子目录名称。

## 配置方式

- **类型**: `string`
- **默认值**: `'assets'`

```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    // 静态资源放在 buildOutput/static 目录下
    assetsDir: 'static',

    // 静态资源放在根目录下（不创建子目录）
    assetsDir: '',

    // 使用嵌套目录
    assetsDir: 'dist/assets',
  }
})
```

## 目录结构示例

默认配置下的输出结构：

```
dist/
├── assets/
│   ├── index-[hash].js
│   ├── index-[hash].css
│   └── logo-[hash].png
├── index.html
└── ...
```

自定义 `assetsDir: 'static'` 后：

```
dist/
├── static/
│   ├── index-[hash].js
│   ├── index-[hash].css
│   └── logo-[hash].png
├── index.html
└── ...
```

## 注意事项

- `assetsDir` 是相对于 `outDir` 的路径
- 值为空字符串时，资源直接放在 `outDir` 根目录下
- 此配置只影响构建产物的目录结构，不影响资源的命名和哈希
