# Vite MPA 开发服务器无法访问 HTML 页面

## 问题描述

运行 `npm run dev` 后，访问 `http://localhost:5173/page-a.html` 提示"找不到 localhost 的网页"（404）。

## 环境

- 项目：Vite 5 + Vue 3 MPA（多页面应用）
- HTML 入口：`src/pages/page-a.html`、`src/pages/page-b.html`
- 构建配置：`vite.config.ts` 中通过 `build.rollupOptions.input` 指定了 HTML 入口

## 根因分析

`build.rollupOptions.input` 只对 **生产构建** (`vite build`) 生效，不影响 **开发服务器** (`vite dev`)。

Vite 开发服务器的行为：

| 阶段 | 命令 | HTML 来源 | 是否正常 |
|------|------|-----------|---------|
| 开发 | `vite dev` | 从**项目根目录**寻找并直接提供 HTML 文件 | ❌ 根目录无 HTML |
| 构建 | `vite build` | 读取 `build.rollupOptions.input` 指定的入口 | ✅ 正常 |

**核心差异：** `build.rollupOptions.input` 是 Rollup 的配置项，只在 Vite 调用 Rollup 打包时使用。开发服务器使用自己的静态文件服务机制，默认只提供项目根目录下的文件，不会读取 `build.rollupOptions.input`。

## 目录结构分析

```
demo003/
├── src/
│   ├── pages/          ← HTML 入口（仅构建使用）
│   │   ├── page-a.html
│   │   └── page-b.html
│   ├── page-a/         ← 页面 A 的 Vue 应用代码
│   │   └── main.ts
│   └── page-b/         ← 页面 B 的 Vue 应用代码
│       └── main.ts
├── vite.config.ts      ← build.rollupOptions.input 指定了 src/pages/ 下的 HTML
└── (根目录无 HTML 文件)  ← 开发服务器找不到入口
```

```
src/pages/page-a.html 中引用的是：
  <script type="module" src="../page-a/main.ts">
  ↑ 相对于 src/pages/ 目录
```

## 解决方案

### 方案选择

在项目**根目录**创建 `page-a.html` 和 `page-b.html`，作为开发服务器的入口。

| 对比项 | 根目录 HTML（开发） | src/pages/ HTML（构建） |
|--------|-------------------|----------------------|
| 用途 | `vite dev` 使用 | `vite build` 使用 |
| 脚本路径 | `./src/page-a/main.ts`（相对于根目录） | `../page-a/main.ts`（相对于 src/pages/） |
| 互不影响 | ✅ | ✅ |

### 操作步骤

在项目根目录创建两个文件：

**`page-a.html`**

```html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>页面A - MPA Demo</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="./src/page-a/main.ts"></script>
  </body>
</html>
```

**`page-b.html`**

```html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>页面B - MPA Demo</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="./src/page-b/main.ts"></script>
  </body>
</html>
```

### 最终目录结构

```
demo003/
├── page-a.html          ← 新增（开发用）
├── page-b.html          ← 新增（开发用）
├── src/
│   ├── pages/
│   │   ├── page-a.html  ← 原有（构建用）
│   │   └── page-b.html  ← 原有（构建用）
│   ├── page-a/
│   │   └── main.ts
│   └── page-b/
│       └── main.ts
├── vite.config.ts
└── package.json
```

### 验证结果

执行 `npm run dev` 后：

```
VITE v5.4.21  ready in 318 ms
  ➜  Local:   http://localhost:5173/
```

访问 `http://localhost:5173/page-a.html` → ✅ 200，Vite 注入 HMR 客户端后正常渲染。

访问 `http://localhost:5173/page-b.html` → ✅ 正常。

## 其他可行方案对比

| 方案 | 评价 |
|------|------|
| **根目录创建 HTML（本文采用）** | 最简单，零新增依赖，开发/构建入口分离互不干扰 |
| **安装 `vite-plugin-mpa` 插件** | 专业方案，不污染根目录，统一入口配置，需安装依赖 |
| **配置 `root: 'src/pages'`** | HTML 路径虽变短，但 `@` 别名等路径全部偏移，影响面大 |
| **自定义 `configureServer` 中间件** | 零文件污染，但实现较复杂，需深入 Vite 中间件机制 |

## 总结

```
build.rollupOptions.input → 仅控制 vite build（构建）
根目录的 HTML 文件        → 控制 vite dev（开发服务器）
```

两者各自独立，Vite MPA 项目需要在根目录为每个页面提供 HTML 文件，才能被开发服务器正确识别并提供服务。
