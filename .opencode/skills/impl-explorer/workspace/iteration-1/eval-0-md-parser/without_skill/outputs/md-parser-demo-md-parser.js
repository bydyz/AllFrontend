import { marked } from 'marked'
import { markedHighlight } from 'marked-highlight'
import hljs from 'highlight.js'

marked.use(
  markedHighlight({
    langPrefix: 'hljs language-',
    highlight(code, lang) {
      const language = hljs.getLanguage(lang) ? lang : 'plaintext'
      return hljs.highlight(code, { language }).value
    }
  })
)

marked.setOptions({
  breaks: true,
  gfm: true,
})

const DEFAULT_MD = `# Markdown 解析演示

## 简介

这是一个基于 **marked** + **highlight.js** 的 Markdown 解析演示项目。

## 代码示例

### JavaScript

\`\`\`js
function greet(name) {
  console.log(\`你好, \${name}!\`);
  return \`Hello, \${name}\`;
}

const arr = [1, 2, 3].map(n => n * 2);
console.log(greet('World'));
\`\`\`

### Python

\`\`\`python
def fibonacci(n):
    a, b = 0, 1
    for _ in range(n):
        yield a
        a, b = b, a + b

print(list(fibonacci(10)))
\`\`\`

## 列表

### 无序列表
- 原生 JavaScript 方案
- 使用 marked 解析
- highlight.js 高亮代码

### 有序列表
1. 输入 Markdown 文本
2. 实时解析为 HTML
3. 渲染美观的预览

## 引用

> 代码是写给人看的，顺便能在机器上运行。
> —— Harold Abelson

## 表格

| 库名 | 用途 | 许可证 |
|------|------|--------|
| marked | Markdown -> HTML | MIT |
| highlight.js | 代码高亮 | BSD-3 |

## 链接和图片

[GitHub](https://github.com)
`

export function initMdParser() {
  const app = document.getElementById('app')

  app.innerHTML = `
    <div class="app-container">
      <h1>📝 Markdown 解析器演示 (原生 JS)</h1>
      <div class="editor-section">
        <textarea id="editor">${escapeHtml(DEFAULT_MD)}</textarea>
        <div id="preview" class="preview">${marked.parse(DEFAULT_MD)}</div>
      </div>
    </div>
  `

  const editor = document.getElementById('editor')
  const preview = document.getElementById('preview')

  let debounceTimer
  editor.addEventListener('input', () => {
    clearTimeout(debounceTimer)
    debounceTimer = setTimeout(() => {
      preview.innerHTML = marked.parse(editor.value)
    }, 200)
  })
}

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}
