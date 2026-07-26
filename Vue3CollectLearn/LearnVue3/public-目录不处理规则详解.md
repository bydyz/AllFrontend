# public/ 目录"不处理"规则详解

## 核心概念

`public/` 是前端项目中的**静态资源目录**。构建工具（Vite、Webpack 等）会将其内容**原样复制**到构建输出目录，不经过任何 loader/plugin 处理链。

**判断标准**：这个文件是否需要构建工具"理解"它？

```
需要构建工具理解 (放 src/)         不需要构建工具理解 (放 public/)
─────────────────────             ─────────────────────────
.ts   → 编译为 .js                .ico    → 浏览器直接识别
.scss → 编译为 .css               .png    → 浏览器直接识别
.vue  → 编译为 .js + .css         .svg    → 浏览器直接识别
.jsx  → 编译为 .js                .woff2  → 浏览器直接识别
需要 tree-shaking 的资源           .txt    → 纯文本，直接使用
需要 content-hash 的资源           .json   → 配置/数据，直接使用
```

## public/ 中放置的文件类型

| 类别 | 文件 | 为什么放 public |
|------|------|----------------|
| 浏览器约定路径 | `favicon.ico` | 浏览器自动在 `/favicon.ico` 查找 |
| SEO / 爬虫 | `robots.txt`、`sitemap.xml` | 爬虫固定在根路径查找 |
| PWA | `manifest.json` / `.webmanifest` | HTML 通过 `<link>` 引用，路径固定 |
| Open Graph | `og-image.png` | 社交分享时 URL 被外部系统请求，不能带 hash |
| 静态数据 | `config.json`、`locales/zh.json` | 通过 `fetch('/config.json')` 获取 |
| 第三方验证 | `google-site-verification.html` | Google 要求放在根路径 |
| 托管平台配置 | `_redirects`（Netlify）、`_headers` | 平台约定在根路径读取 |

## 两条独立的处理管道

```
                   ┌──────────────────────────┐
                   │       构建系统            │
                   └────────────┬─────────────┘
                                │
                  ┌─────────────┴──────────────┐
                  │                            │
                  ▼                            ▼
          ┌──────────────┐             ┌──────────────┐
          │  模块管道     │             │  静态管道     │
          │              │             │              │
          │  入口:        │             │  入口:        │
          │  JS/TS import│             │  public/ 目录 │
          │  CSS import  │             │              │
          │              │             │              │
          │  处理:        │             │  处理:        │
          │  babel/oxc    │             │  无           │
          │  postcss      │             │              │
          │  esbuild      │             │              │
          │  rollup       │             │              │
          │              │             │              │
          │  输出:        │             │  输出:        │
          │  dist/assets/ │             │  dist/ (根)   │
          │  (带 hash)    │             │  (无 hash)    │
          └──────────────┘             └──────────────┘
```

**关键洞察**：决定一个文件是否被处理的，不是它"在哪里"，而是它"被谁引用"以及"通过什么方式引用"。

## 引用方式

### HTML 中用绝对路径

```html
<link rel="icon" href="/favicon.ico">
<link rel="manifest" href="/manifest.json">
<meta property="og:image" content="https://yoursite.com/og-image.png">
<img src="/images/logo.png">
```

路径以 `/` 开头，指向服务器根。构建后路径不变。

### JS 中用绝对路径字符串

```js
// 通过 fetch 获取
const res = await fetch('/config.json')
const data = await res.json()

// 用于动态创建的元素
const img = document.createElement('img')
img.src = '/images/photo.jpg'

// React 中
<img src="/images/photo.png" alt="..." />
```

### CSS 中用绝对路径

```css
.bg {
  background-image: url('/images/background.jpg');
}

@font-face {
  font-family: 'MyFont';
  src: url('/fonts/custom.woff2') format('woff2');
}
```

### 框架内置组件

```jsx
// Next.js
import Image from 'next/image'
<Image src="/logo.png" width={200} height={100} />

// Nuxt
<nuxt-img src="/logo.png" width="200" />
```

## "不处理"的具体含义

```
src/assets/logo.png                public/logo.png
      │                                  │
      ▼                                  ▼
┌─────────────┐                  ┌─────────────┐
│ import 语句  │                  │  HTML/CSS   │
│ 发现这个文件  │                  │  直接引用    │
└──────┬──────┘                  └──────┬──────┘
       │                                 │
       ▼                                 ▼
┌─────────────┐                  ┌─────────────┐
│ Vite 内部处理 │                  │   不处理     │
│              │                  │             │
│ 1. 读取文件   │                  │ 复制到 dist  │
│ 2. 压缩优化   │                  │ 路径不变     │
│ 3. 生成 hash  │                  │ 内容不变     │
│ 4. 返回 URL   │                  │             │
└──────┬──────┘                  └──────┬──────┘
       │                                 │
       ▼                                 ▼
/assets/logo-a1b2c3d4.png           /logo.png
```

