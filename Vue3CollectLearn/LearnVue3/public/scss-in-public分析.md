# SCSS 文件放在 public 目录下能否被编译？

## 结论

| 引入方式 | 是否被编译 |
|---------|-----------|
| `index.html` 中用 `<link>` 引入 | ❌ 不会 |
| JS 中用**相对路径** `import` 引入 | ✅ 会 |

## 原因

`public/` 目录是**静态资源目录**，构建工具（Vite/Webpack）会将其内容**原样复制**到构建输出目录，不经过任何 loader/plugin 处理链。

但 JS 中的 `import` 语句走的是**模块处理链**，不受 `public/` 静态规则限制。

## 示例

### ❌ 不会被编译

```html
<!-- index.html -->
<link rel="stylesheet" href="/css/common.scss">
```

浏览器收到的是原始 `.scss` 文件，无法解析，样式不生效。

### ✅ 会被编译

```js
// main.js
import '../public/css/common.scss'
```

Vite/Webpack 会将 SCSS 编译为 CSS 后注入。

## 核心原则

- **静态引用**（HTML `<link>`、`<img src>`、绝对路径 URL）→ `public/` 下的文件不处理
- **模块导入**（JS `import`）→ 走构建管道，正常编译

> 本项目 `Vue3CollectLearn/LearnVue3/public/css/common.scss` 即为一个反面示例：通过 `<link>` 引入 SCSS，浏览器无法识别，样式不会生效。
