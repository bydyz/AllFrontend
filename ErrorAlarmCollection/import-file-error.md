# 导入 /public 目录下的文件报错

## 报错信息

```
[plugin:vite:import-analysis] Cannot import non-asset file /css/common.scss which is inside /public. JS/CSS files inside /public are copied as-is on build and can only be referenced via <script src> or <link href> in html. If you want to get the URL of that file, use /css/common.scss?url instead.
```

## 错误原因

**错误代码示例：**

```javascript
// main.js
import '/css/common.scss'
```

**根本原因分析：**

1. **文件处理方式不同**：`/public` 目录下的文件在构建时会被原封不动地复制到输出目录根路径，不会经过任何编译处理（如 SCSS → CSS、压缩等）

2. **模块解析失败**：Vite 将 `public` 下的文件视为"静态资源"而非"模块依赖"，因此不支持直接作为 JS 模块导入

3. **浏览器限制**：即使文件被复制，浏览器也无法直接解析 SCSS 语法

## 解决方案

### 方案一：HTML 直接引用（适合不需要编译的静态 CSS）

**适用场景**：文件已经是编译好的 CSS，或者只需要简单引用

**操作步骤：**

1. 将 `common.scss` 手动编译为 `common.css`
2. 在 `index.html` 的 `<head>` 中添加引用：

```html
<link rel="stylesheet" href="/css/common.css">
```

**注意**：如果文件本身就是 `.css` 格式，可直接在 HTML 中引用，无需编译。

### 方案二：移至 src 目录（推荐）

**适用场景**：SCSS 文件需要被 JS/Vue/React 组件使用

**操作步骤：**

1. 将文件从 `/public/css/common.scss` 移至 `src/styles/common.scss`
2. 在组件中正常导入：

```javascript
// 方式一：相对路径
import './styles/common.scss';

// 方式二：使用别名（需在 vite.config.js 中配置）
import '@styles/common.scss';
```

**配置别名（可选）：**

```javascript
// vite.config.js
import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@styles': path.resolve(__dirname, 'src/styles')
    }
  }
})
```

**优点**：
- ✅ Vite 自动编译 SCSS
- ✅ 支持热更新
- ✅ 支持模块化导入
- ✅ 可使用 `@use`、`@forward` 等 SCSS 特性

### 方案三：获取文件 URL（特殊场景）

**适用场景**：需要通过 JS 获取文件路径，而非直接加载样式

```javascript
const scssUrl = new URL('/css/common.scss?url', import.meta.url).href;
// 注意：这只会获取路径，不会编译 SCSS
```

**警告**：此方法仅获取 URL，浏览器仍无法直接渲染 SCSS，不适用于页面样式加载。

## 最佳实践

| 场景 | 推荐方案 | 说明 |
|------|----------|------|
| 全局样式文件 | 方案二 | 移至 `src/styles/`，在 `main.js` 中导入 |
| 静态资源 | 方案一 | 直接在 HTML 中引用 |
| 特殊用途 | 方案三 | 仅获取 URL，不推荐用于样式 |

## 常见误区

1. **误区**：在 `public` 下放 SCSS 文件并 import，期望 Vite 自动编译
   **正解**：`public` 下的文件不会被 Vite 处理，只会原样复制

2. **误区**：在 HTML 中直接引用 `.scss` 文件
   **正解**：浏览器不支持 SCSS，必须先编译为 CSS

3. **误区**：使用 `import` 导入 `public` 下的 CSS 文件
   **正解**：CSS 文件也应移至 `src` 目录，或在 HTML 中用 `<link>` 引用

## 相关配置

确保已安装 `sass` 依赖：

```bash
npm install -D sass
# 或
yarn add -D sass
```