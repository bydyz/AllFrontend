<template>
  <div>
    <div class="card">
      <h1>markdown-it 解析</h1>
      <p>
        <span class="tag">markdown-it</span>
        最主流的 Markdown 解析器，配合插件生态实现"完美展示"：
      </p>
      <ul>
        <li><code>markdown-it-highlightjs</code> — 代码语法高亮</li>
        <li><code>markdown-it-texmath</code> — 数学公式 (KaTeX)</li>
        <li><code>github-markdown-css</code> — GitHub 风格样式</li>
      </ul>
    </div>

    <div class="card">
      <div class="tab-bar">
        <button class="tab-btn" :class="{ active: tab === 'render' }" @click="tab = 'render'">渲染效果</button>
        <button class="tab-btn" :class="{ active: tab === 'code' }" @click="tab = 'code'">示例代码</button>
        <button class="tab-btn" :class="{ active: tab === 'tokens' }" @click="tab = 'tokens'">Token 流</button>
      </div>

      <div v-if="tab === 'code'">
        <pre><code>{{ escapeHtml(codeSample) }}</code></pre>
      </div>

      <div v-if="tab === 'tokens'">
        <pre><code>{{ escapeHtml(tokenInfo) }}</code></pre>
      </div>
    </div>

    <!-- 受到 style.css 中 h1 、 h2 、 h3 等的影响，即使加上了 :(where) 也不够，最终只能将 本div移出 .card 之外；同时还需要将 style.css 中的 rendered-html 设置的背景注释掉 -->
    <!-- 需要加 markdown-body 以应用 github-markdown-css 的样式 -->
    <div v-if="tab === 'render'" class="rendered-html markdown-body" v-html="renderedHtml"></div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js'
import texmath from 'markdown-it-texmath'
import katex from 'katex'
import 'github-markdown-css'
import 'highlight.js/styles/github-dark.css'
import 'katex/dist/katex.min.css'

const props = defineProps({ md: String })
const tab = ref('render')

// 创建 markdown-it 实例
//   html: true        —— 允许内嵌 HTML 标签，不进行转义
//   linkify: true     —— 自动识别裸 URL 并转为 <a> 链接
//   typographer: true —— 启用排版替换，如 (c) → ©, ... → … 等
const mdIt = new MarkdownIt({ html: true, linkify: true, typographer: true })
  // texmath 插件：用 KaTeX 引擎渲染数学公式
  //   dollars模式  —— $...$（行内）和 $$...$$（块级）
  //   begin模式    —— \begin{equation}...\end{equation} 等 LaTeX 环境
  .use(texmath, { engine: katex, delimiters: ['dollars', 'begin'] })
  // 开启 ~~删除线~~ 语法（默认关闭）
  .enable('strikethrough')

// 自定义代码高亮：替换 markdown-it 默认的 <pre><code> 输出
//   str  —— 代码块源码字符串
//   lang —— 语言标识（如 "javascript"、"css"），可能为 undefined
mdIt.set({ highlight: (str, lang) => {
  // 如果指定了语言且 hljs 支持该语言，按该语言高亮
  if (lang && hljs.getLanguage(lang)) {
    return hljs.highlight(str, { language: lang }).value
  }
  // 否则按纯文本高亮（hljs 仍会做基本转义，防止 XSS）
  return hljs.highlight(str, { language: 'plaintext' }).value
}})

const renderedHtml = computed(() => mdIt.render(props.md))

const tokens = computed(() => mdIt.parse(props.md, {}))

const tokenInfo = computed(() => {
  const counts = {}
  for (const t of tokens.value) {
    counts[t.type] = (counts[t.type] || 0) + 1
  }
  const lines = Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .map(([type, count]) => `▸ ${type}: ${count} 个`)
  return `Token 类型统计（共 ${tokens.value.length} 个 token）：\n\n${lines.join('\n')}`
})

const codeSample = `
import MarkdownIt from 'markdown-it'
import highlightjs from 'markdown-it-highlightjs'
import texmath from 'markdown-it-texmath'
import 'github-markdown-css'
import 'highlight.js/styles/github-dark.css'

const mdIt = new MarkdownIt({ html: true, linkify: true })
  .use(highlightjs)
  .use(texmath, { engine: require('katex'), delimiters: ['dollars'] })

// 在组件中使用
// &lt;div class="markdown-body" v-html="mdIt.render(markdownText)" /&gt;
`.trim()

function escapeHtml(str) {
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}
</script>

<style scoped>
</style>
