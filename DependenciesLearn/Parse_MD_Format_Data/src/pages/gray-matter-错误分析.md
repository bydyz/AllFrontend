# gray-matter 路由 `Buffer is not defined` 错误分析

## 错误信息

```
Uncaught ReferenceError: Buffer is not defined
    at exports2.toBuffer (gray-matter.js:3183:42)
    at module2.exports (gray-matter.js:3352:40)
    at matter (gray-matter.js:3402:18)
    at renderGrayMatter (grayMatter.js:4:18)
    at router (main.js:24:5)
```

## 原因

`gray-matter` 内部使用了 Node.js 的 `Buffer` 类（用于将字符串编码为 YAML 解析器的输入格式），而浏览器环境中没有 `Buffer` 这个全局对象。

调用链：
1. `renderGrayMatter` 调用 `matter(md)`
2. `gray-matter` 内部调用 `js-yaml` 加载器
3. 加载器调用 `toBuffer()` 将字符串转为 Buffer
4. `Buffer` 在浏览器中不存在 → 抛出 `ReferenceError`

## 解决方案

### 方案 1（本项目采用的方案）：添加 Buffer Polyfill

借助 Vite 生态工具，在浏览器中注入 `Buffer` polyfill。

**步骤：**

```bash
npm install buffer vite-plugin-node-polyfills
```

**`vite.config.js`：**

```js
import { defineConfig } from 'vite'
import { nodePolyfills } from 'vite-plugin-node-polyfills'

export default defineConfig({
  define: { global: 'globalThis' },
  plugins: [
    nodePolyfills({ include: ['buffer'] }),
  ],
  optimizeDeps: {
    include: ['buffer'],
  },
})
```

**`src/main.js` 顶部：**

```js
import { Buffer } from 'buffer'
window.Buffer = Buffer
```

### 方案 2：服务端解析

将 MD 解析逻辑放在 Node.js 后端（Express/Koa），浏览器端只负责展示结果。

### 方案 3：替换为纯浏览器端无需 Buffer 的库

用 `front-matter` 替代 `gray-matter`，或使用 `remark` 的 frontmatter 插件。

## 经验总结

在浏览器中使用原本为 Node.js 设计的 npm 包时，需要留意其是否依赖 `Buffer`、`process`、`path` 等 Node.js 内置模块。Vite 的 `vite-plugin-node-polyfills` 可以一站式解决这类兼容问题。
