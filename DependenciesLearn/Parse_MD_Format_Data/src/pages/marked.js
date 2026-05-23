import { marked } from 'marked'

export function renderMarked(el, md) {
  const tokens = marked.lexer(md)
  const html = marked.parse(md)

  el.innerHTML = `
    <div class="card">
      <h1>marked 解析结果</h1>
      <p><span class="tag">marked</span> 老牌 Markdown 编译器，支持同步解析，输出 tokens 或 HTML。</p>
    </div>

    <div class="card">
      <h2>Token 列表</h2>
      <pre><code>${escapeHtml(formatTokens(tokens))}</code></pre>
    </div>

    <div class="card">
      <h2>Token 统计</h2>
      <table>
        <thead><tr><th>类型</th><th>数量</th></tr></thead>
        <tbody>
          ${countTokens(tokens).map(([type, count]) => `<tr><td>${type}</td><td>${count}</td></tr>`).join('')}
        </tbody>
      </table>
    </div>

    <div class="card">
      <h2>渲染为 HTML</h2>
      <pre><code>${escapeHtml(html.slice(0, 800))}${html.length > 800 ? '...' : ''}</code></pre>
    </div>
  `
}

function formatTokens(tokens, indent = 0) {
  const pad = '  '.repeat(indent)
  return tokens.map(t => {
    let line = `${pad}▸ ${t.type}`
    if (t.depth) line += ` [depth=${t.depth}]`
    if (t.lang) line += ` [lang=${t.lang}]`
    if (t.ordered !== undefined) line += ` [ordered=${t.ordered}]`
    if (t.text !== undefined && t.type !== 'code') line += ` = ${JSON.stringify(t.text.slice(0, 60))}`
    if (t.tokens && t.tokens.length) line += `\n${formatTokens(t.tokens, indent + 1)}`
    if (t.items && t.items.length) line += `\n${formatTokens(t.items, indent + 1)}`
    if (t.rows && t.rows.length) line += ` [rows=${t.rows.length}]`
    if (t.header && t.header.length) line += ` [header=${t.header.join('|')}]`
    return line
  }).join('\n')
}

function countTokens(tokens) {
  const map = {}
  function walk(list) {
    for (const t of list) {
      map[t.type] = (map[t.type] || 0) + 1
      if (t.tokens) walk(t.tokens)
      if (t.items) walk(t.items)
    }
  }
  walk(tokens)
  return Object.entries(map).sort((a, b) => b[1] - a[1])
}

function escapeHtml(str) {
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}
