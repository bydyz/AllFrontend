# 深度解析: marked-highlight

## Step 1: 介绍名词代表的意义

### 1.1 一句话定义
marked-highlight 是 marked 官方维护的扩展插件，用于为 Markdown 渲染结果中的代码块添加语法高亮功能。

### 1.2 详细定义
- **概念**：marked 的官方扩展插件，遵循 marked extension API
- **场景**：在 marked 解析 Markdown 时，自动对代码块进行语法高亮着色
- **解决问题**：marked 本身只将代码块包裹在 `<pre><code>` 标签中，不支持语法着色。marked-highlight 桥接了语法高亮引擎（如 highlight.js、Prism 等）与 marked 的渲染管道
- **所属领域**：JavaScript Markdown 解析 / 代码语法高亮

### 1.3 概念卡片
```
┌─────────────────────────────────────────┐
│  概念: marked-highlight                 │
├─────────────────────────────────────────┤
│  一句话定义: marked 代码高亮扩展        │
│  所属领域: Markdown 解析 / 代码高亮     │
│  解决问题: 为 marked 增加代码语法着色   │
│  核心机制: walkTokens + renderer        │
│  依赖: marked (>=4 <19)                 │
└─────────────────────────────────────────┘
```

## Step 2: 介绍其来由

### 2.1 背景与起源

marked 诞生于 2011 年，是 JavaScript 生态中最老牌的 Markdown 解析器之一，以**轻量、快速、零配置**著称。但它严格遵循"只做转换，不做美化"的原则——解析 Markdown 生成 HTML 时，代码块仅输出为 `<pre><code class="language-xxx">` 标签，不包含任何语法着色逻辑。

开发者博客、文档站、技术教程平台等场景对代码美观性的需求日益增长。早期社区方案五花八门：
- 在 marked 渲染完成后用 DOM 操作遍历代码块再着色
- 用正则替换将代码块提取出来后着色再插回
- 直接 fork marked 修改源码

这些方案耦合度高、性能差、维护困难。marked 官方需要一个**标准的、声明式的扩展机制**，让用户能以最小的成本集成任意高亮引擎。

marked-highlight 因此诞生，由 marked 核心团队（Tony Brix 等）维护，同时作为 marked extension API 的官方参考实现。

### 2.2 演进历程

| 版本 | 时间 | 说明 |
|------|------|------|
| v1.x | 早期 | 基于 marked 旧版 renderer 扩展，直接替换 renderer.code |
| v2.x | — | 利用 marked 新版 extension API（walkTokens + renderer），支持同步/异步高亮函数 |
| v2.2.4 | 2026-04 | 最新稳定版，支持 marked >=4 <19 |

### 2.3 设计考量

- **职责单一**：marked-highlight 不内置高亮引擎，只做"桥接"。用户需要额外引入 highlight.js / Prism / shiki 等库
- **扩展友好**：利用 marked 的 walkTokens（解析阶段预处理）和 renderer（输出阶段自定义）两套钩子，实现高亮
- **零侵入**：通过 `marked.use()` 注册，不修改 marked 核心逻辑

## Step 3: 介绍其所能实现的效果

### 3.1 核心功能

1. **桥接高亮引擎**：通过用户提供的 `highlight` 函数，将代码块文本交给任意高亮库处理
2. **自动替换渲染结果**：marked 解析时自动对代码块 token 进行高亮，输出着色后的 HTML
3. **语言类名前缀**：通过 `langPrefix` 自定义 `<code>` 标签的 CSS 类名
4. **无语言兜底类名**：通过 `emptyLangClass` 为未指定语言的代码块添加类名
5. **异步支持**：`async: true` 配合返回 Promise 的高亮函数

### 3.2 使用效果对比

**未使用 marked-highlight**：
```html
<pre><code class="language-javascript">const x = 1;</code></pre>
```
→ 纯文本，灰色单调，关键字和字符串无法区分

**使用 marked-highlight + highlight.js**：
```html
<pre><code class="hljs language-javascript">
  <span class="hljs-keyword">const</span> x = <span class="hljs-number">1</span>;
</code></pre>
```
→ 每个 token 被 `<span class="hljs-*">` 包裹，配合 CSS 主题提供丰富的语义着色

### 3.3 适用场景

