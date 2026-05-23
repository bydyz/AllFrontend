# marked 页面二次进入异常 —— Bug 分析与修复

## 问题现象

`MarkedDemo.vue` 页面在**首次进入时**，JS 代码块和 CSS 代码块的语法高亮、数学公式渲染均正常显示；**导航离开后再次进入**，代码块高亮出现乱码、数学公式渲染异常。

## 原因分析

### 1. `marked.use()` 是全局累积式 API

`marked` 是一个**全局单例**，其 `use()` 方法每次调用都会将插件配置推入内部栈（renderer 链式包裹、tokenizer 数组追加、walkTokens 链式拼接）。多次调用相同插件不会覆盖，而是**叠加**。

相关源码路径：

- `node_modules/marked/lib/marked.esm.js:1906` — `use()` 方法入口
- `node_modules/marked/lib/marked.esm.js:1916-1928` — extension renderer 链式包裹
- `node_modules/marked/lib/marked.esm.js:1930-1954` — extension tokenizer 追加（`unshift`）
- `node_modules/marked/lib/marked.esm.js:2040-2051` — walkTokens 链式拼接

### 2. `<script setup>` 的编译行为

Vue 3 的 `<script setup>` 会将顶层代码编译进 `setup()` 函数体内，**每次组件挂载都会重新执行**。而 `App.vue` 使用 `v-if` 切换页面：

```html
<MarkedDemo v-else-if="currentTab === '/marked'" :md="sampleMd" />
```

- 离开 → 组件销毁（`v-if` 为 `false`）
- 再次进入 → 组件重建 → `setup()` 重新执行 → `marked.use()` **再次调用**

### 3. 关键冲突：`markedHighlight` 的 `walkTokens`

`markedHighlight` 使用 `walkTokens` 在标记解析阶段对代码块进行高亮处理（`node_modules/marked-highlight/src/index.js:22-38`），逻辑是：

1. 接收代码块 token
2. 调用 `hljs.highlight(code)` 得到高亮 HTML
3. 将 `token.text` 替换为高亮后的 HTML

两次进入后的 walkTokens 链：

| 次数 | walkTokens 链 | 行为 |
|------|--------------|------|
| 第 1 次进入 | `[fn1]` | `fn1` 收到原始代码 `function fibonacci(n) { ... }` → `hljs.highlight()` → ✅ 正常 |
| 第 2 次进入 | `[fn2, fn1]` | `fn2` 将原始代码高亮为含 `<span class="hljs-keyword">` 的 HTML → `fn1` **将 HTML 再次传给 `hljs.highlight()`** → ❌ 乱码 |

### 4. 次要冲突：`markedKatex` 的 extension 重复注册

`markedKatex` 注册 `inlineKatex` 和 `blockKatex` 两个 extension，`marked.use()` 重复调用时：

- **tokenizer** 被 `unshift` 追加：`[tokenizer2, tokenizer1]`（虽影响较小，但 tokenizer2 消耗输入后 tokenizer1 无匹配）
- **renderer** 被链式包裹：新 renderer 返回结果非 `false` 时不回退旧 renderer（影响小）
- **start 函数** 被重复注册：重复扫描相同位置（冗余但无副作用）

---

## 修复方案

### 核心思路

确保 `marked.use()` **在整个应用生命周期中只执行一次**。

利用 ES Module 的缓存机制：一个模块即使被多处 `import`，其顶层代码也**只执行一次**。

### 具体做法

**第一步**：新建 `src/marked-init.js`，将插件初始化移至模块顶层

```js
import { marked } from 'marked'
import { markedHighlight } from 'marked-highlight'
import hljs from 'highlight.js'
import markedKatex from 'marked-katex-extension'

marked.use(markedHighlight({
  langPrefix: 'hljs language-',
  highlight(code, lang) {
    const language = hljs.getLanguage(lang) ? lang : 'plaintext'
    return hljs.highlight(code, { language }).value
  }
}))

marked.use(markedKatex({ throwOnError: false, nonStandard: true }))
```

**第二步**：在 `MarkedDemo.vue` 中导入该文件（只需 import 即可触发执行）

```js
import '../marked-init.js'
```

同时移除组件内的 `marked.use()` 调用和不再需要的 import。

### 设计选择说明

| 方案 | 说明 |
|------|------|
| ✅ **独立模块文件** | 利用 ES Module 缓存，导入即执行一次，职责单一 |
| ❌ `<script>` 普通块 | 需重复 import，产生冗余 |
| ❌ `main.js` 集中注册 | 耦合入口文件，不够内聚 |
| ❌ 全局 flag 守卫 | 侵入性改造，不够优雅 |

### 参考

- [marked 文档 - use()](https://marked.js.org/using_advanced#use)
- [marked-highlight 源码](https://github.com/markedjs/marked-highlight)
- [marked-katex-extension 源码](https://github.com/UziTech/marked-katex-extension)
