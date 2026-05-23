<template>
  <div class="app-container">
    <h1>Markdown 解析器演示 (Vue 3)</h1>
    <div class="editor-section">
      <textarea v-model="raw" @input="onInput" placeholder="在此输入 Markdown..."></textarea>
      <div class="preview" v-html="rendered" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { marked } from 'marked'
import { markedHighlight } from 'marked-highlight'
import hljs from 'highlight.js'
import 'highlight.js/styles/github-dark.css'

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

const raw = ref('')
const rendered = ref('')
let timer = null

const defaultMd = `# Markdown 解析演示

## 简介

这是一个基于 **marked** + **highlight.js** 的 Markdown 解析演示项目，使用 Vue 3 Composition API 构建。

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
- Vue 3 组合式 API
- 使用 marked 解析
- highlight.js 高亮代码

### 有序列表
1. 输入 Markdown 文本
2. 实时解析为 HTML
3. 渲染美观的预览

## 引用

> Talk is cheap. Show me the code.
> —— Linus Torvalds

## 表格

| 特性 | Vue 方案 | 原生方案 |
|------|----------|----------|
| 响应式 | 自动 (v-model) | 手动监听事件 |
| 代码组织 | SFC 组件 | ES Module |
| 防抖 | 手动 debounce | 手动 debounce |

## 链接

[Vue 3 官方文档](https://vuejs.org/)
`

onMounted(() => {
  raw.value = defaultMd
  rendered.value = marked.parse(defaultMd)
})

function onInput() {
  clearTimeout(timer)
  timer = setTimeout(() => {
    rendered.value = marked.parse(raw.value)
  }, 200)
}
</script>

<style scoped>
.app-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 24px;
}

h1 {
  font-size: 24px;
  margin-bottom: 20px;
  color: #58a6ff;
}

.editor-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

textarea {
  width: 100%;
  min-height: 300px;
  padding: 16px;
  border: 1px solid #30363d;
  border-radius: 8px;
  background: #161b22;
  color: #c9d1d9;
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
  font-size: 14px;
  line-height: 1.6;
  resize: vertical;
}

textarea:focus {
  outline: none;
  border-color: #58a6ff;
}

.preview {
  border: 1px solid #30363d;
  border-radius: 8px;
  padding: 24px;
  background: #161b22;
  min-height: 200px;
  line-height: 1.8;
}

.preview :deep(h1),
.preview :deep(h2),
.preview :deep(h3) {
  margin: 1em 0 0.5em;
  color: #f0f6fc;
}

.preview :deep(h1) { font-size: 1.8em; border-bottom: 1px solid #21262d; padding-bottom: 0.3em; }
.preview :deep(h2) { font-size: 1.5em; border-bottom: 1px solid #21262d; padding-bottom: 0.3em; }
.preview :deep(h3) { font-size: 1.25em; }

.preview :deep(p) { margin: 0.5em 0; }

.preview :deep(ul),
.preview :deep(ol) { padding-left: 2em; margin: 0.5em 0; }
.preview :deep(li) { margin: 0.25em 0; }

.preview :deep(blockquote) {
  border-left: 4px solid #30363d;
  padding: 0.5em 1em;
  margin: 0.5em 0;
  color: #8b949e;
  background: #0d1117;
  border-radius: 0 4px 4px 0;
}

.preview :deep(code) {
  background: #0d1117;
  padding: 2px 6px;
  border-radius: 4px;
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
  font-size: 0.875em;
}

.preview :deep(pre) {
  margin: 1em 0;
  border-radius: 8px;
  overflow-x: auto;
}

.preview :deep(pre code) {
  padding: 16px;
  background: transparent;
}

.preview :deep(a) {
  color: #58a6ff;
  text-decoration: none;
}

.preview :deep(a:hover) { text-decoration: underline; }

.preview :deep(table) {
  border-collapse: collapse;
  width: 100%;
  margin: 1em 0;
}

.preview :deep(th),
.preview :deep(td) {
  border: 1px solid #30363d;
  padding: 8px 12px;
  text-align: left;
}

.preview :deep(th) { background: #21262d; font-weight: 600; }

.preview :deep(img) { max-width: 100%; border-radius: 4px; }

.preview :deep(hr) {
  border: none;
  border-top: 1px solid #30363d;
  margin: 1.5em 0;
}
</style>
