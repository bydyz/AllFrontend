<template>
  <div>
    <div class="card">
      <h1>remark + rehype 解析</h1>
      <p>
        <span class="tag">remark</span>
        基于 unified 生态的 AST 管道处理，将 Markdown 解析为 mdast，再通过 rehype 转为 HTML。
        全程可插拔、高度可定制。
      </p>
    </div>

    <div class="card">
      <div class="tab-bar">
        <button class="tab-btn" :class="{ active: tab === 'render' }" @click="tab = 'render'">渲染效果</button>
        <button class="tab-btn" :class="{ active: tab === 'code' }" @click="tab = 'code'">示例代码</button>
        <button class="tab-btn" :class="{ active: tab === 'ast' }" @click="tab = 'ast'">AST 结构</button>
      </div>

      <div v-if="tab === 'code'">
        <pre><code>{{ escapeHtml(codeSample) }}</code></pre>
      </div>

      <div v-if="tab === 'ast'">
        <pre><code>{{ escapeHtml(astPreview) }}</code></pre>
      </div>
    </div>

    <!-- 受到 style.css 中 h1 、 h2 、 h3 等的影响，即使加上了 :(where) 也不够，最终只能将 本div移出 .card 之外；同时还需要将 style.css 中的 rendered-html 设置的背景注释掉 -->
    <div v-if="tab === 'render'" class="rendered-html markdown-body" v-html="renderedHtml"></div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import remarkRehype from 'remark-rehype'
import rehypeKatex from 'rehype-katex'
import rehypeStringify from 'rehype-stringify'
import rehypeHighlight from 'rehype-highlight'
import 'highlight.js/styles/github-dark.css'
import 'katex/dist/katex.min.css'

const props = defineProps({ md: String })
const tab = ref('render')

// 创建 unified 处理器管道，MD → mdast → hast → HTML
const processor = unified()
  // ※ remark 阶段：Markdown → mdast（Markdown AST）
  .use(remarkParse)       // 核心解析器：将原始 Markdown 字符串解析为 mdast 语法树
  .use(remarkGfm)         // GFM 扩展：识别表格、删除线 (~~)、任务列表 (- [x]) 等 GFM 特有语法
  .use(remarkMath)        // 数学公式解析：识别 $...$（行内公式）和 $$...$$（块级公式）, 在 mdast 中生成 math/inlineMath 节点
  // ※ rehype 阶段：mdast → hast（HTML AST）
  .use(remarkRehype)      // 桥梁插件：将 mdast 转换为 hast（HTML 抽象语法树），使后续插件能以 HTML 节点操作
  // ※ rehype 阶段：hast → HTML
  .use(rehypeHighlight)   // 代码高亮：基于 highlight.js，查找 <code> 节点并按语言添加高亮样式类
  .use(rehypeKatex)       // 公式渲染：查找 math/inlineMath 节点，用 KaTeX 引擎替换为带样式的 HTML 结构
  .use(rehypeStringify)   // 序列化：将 hast 最终输出为 HTML 字符串

const renderedHtml = computed(() => processor.processSync(props.md).toString())

const astPreview = computed(() => {
  const tree = unified().use(remarkParse).parse(props.md)
  return formatAST(tree)
})

const codeSample = `
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'
import rehypeHighlight from 'rehype-highlight'

const processor = unified()
  .use(remarkParse)       // MD → mdast
  .use(remarkRehype)      // mdast → hast
  .use(rehypeHighlight)   // 代码高亮
  .use(rehypeStringify)   // hast → HTML

// 在组件中使用
// const html = String(await processor.process(markdownText))
// &lt;div v-html="html" /&gt;
`.trim()

function formatAST(node, indent = 0) {
  const pad = '  '.repeat(indent)
  let label = node.type
  if (node.value !== undefined && node.value !== null) {
    label += ` = ${JSON.stringify(String(node.value).slice(0, 50))}`
  }
  if (node.depth) label += ` [depth=${node.depth}]`
  if (node.lang) label += ` [lang=${node.lang}]`
  let result = pad + '▸ ' + label
  if (node.children) {
    result += '\n' + node.children.map(n => formatAST(n, indent + 1)).join('\n')
  }
  return result
}

function escapeHtml(str) {
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}
</script>

<style scoped>
</style>
