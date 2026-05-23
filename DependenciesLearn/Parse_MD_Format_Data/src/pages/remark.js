import { remark } from 'remark'
import { visit } from 'unist-util-visit'

export function renderRemark(el, md) {
  const tree = remark().parse(md)

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
    codes.push({ lang: node.lang || 'text', value: node.value.slice(0, 80) + (node.value.length > 80 ? '...' : '') })
  })

  const tableData = []
  visit(tree, 'table', () => { tableData.push('发现表格节点') })

  el.innerHTML = `
    <div class="card">
      <h1>remark 解析结果</h1>
      <p><span class="tag">remark</span> 将 Markdown 解析为 <strong>mdast</strong>（Markdown AST），通过 <code>unist-util-visit</code> 遍历节点。</p>
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
  `
}

function formatAST(node, indent = 0) {
  const pad = '  '.repeat(indent)
  let type = node.type
  let label = type

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
