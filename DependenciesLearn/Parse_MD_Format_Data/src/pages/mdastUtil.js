import { fromMarkdown } from 'mdast-util-from-markdown'
import { visit } from 'unist-util-visit'

export function renderMdastUtil(el, md) {
  const tree = fromMarkdown(md)

  const headings = []
  visit(tree, 'heading', (node) => {
    headings.push({
      depth: node.depth,
      text: node.children.map(c => c.value || '').join(''),
    })
  })

  const links = []
  visit(tree, 'link', (node) => {
    links.push({ url: node.url, text: node.children.map(c => c.value || '').join('') })
  })

  const codes = []
  visit(tree, 'code', (node) => {
    codes.push({ lang: node.lang || 'text', value: node.value.slice(0, 60) + (node.value.length > 60 ? '...' : '') })
  })

  el.innerHTML = `
    <div class="card">
      <h1>mdast-util-from-markdown 解析结果</h1>
      <p><span class="tag">mdast-util-from-markdown</span>
        底层工具，直接解析 Markdown 字符串为 <strong>mdast</strong> AST，
        无需经过 unified / remark 管道，内部依赖 <strong>micromark</strong> 做词法解析。
      </p>
    </div>

    <div class="card">
      <h2>AST 结构（精简）</h2>
      <pre><code>${escapeHtml(formatAST(tree))}</code></pre>
    </div>

    <div class="grid-2">
      <div class="card">
        <h2>标题列表</h2>
        ${headings.map(h => `<div>${'#'.repeat(h.depth)} ${h.text}</div>`).join('')}
      </div>
      <div class="card">
        <h2>链接列表</h2>
        ${links.length ? links.map(l => `<div>🔗 <a href="${l.url}" target="_blank">${l.text}</a> → ${l.url}</div>`).join('') : '<div>无</div>'}
      </div>
    </div>

    <div class="grid-2">
      <div class="card">
        <h2>代码块列表</h2>
        ${codes.map(c => `<div><strong>${c.lang}</strong>: ${c.value}</div>`).join('')}
      </div>
      <div class="card">
        <h2>节点统计</h2>
        <div>标题: ${headings.length}</div>
        <div>链接: ${links.length}</div>
        <div>代码块: ${codes.length}</div>
      </div>
    </div>

    <div class="card">
      <h2>与 remark 对比</h2>
      <table>
        <thead><tr><th>维度</th><th>remark</th><th>mdast-util-from-markdown</th></tr></thead>
        <tbody>
          <tr><td>定位</td><td>统一处理器（unified 插件）</td><td>纯解析工具（底层库）</td></tr>
          <tr><td>依赖</td><td>unified + remark-parse</td><td>micromark（词法）+ 自身（语法）</td></tr>
          <tr><td>灵活性</td><td>可链式调用 remark plugins</td><td>直接出 AST，无中间层</td></tr>
          <tr><td>包体积</td><td>较大</td><td>更小</td></tr>
        </tbody>
      </table>
    </div>
  `
}

function formatAST(node, indent = 0) {
  const pad = '  '.repeat(indent)
  let label = node.type

  if (node.value !== undefined && node.value !== null) {
    const val = typeof node.value === 'string' ? JSON.stringify(node.value.slice(0, 50)) : node.value
    label += ` = ${val}`
  }
  if (node.depth) label += ` [depth=${node.depth}]`
  if (node.lang) label += ` [lang=${node.lang}]`
  if (node.url) label += ` [url=${node.url.slice(0, 40)}]`
  if (node.ordered !== undefined) label += ` [ordered=${node.ordered}]`

  let result = pad + '▸ ' + label
  if (node.children) {
    result += '\n' + node.children.map(n => formatAST(n, indent + 1)).join('\n')
  }
  return result
}

function escapeHtml(str) {
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}