- 静态博客 / 文档站（使用 marked 渲染 Markdown）
- 在线代码编辑器预览区
- 技术教程 / 学习平台
- 技术文档自动生成工具
- 任何需要 Markdown 渲染 + 代码高亮的 Web 应用

### 3.4 优缺点分析

| 优点 | 缺点 |
|------|------|
| API 极其简洁，仅关注桥接逻辑 | 本身不提供高亮，需配合第三方库 |
| 支持同步/异步两种模式 | walkTokens 链式特性可能导致重复调用（需注意 use 次数） |
| 官方维护，与 marked 版本同步 | 仅支持代码块级别高亮，不支持行号 |
| 利用 marked 内部 walkTokens，性能高效 | 配置灵活但要求用户了解高亮库的 API |
| 支持 ESM / CJS / UMD 三种格式 | 对无语言代码块的处理较基础 |

## Step 4: 介绍大体实现过程

### 4.1 整体流程涉及的角色

| 角色 | 职责 |
|------|------|
| **用户代码** | 创建 marked 实例，配置 markedHighlight 并调用 `marked.use()` 注册 |
| **marked-highlight** | 提供 extension 对象（walkTokens + renderer），在高亮引擎和 marked 之间做桥接 |
| **高亮引擎**（hljs/Prism 等） | 接收原始代码和语言名，返回着色后的 HTML |
| **marked** | 解析 Markdown 文本，生成 token 流，调用 walkTokens 和 renderer |

### 4.2 整体流程图

```
用户配置 markedHighlight(options)
           │
           ▼
  marked.use(extensionObject)
           │
           ▼
  用户调用 marked.parse(mdText)
           │
           ▼
  marked 词法分析 → 生成 token 流
           │
           ▼
  walkTokens 阶段 ──→ 检测 token.type === 'code'
                              │
                              ▼
                   调用 highlight(code, lang)
                              │
                              ▼
                   将着色 HTML 写回 token.text
                   设置 token.escaped = true
           │
           ▼
  renderer 阶段 ──→ token.escaped 为 true，直接输出
                              │
                              ▼
                   最终 HTML 包含着色后的 <code> 内容
```

### 4.3 核心实现原理

marked-highlight 的源码位于 `src/index.js`，核心只有 98 行。它返回一个 marked extension 对象，包含两个关键机制：

#### 机制一：`walkTokens` — 代码块预处理

```js
walkTokens(token) {
  if (token.type !== 'code') return;        // 只处理代码块 token

  const lang = getLang(token.lang);          // 取语言名（第一个非空格词）

  if (options.async) {
    return Promise.resolve(
      options.highlight(token.text, lang, token.lang || '')
    ).then(updateToken(token));
  }

  const code = options.highlight(token.text, lang, token.lang || '');
  if (code instanceof Promise) {
    throw new Error('markedHighlight is not set to async but the highlight function is async...');
  }
  updateToken(token)(code);
}
```

**执行时机**：marked 词法分析完成后、renderer 渲染前，遍历所有 token 并调用注册的 walkTokens 回调。

**作用**：拦截 `type === 'code'` 的 token，提取语言名，调用用户提供的 `highlight` 函数得到着色 HTML，然后将结果写回 token（`token.text = 着色HTML`，`token.escaped = true`）。

#### 机制二：`renderer.code` — 自定义输出

```js
renderer: {
  code(code, infoString, escaped) {
    if (typeof code === 'object') {
      escaped = code.escaped;
      infoString = code.lang;
      code = code.text;
    }
    const lang = getLang(infoString);
    const classValue = lang ? options.langPrefix + escape(lang) : options.emptyLangClass;
    const classAttr = classValue ? ` class="${classValue}"` : '';
    code = code.replace(/\n$/, '');
    return `<pre><code${classAttr}>${escaped ? code : escape(code, true)}\n</code></pre>`;
  },
}
```

**关键判断**：当 `token.escaped === true`（即 walkTokens 已处理过），直接输出 `code` 而不转义，因为 walkTokens 已经将原始代码替换为了高亮 HTML。

**`useNewRenderer: true`**：告诉 marked 使用新的 renderer 规则（token 作为对象传递而非展开为参数），使 renderer 能拿到 `token.escaped` 标记。

#### `updateToken` 辅助函数

```js
function updateToken(token) {
  return (code) => {
    if (typeof code === 'string' && code !== token.text) {
      token.escaped = true;
      token.text = code;
    }
  };
}
```

