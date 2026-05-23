import matter from 'gray-matter'

export function renderGrayMatter(el, md) {
  const parsed = matter(md)

  el.innerHTML = `
    <div class="card">
      <h1>gray-matter 解析结果</h1>
      <p><span class="tag">gray-matter</span> 专门用于提取 Markdown 文件中的 YAML/TOML/JSON frontmatter。</p>
    </div>

    <div class="grid-2">
      <div class="card">
        <h2>Frontmatter 数据</h2>
        <pre><code>${escapeHtml(JSON.stringify(parsed.data, null, 2))}</code></pre>
      </div>
      <div class="card">
        <h2>Frontmatter 字段</h2>
        ${Object.entries(parsed.data).map(([k, v]) => {
          const val = Array.isArray(v) ? v.join(', ') : String(v)
          return `<div><strong>${k}</strong>: ${val}</div>`
        }).join('')}
        <hr>
        <div><strong>原始字符串长度</strong>: ${md.length} 字符</div>
        <div><strong>去除 frontmatter 后</strong>: ${parsed.content.length} 字符</div>
      </div>
    </div>

    <div class="card">
      <h2>去除 Frontmatter 后的正文（前 500 字符）</h2>
      <pre><code>${escapeHtml(parsed.content.slice(0, 500))}${parsed.content.length > 500 ? '...' : ''}</code></pre>
    </div>
  `
}

function escapeHtml(str) {
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}
