// marked：Markdown 解析器核心库
import { marked } from 'marked'
// marked-highlight：提供代码高亮功能的插件
import { markedHighlight } from 'marked-highlight'
// highlight.js：代码语法高亮引擎
import hljs from 'highlight.js'
// marked-katex-extension：支持 LaTeX 数学公式渲染的插件
import markedKatex from 'marked-katex-extension'

// 注册代码高亮插件 —— 将代码块用 highlight.js 着色输出
marked.use(markedHighlight({
  // CSS 类名前缀，配合 highlight.js 主题样式
  langPrefix: 'hljs language-',
  highlight(code, lang) {
    // 若无法识别语言则降级为纯文本
    const language = hljs.getLanguage(lang) ? lang : 'plaintext'
    return hljs.highlight(code, { language }).value
  }
}))

// 注册 KaTeX 数学公式插件 —— 支持行内/块级 $...$ 与 $$...$$ 语法
marked.use(markedKatex({ throwOnError: false, nonStandard: true }))
