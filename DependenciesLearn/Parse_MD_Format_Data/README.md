# Markdown 解析工具示例项目

## 会话摘要

询问 JS 生态中解析 MD 文档并获取其中 MD 格式数据的依赖或工具。

**回答要点：**

| 工具 | 作用 |
|------|------|
| **remark** + **remark-parse** | 将 MD 解析为 **mdast**（Markdown AST），支持完整遍历、查询、修改、重新输出 |
| **micromark** | remark 底层的流式解析器，高性能、最小化 |
| **mdast-util-from-markdown** | 直接解析 MD 字符串为 mdast 对象 |
| **gray-matter** | 专门提取 YAML/TOML/JSON frontmatter |
| **marked** | 老牌解析器，输出 tokens 或 HTML |
| **markdown-it** | 插件化解析器，输出 token 流 |

推荐：如果目的是获取 MD 结构化数据，使用 **remark** + 生态插件；如果只需要 frontmatter，用 `gray-matter` 就够。

---

## 各方式解析示例

### 1. remark（推荐）

unified 生态的核心，将 Markdown 解析为 mdast AST，可用 `unist-util-visit` 遍历任意节点。

```js
import { remark } from 'remark'
import { visit } from 'unist-util-visit'

const md = `# Hello\n\nThis is **bold** text.`
const tree = remark().parse(md)

// tree 是 mdast 根节点
console.log(tree.type) // 'root'

// 遍历所有 heading 节点
visit(tree, 'heading', (node) => {
  console.log(node.depth, node.children.map(c => c.value))
})

// 遍历所有 link 节点
visit(tree, 'link', (node) => {
  console.log(node.url, node.children.map(c => c.value))
})
```

**输出示例：**

```
▸ root
  ▸ heading [depth=1]
    ▸ text = "Hello"
  ▸ paragraph
    ▸ text = "This is "
    ▸ strong
      ▸ text = "bold"
    ▸ text = " text."
```

### 2. gray-matter

专门提取 frontmatter，支持 YAML / TOML / JSON。

```js
import matter from 'gray-matter'

const md = `---
title: 示例
date: 2026-01-01
tags: [js, md]
---

# 正文内容`

const parsed = matter(md)
console.log(parsed.data)    // { title: '示例', date: '2026-01-01', tags: ['js', 'md'] }
console.log(parsed.content) // '# 正文内容'（去除 frontmatter 后的正文）
console.log(parsed.isEmpty) // false（是否有 frontmatter）
```

**常用方法：**

- `matter(string)` — 解析，返回 `{ data, content, excerpt, isEmpty }`
- `matter(string, { excerpt: true })` — 同时提取摘要
- `matter.read(path)` — 直接读文件解析

### 3. mdast-util-from-markdown

底层解析工具，不经过 unified/remark 管道，直接将 Markdown 解析为 mdast AST，内部依赖 micromark 做词法分析。

```js
import { fromMarkdown } from 'mdast-util-from-markdown'
import { visit } from 'unist-util-visit'

const md = `# Hello\n\nThis is **bold** text.`
const tree = fromMarkdown(md)

// tree 是 mdast 根节点，结构与 remark 输出一致
console.log(tree.type) // 'root'

visit(tree, 'heading', (node) => {
  console.log(node.depth, node.children.map(c => c.value))
})
```

**与 remark 对比：**

| 维度 | remark | mdast-util-from-markdown |
|------|--------|--------------------------|
| 定位 | unified 插件体系的处理器 | 纯解析工具（底层库） |
| 依赖栈 | unified + remark-parse + micromark | micromark（词法）+ 自身（语法） |
| 灵活性 | 可链式调用 remark 插件 | 直接出 AST，无中间层 |
| 包体积 | 较大 | 更小 |

选它还是选 remark：如果你不需要 remark 插件生态（如 rehype、重新序列化），只想把 MD 变成 AST，`mdast-util-from-markdown` 是更轻量的选择。

### 4. marked

老牌 Markdown 编译器，支持同步解析，输出 token 列表或 HTML。

```js
import { marked } from 'marked'

const md = '# Hello\n\n1. 第一项\n2. 第二项'

// 获取 token 流
const tokens = marked.lexer(md)
console.log(tokens)
// [
//   { type: 'heading', depth: 1, text: 'Hello', tokens: [...] },
//   { type: 'list', ordered: true, items: [...] }
// ]

// 直接渲染为 HTML
const html = marked.parse(md)
console.log(html) // '<h1>Hello</h1>\n<ol>\n<li>第一项</li>\n<li>第二项</li>\n</ol>'
```

**特点：**

- 零配置即可用
- 支持同步/异步解析
- 可自定义渲染器、扩展语法

### 5. markdown-it

插件化解析器，输出 token 流，生态丰富。

```js
import MarkdownIt from 'markdown-it'

const md = '**bold** and *italic*'
const mdIt = new MarkdownIt()

// 获取 token 流
const tokens = mdIt.parse(md, {})
console.log(tokens)
// 数组包含 inline/paragraph 等 token，每个 token 有 type、tag、level、content 等字段

// 渲染为 HTML
const html = mdIt.render(md)
console.log(html) // '<p><strong>bold</strong> and <em>italic</em></p>'
```

**Token 结构示例：**

| 字段 | 说明 |
|------|------|
| `type` | 类型，如 `inline`、`paragraph_open` |
| `tag` | HTML 标签名 |
| `level` | 嵌套层级 |
| `nesting` | 1=open, 0=self-closing, -1=close |
| `content` | 文本内容 |
| `block` | 是否为块级 token |
| `children` | 内联子 token |

### 6. micromark

底层流式解析器，remark 和 mdast-util-from-markdown 的解析核心。性能极快，不输出 AST，直接编译为 HTML。

```js
import { micromark } from 'micromark'

const md = '# Hello\n\n**bold** text.'
const html = micromark(md)

console.log(html)
// '<h1>Hello</h1>\n<p><strong>bold</strong> text.</p>'
```

**特点：**

- 性能最快，无中间 AST 开销
- 可作为构建自定义解析器的底层引擎
- 通过 extension 机制扩展语法
- HTML 输出不可配置（语义化 HTML）

---

## 选型建议

| 需求 | 推荐工具 |
|------|---------|
| 获取结构化数据（遍历/查询） | **remark** + unist-util-visit |
| 轻量级 MD → AST | **mdast-util-from-markdown** |
| 只取 frontmatter | **gray-matter** |
| 快速渲染为 HTML | **marked** |
| 定制渲染/插件生态 | **markdown-it** |
| 极致性能/底层定制 | **micromark** |

---

## 项目运行

```bash
npm install
npm run dev
```

然后在浏览器中打开控制台显示的地址（默认 http://localhost:5173），通过导航栏切换不同解析方式的演示页面。