| 操作 | src/ 资源 | public/ 资源 |
|------|-----------|-------------|
| 读取文件内容 | 是 | 否（直接复制） |
| 压缩 (minify) | 是 | 否 |
| 内容 hash | 是 (`logo-abc.png`) | 否 (`logo.png`) |
| Tree-shaking | 是（未引用则剔除） | 否（全部复制） |
| Base64 内联 | 是（小于阈值时） | 否 |
| 路径解析 | 相对路径 → 绝对路径 | 已经是绝对路径 |
| 缺失检测 | 构建时报错 | 运行时 404，静默失败 |

## 关于 import public/ 文件的特殊行为

```js
// main.js 在 src/ 里
import '../public/css/common.scss'
```

这不是 public/ 被处理了，而是 **import 语句本身在模块管道里被处理**。

```
文件位置          引用方式            走哪条管道        结果
─────────────────────────────────────────────────────────────
public/scss   →  HTML <link>       →  静态管道       →  原样复制，浏览器不识别
public/scss   →  JS import         →  模块管道       →  编译为 CSS，正常工作
src/scss      →  JS import         →  模块管道       →  编译为 CSS，正常工作
```

**本质**：决定处理方式的不是文件在哪里，而是**引用方式在哪条管道里发起的**。

## 不同构建工具的实现差异

| 工具 | public/ 支持 | 配置方式 | 特殊行为 |
|------|-------------|---------|---------|
| Vite | 内建 | `publicDir: 'public'` | 复制时自动加 `base` 前缀 |
| Webpack | 需插件 | `CopyWebpackPlugin` | 需手动配置 |
| CRA | 内建 | 约定 `public/` | `public/index.html` 是模板（可注入 `%PUBLIC_URL%`） |
| Next.js | 内建 | 约定 `public/` | 文件名不能和路由冲突 |
| Nuxt | 内建 | 约定 `public/` / `static/` | Nuxt 2 叫 `static/`，Nuxt 3 叫 `public/` |

## 易踩的坑

### 坑 1：路径混淆

```js
// 错误：试图 import public/ 的文件
import logo from '../public/logo.png'

// 正确：用字符串路径
<img src="/logo.png" />

// 或者把图片放 src/ 然后 import
import logo from '../assets/logo.png'
```

### 坑 2：需要编译的文件放 public/

```
public/
├── app.ts        ← 浏览器不认识 TypeScript
├── style.scss    ← 浏览器不认识 SCSS
└── utils.jsx     ← 浏览器不认识 JSX
```

### 坑 3：缓存问题

```
public/logo.png
  第一次部署: /logo.png  → 浏览器缓存
  第二次部署: /logo.png  → 文件变了但 URL 没变
                         → 浏览器可能用旧缓存

src/assets/logo.png
  第一次部署: /assets/logo-abc123.png
  第二次部署: /assets/logo-def456.png
                         → URL 自动变化，缓存自动失效
```

需要缓存控制的资源（带 hash 的）应该放 `src/`，而不是 `public/`。

### 坑 4：fetch 请求路径与 base 配置

```js
// public/config.json
fetch('/config.json')

// 但如果部署在子路径 base: '/app/'
fetch('/config.json')  // 错误：实际路径是 /app/config.json

// 正确做法
fetch(`${import.meta.env.BASE_URL}config.json`)
```

## 决策流程图

```
一个文件要不要放 public/？

┌─────────────────────────────┐
│  构建工具需要处理它吗？       │
│  (编译、压缩、hash、优化)     │
└──────────┬──────────────────┘
           │
      ┌────┴────┐
      │ 是      │ 否
      ▼         ▼
  ┌────────┐  ┌──────────────────────┐
  │ 放 src/ │  │ 引用路径必须固定吗？  │
  └────────┘  │ (浏览器约定、SEO、外部) │
              └──────────┬───────────┘
                         │
                    ┌────┴────┐
                    │ 是      │ 否
                    ▼         ▼
                ┌────────┐  ┌──────────────────────┐
                │ 放 public│  │ 需要缓存失效(hash)吗？ │
                └────────┘  └──────────┬───────────┘
                                       │
                                  ┌────┴────┐
                                  │ 是      │ 否
                                  ▼         ▼
                              ┌────────┐  ┌──────────┐
                              │ 放 src/ │  │ 都可以    │
                              └────────┘  │ 倾向 src/ │
                                          └──────────┘
```

## 总结

- `public/` 是"跳过构建管道"的快捷方式
- 适用场景：路径必须固定、不需要优化、不需要缓存控制的文件
- 不适用场景：需要编译、需要压缩、需要 hash 缓存的资源
- 核心原则：决定处理方式的是**引用方式**，不是文件位置
