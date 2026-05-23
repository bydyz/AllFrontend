<template>
  <div>
    <div class="card">
      <h1>marked 解析</h1>
      <p>
        <span class="tag">marked</span>
        轻量级 Markdown 编译器，零配置即可使用。配合 <code>marked-highlight</code> 实现代码高亮。
      </p>
    </div>

    <div class="card">
      <div class="tab-bar">
        <button class="tab-btn" :class="{ active: tab === 'render' }" @click="tab = 'render'">渲染效果</button>
        <button class="tab-btn" :class="{ active: tab === 'code' }" @click="tab = 'code'">示例代码</button>
        <button class="tab-btn" :class="{ active: tab === 'tokens' }" @click="tab = 'tokens'">Token 列表</button>
      </div>

      <div v-if="tab === 'code'">
        <pre><code>{{ escapeHtml(codeSample) }}</code></pre>
      </div>

      <div v-if="tab === 'tokens'">
        <pre><code>{{ escapeHtml(tokenInfo) }}</code></pre>
      </div>
    </div>

    <!-- 受到 style.css 中 h1 、 h2 、 h3 等的影响，即使加上了 :(where) 也不够，最终只能将 本div移出 .card 之外；同时还需要将 style.css 中的 rendered-html 设置的背景注释掉 -->
    <div v-if="tab === 'render'" class="rendered-html markdown-body" v-html="renderedHtml"></div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { marked } from 'marked'
import '../marked-init.js'
import 'highlight.js/styles/github-dark.css'
import 'katex/dist/katex.min.css'

const props = defineProps({ md: String })
const tab = ref('render')

// 同步解析 Markdown 字符串为 HTML
// marked.parse 内部调用 lexer 分词 → parser 组装 → 输出 HTML 字符串
const renderedHtml = computed(() => marked.parse(props.md))

const tokens = computed(() => marked.lexer(props.md))

const tokenInfo = computed(() => {
  function formatTokens(list, indent = 0) {
    const pad = '  '.repeat(indent)
    return list.map(t => {
      let line = `${pad}▸ ${t.type}`
      if (t.depth) line += ` [depth=${t.depth}]`
      if (t.lang) line += ` [lang=${t.lang}]`
      if (t.text && t.type !== 'code') line += ` = ${JSON.stringify(t.text.slice(0, 50))}`
      if (t.tokens?.length) line += `\n${formatTokens(t.tokens, indent + 1)}`
      if (t.items?.length) line += `\n${formatTokens(t.items, indent + 1)}`
      return line
    }).join('\n')
  }
  return `Token 列表（共 ${tokens.value.length} 个顶层 token）：\n\n${formatTokens(tokens.value)}`
})

const codeSample = `
import { marked } from 'marked'
import { markedHighlight } from 'marked-highlight'
import hljs from 'highlight.js'

marked.use(markedHighlight({
  highlight(code, lang) {
    return hljs.highlight(code, { language: lang || 'plaintext' }).value
  }
}))

// 在组件中使用
// &lt;div v-html="marked.parse(markdownText)" /&gt;
`.trim()

function escapeHtml(str) {
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}
</script>

<style scoped>
/* 让代码块的 <pre> 底色与 highlight.js 深色主题保持一致
   避免 github-markdown-css 的浅灰底色透过 <pre> padding 区域露出 */
.markdown-body :deep(pre) {
  background: #1e1e2e;
}
</style>
