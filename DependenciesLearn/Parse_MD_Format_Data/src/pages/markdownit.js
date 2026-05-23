import MarkdownIt from 'markdown-it'

export function renderMarkdownIt(el, md) {
  const mdIt = new MarkdownIt()
  const tokens = mdIt.parse(md, {})
  const html = mdIt.render(md)

  el.innerHTML = `
    <div class="card">
      <h1>markdown-it 解析结果</h1>
      <p><span class="tag">markdown-it</span> 插件化解析器，输出 token 流，支持丰富的插件生态。</p>
    </div>

    <div class="card">
      <h2>Token 流（前 80 个 token）</h2>
      <pre><code>${escapeHtml(formatTokens(tokens.slice(0, 80)))}</code></pre>
    </div>

    <div class="card">
      <h2>Token 统计</h2>
      <table>
        <thead><tr><th>类型</th><th>数量</th><th>嵌套层级</th></tr></thead>
        <tbody>
          ${analyzeTokens(tokens).map(t => `<tr><td>${t.type}</td><td>${t.count}</td><td>${t.level}</td></tr>`).join('')}
        </tbody>
      </table>
    </div>

    <div class="card">
      <h2>渲染为 HTML</h2>
      <pre><code>${escapeHtml(html.slice(0, 800))}${html.length > 800 ? '...' : ''}</code></pre>
    </div>
  `
}

function formatTokens(tokens) {
  return tokens.map(t => {
    let line = `▸ ${t.type}`
    if (t.tag) line += ` <${t.tag}>`
    if (t.level !== undefined) line += ` level=${t.level}`
    if (t.markup) line += ` markup=${JSON.stringify(t.markup)}`
    if (t.info) line += ` info=${JSON.stringify(t.info)}`
    if (t.content) {
      const c = t.content.length > 50 ? t.content.slice(0, 50) + '...' : t.content
      line += ` content=${JSON.stringify(c)}`
    }
    if (t.nesting === 1) line += ' [open]'
    if (t.nesting === -1) line += ' [close]'
    if (t.block !== undefined) line += ` block=${t.block}`
    return line
  }).join('\n')
}

function analyzeTokens(tokens) {
  const map = {}
  for (const t of tokens) {
    if (!map[t.type]) map[t.type] = { type: t.type, count: 0, level: 0 }
    map[t.type].count++
    map[t.type].level = Math.max(map[t.type].level, t.level)
  }
  return Object.values(map).sort((a, b) => b.count - a.count)
}

function escapeHtml(str) {
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}
