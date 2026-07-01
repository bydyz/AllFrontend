# Vite MPA 多页应用构建问题记录

## 问题

demo001 和 demo002 两个 MPA 工程，`npm run build` 后生成的 `dist/` 目录，用 Live Server 打开 HTML 文件无法正常展示（资源加载失败）。

## 分析

### 构建产物结构

**demo001：**

```
dist/
├── page-a.html
├── page-b.html
└── assets/
    ├── page-a-BWmhqDFz.js
    ├── page-a-DHmbuWiU.css
    ├── page-b-CXXMPwPr.js
    ├── page-b-ClulOl8Q.css
    ├── format-u7Ojfr3S.js
    └── format-K-mZ6oVI.css
```

**demo002：**

```
dist/
├── assets/
│   ├── format-K-mZ6oVI.css
│   ├── indexA-DHmbuWiU.css
│   └── indexB-ClulOl8Q.css
├── js/
│   ├── format-DYFXopAL.js
│   ├── indexA-DtpMtnMz.js
│   ├── indexB-BhaXHC7X.js
│   └── vendor-CBfudtC-.js
└── src/
    └── pages/
        ├── page-a.html
        └── page-b.html
```

### 构建后的 HTML 资源引用

**demo001** `dist/page-b.html`：

```html
<script type="module" crossorigin src="/assets/page-b-CXXMPwPr.js"></script>
<link rel="stylesheet" crossorigin href="/assets/page-b-ClulOl8Q.css">
```

**demo002** `dist/src/pages/page-a.html`：

```html
<script type="module" crossorigin src="/js/indexA-DtpMtnMz.js"></script>
<link rel="stylesheet" crossorigin href="/assets/indexA-DHmbuWiU.css">
```

### 根本原因

Vite 默认 `base: '/'`，打包后所有资源引用路径以 `/` 开头（**服务器根绝对路径**）。

Live Server 打开 `dist/` 下的 HTML 时，浏览器将资源路径解析为：

```
请求：/assets/page-b-CXXMPwPr.js
实际解析：http://127.0.0.1:5500/assets/page-b-CXXMPwPr.js   ❌
但文件实际在：http://127.0.0.1:5500/dist/assets/page-b-CXXMPwPr.js  ✅
```

—— HTML 在 `dist/` 子目录下，但资源却指向服务器根目录，导致**路径错位**。

### 在 demo002 上更严重

demo002 的 HTML 被构建到了 `dist/src/pages/` 的深层目录，而资源在 `dist/js/` 和 `dist/assets/` 下，路径错位更大。同时 URL 也不优雅（需要访问 `/src/pages/page-a.html`）。

## 解决方案

### 如果你需要本地 Live Server 直接打开 `dist/` 下的 HTML

在 `vite.config.ts` 中设置 `base: './'`，使资源路径变为**相对路径**：

```ts
export default defineConfig({
  base: './',         // 关键配置
  plugins: [vue()],
  build: {
    rollupOptions: {
      input: {
        'page-a': resolve(__dirname, 'page-a.html'),
        'page-b': resolve(__dirname, 'page-b.html'),
      },
    },
  },
})
```

重新构建后，HTML 引用变为：

```html
<script type="module" crossorigin src="./assets/page-b-CXXMPwPr.js"></script>
<link rel="stylesheet" crossorigin href="./assets/page-b-ClulOl8Q.css">
```

—— 此时无论 HTML 在什么子目录下，资源路径都相对于 HTML 自身，Live Server 可正常打开。

### 部署到实际服务器

| 部署位置 | 是否需要修改 `base` |
|---|---|
| 服务器**根路径**（`https://example.com/`） | **不需要**，默认 `/` 即可正确解析 |
| 服务器**子路径**（`https://example.com/my-app/`） | 需要设置 `base: '/my-app/'` |
| 用 Live Server 直接打开 `dist/` | 需要设置 `base: './'` |

**demo001**（入口 HTML 在根目录）：
- 部署到服务器根路径 ✔️ 无需修改
- 部署到子路径 → 设置 `base: '/my-app/'`
- Live Server → 设置 `base: './'`

**demo002**（入口 HTML 在 `src/pages/` 下）：
- 部署到服务器根路径时资源路径本身没问题，但 URL 不优雅（需访问 `/src/pages/page-a.html`）
- 若想获得 `/page-a.html` 这类干净 URL，需把入口 HTML 放到项目根目录（如 demo001 做法），或配置服务器 URL 重写规则

## 总结

| 场景 | 推荐配置 |
|---|---|
| 纯本地开发，用 Live Server 直接打开 dist 文件 | `base: './'` |
| 部署到服务器根目录 | `base: '/'`（默认，无需修改） |
| 部署到服务器子路径 | `base: '/your-path/'` |
