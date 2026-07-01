# Vite MPA 构建：HTML 输出路径拍平方案

## 问题描述

当前项目为 Vite 多页面应用（MPA），HTML 入口文件存放在 `src/pages/` 目录下：

```
src/
└── pages/
    ├── page-a.html
    └── page-b.html
```

Vite 构建时，**HTML 文件会保留相对于项目根目录的路径结构**，导致输出为：

```
dist/
├── assets/
├── js/
└── src/
    └── pages/
        ├── page-a.html
        └── page-b.html
```

期望的输出结构是将 HTML 直接放在 `dist/` 根目录：

```
dist/
├── assets/
├── js/
├── page-a.html
└── page-b.html
```

## 根因

Vite 底层使用 Rollup 进行生产构建。Rollup 对入口文件（entry point）的输出路径，默认使用**相对于项目根目录的相对路径**作为输出路径的一部分。因此：

| 入口路径 | 输出路径 |
|---------|---------|
| `src/pages/page-a.html` | `dist/src/pages/page-a.html` |
| `src/pages/page-b.html` | `dist/src/pages/page-b.html` |

## 解决方案

通过 Vite 插件机制，在 **`closeBundle`** 钩子中，用 Node.js `fs` 物理移动 HTML 文件到根目录。

### 为什么不使用 `generateBundle`

Vite 内部插件的执行顺序为：

```
用户 pre 插件 → 用户 normal 插件 → 用户 post 插件 → Vite 内部插件
```

HTML 构建插件（`buildHtmlPlugin`）是 Vite 内部插件，它在 `generateBundle` 阶段**晚于所有用户插件**执行。因此如果在用户插件的 `generateBundle` 中操作 `bundle`，此时 HTML 资产**还未被 emit**，操作无效。

### 改用 `closeBundle` + `fs`

`closeBundle` 在**所有文件写入磁盘后**触发，此时可以用 `fs` 直接操作文件系统：

```ts
import { readdirSync, renameSync, rmdirSync, existsSync } from 'fs'
import { resolve } from 'path'
import type { Plugin } from 'vite'

function flattenHtmlPlugin(): Plugin {
  let outDir = 'dist'

  function walkAndMove(dir: string, outRoot: string) {
    const entries = readdirSync(dir, { withFileTypes: true })
    for (const entry of entries) {
      const full = resolve(dir, entry.name)
      if (entry.isDirectory()) {
        walkAndMove(full, outRoot)
      } else if (entry.name.endsWith('.html')) {
        const target = resolve(outRoot, entry.name)
        if (full !== target && !existsSync(target)) {
          renameSync(full, target)
        }
      }
    }
    try {
      const remaining = readdirSync(dir)
      if (remaining.length === 0 && dir !== outRoot) {
        rmdirSync(dir)
      }
    } catch { /* ignore */ }
  }

  return {
    name: 'flatten-html',
    configResolved(config) {
      outDir = config.build.outDir
    },
    closeBundle() {
      const outRoot = resolve(process.cwd(), outDir)
      if (existsSync(outRoot)) {
        walkAndMove(outRoot, outRoot)
      }
    },
  }
}
```

### 应用到 vite.config.ts

```ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { readdirSync, renameSync, rmdirSync, existsSync } from 'fs'
import type { Plugin } from 'vite'

function flattenHtmlPlugin(): Plugin {
  let outDir = 'dist'

  function walkAndMove(dir: string, outRoot: string) {
    const entries = readdirSync(dir, { withFileTypes: true })
    for (const entry of entries) {
      const full = resolve(dir, entry.name)
      if (entry.isDirectory()) {
        walkAndMove(full, outRoot)
      } else if (entry.name.endsWith('.html')) {
        const target = resolve(outRoot, entry.name)
        if (full !== target && !existsSync(target)) {
          renameSync(full, target)
        }
      }
    }
    try {
      const remaining = readdirSync(dir)
      if (remaining.length === 0 && dir !== outRoot) {
        rmdirSync(dir)
      }
    } catch { /* ignore */ }
  }

  return {
    name: 'flatten-html',
    configResolved(config) {
      outDir = config.build.outDir
    },
    closeBundle() {
      const outRoot = resolve(process.cwd(), outDir)
      if (existsSync(outRoot)) {
        walkAndMove(outRoot, outRoot)
      }
    },
  }
}

export default defineConfig({
  plugins: [vue(), flattenHtmlPlugin()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  build: {
    rollupOptions: {
      input: {
        'page-a': resolve(__dirname, 'src/pages/page-a.html'),
        'page-b': resolve(__dirname, 'src/pages/page-b.html'),
      },
      output: {
        dir: 'dist',
        entryFileNames: 'js/[name]-[hash].js',
        chunkFileNames: 'js/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor'
          }
        }
      },
    },
  },
})
```

## 构建验证

执行 `npm run build` 后，输出结构为：

```
dist/
├── assets/             ← 静态资源
│   ├── format-[hash].css
│   ├── page-a-[hash].css
│   └── page-b-[hash].css
├── js/                 ← JS 产物
│   ├── format-[hash].js
│   ├── page-a-[hash].js
│   ├── page-b-[hash].js
│   └── vendor-[hash].js
├── page-a.html         ← 已拍平到根目录
└── page-b.html         ← 已拍平到根目录
```

## 其他方案对比

| 方案 | 评价 |
|------|------|
| **将 HTML 放到项目根目录** | 无需插件，但会污染项目根，丢失目录组织 |
| **修改 `root` 配置为 `src/pages`** | HTML 路径虽变短，但 `@` 别名等路径全部偏移，影响面大 |
| **`closeBundle` + `fs` 拍平插件** | 不受插件执行顺序限制，稳定可靠，**推荐** |