只在高亮结果与原始代码不同时才修改 token。这样既保证了高亮正常生效，又避免了无高亮时的无意义修改。

#### `getLang` 辅助函数

```js
function getLang(lang) {
  return (lang || '').match(/\S*/)[0];
}
```

从 `infoString`（如 `javascript alert("hello")`）中提取第一个非空词作为语言名。

### 4.4 代码示例

**同步模式（配合 highlight.js）**：
```js
import { marked } from 'marked'
import { markedHighlight } from 'marked-highlight'
import hljs from 'highlight.js'

marked.use(markedHighlight({
  langPrefix: 'hljs language-',
  highlight(code, lang) {
    const language = hljs.getLanguage(lang) ? lang : 'plaintext'
    return hljs.highlight(code, { language }).value
  }
}))

const html = marked.parse('```js\nconsole.log("hello")\n```')
```

**异步模式（配合 pygmentize）**：
```js
import { marked } from 'marked'
import { markedHighlight } from 'marked-highlight'
import pygmentize from 'pygmentize-bundled'

const marked = new Marked(
  markedHighlight({
    async: true,
    highlight(code, lang) {
      return new Promise((resolve, reject) => {
        pygmentize({ lang, format: 'html' }, code, (err, result) => {
          if (err) { reject(err); return }
          resolve(result.toString())
        })
      })
    }
  })
)

await marked.parse('```js\nconsole.log("hello")\n```')
```

### 4.5 关键 API 说明

| 选项 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `highlight` | `(code: string, lang: string, info: string) => string \| Promise<string>` | **必填** | 代码高亮转换函数。lang 是提取后的纯语言名，info 是完整的 infoString |
| `langPrefix` | `string` | `'language-'` | `<code>` 标签 class 的前缀。最终类名为 `{langPrefix}{lang}`。常见写法 `'hljs language-'` 会生成 `hljs language-javascript` 类名，其中 `hljs` 匹配 highlight.js 主题的全局样式，`language-` 用于标识具体语言 |
| `emptyLangClass` | `string` | `''` | 当代码块未指定语言时，添加到 `<code>` 标签的 class |
| `async` | `boolean` | `false` | 设置为 `true` 时启用异步模式，`highlight` 函数可返回 Promise。注意此时必须 `await marked.parse()` |

### 4.6 注意事项

#### 重复 `use()` 问题

marked 的 `use()` 是**全局累积式**的。每次调用都会将插件推入内部栈，walkTokens 被链式拼接：

```
第 1 次 use → walkTokens 链: [fn1] → ✅ 正常
第 2 次 use → walkTokens 链: [fn2, fn1] → ❌ fn1 对已高亮的 HTML 再次高亮 → 乱码
```

**解决方案**：将 `marked.use()` 放在独立模块顶层，利用 ES Module 缓存确保只执行一次：

```js
// src/marked-init.js
import { marked } from 'marked'
import { markedHighlight } from 'marked-highlight'
marked.use(markedHighlight({ highlight: ... }))

// 其他文件只需 import 该模块即可
import '../marked-init.js'
```

#### 高亮引擎选择

- **highlight.js**：最流行，支持 190+ 语言，体积较大
- **Prism.js**：轻量可定制，按需加载语言
- **shiki**：基于 VS Code 语法引擎，着色与 IDE 一致，但体积大
- **pygmentize-bundled**：Python Pygments 的 Node 移植版

#### `langPrefix: 'hljs language-'` 的含义解析

`langPrefix` 的值 `'hljs language-'` 由两部分拼接而成（**约定俗成，非强制**）：

- **`hljs`** — highlight.js 的 CSS 主题通过 `.hljs` 选择器应用全局样式（如背景色、默认文字颜色）。`<code class="hljs">` 使主题样式生效
- **`language-`** — 标识具体编程语言（如 `language-javascript`），便于 CSS 按语言定制特殊样式（例如为不同语言设置不同的标签颜色）

最终渲染结果为 `<code class="hljs language-javascript">`，供两种选择器各自匹配。

**版本差异**：highlight.js v11+ 已不再强制要求 `hljs` 前缀，仅使用 `language-` 即可正常工作。但 `'hljs language-'` 的写法仍能广泛兼容绝大多数主题，是目前最通用的方案。如果你的 CSS 主题只匹配 `.language-xxx`，可以简化为 `langPrefix: 'language-'`。
