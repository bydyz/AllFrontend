import { micromark } from 'micromark'

export function renderMicromark(el, md) {
  const html = micromark(md)

  el.innerHTML = `
    <div class="card">
      <h1>micromark 解析结果</h1>
      <p><span class="tag">micromark</span> 底层流式 Markdown 解析器，是 remark 等工具的解析核心，性能极快。</p>
    </div>

    <div class="card">
      <h2>编译为 HTML</h2>
      <p>micromark 不输出 token/AST，而是直接编译为 HTML：</p>
      <pre><code>${escapeHtml(html.slice(0, 1000))}${html.length > 1000 ? '...' : ''}</code></pre>
    </div>

    <div class="grid-2">
      <div class="card">
        <h2>输入 / 输出 对比</h2>
        <table>
          <thead><tr><th>指标</th><th>值</th></tr></thead>
          <tbody>
            <tr><td>原始 MD 长度</td><td>${md.length} 字符</td></tr>
            <tr><td>输出 HTML 长度</td><td>${html.length} 字符</td></tr>
            <tr><td>扩展率</td><td>${(html.length / md.length).toFixed(2)}x</td></tr>
          </tbody>
        </table>
      </div>
      <div class="card">
        <h2>适用场景</h2>
        <ul>
          <li>需要极致性能的场景</li>
          <li>自定义 Markdown 方言</li>
          <li>作为底层解析引擎</li>
          <li>构建自己的解析器</li>
        </ul>
        <p style="margin-top:12px">micromark 是 <strong>remark</strong> 和 <strong>mdast-util-from-markdown</strong> 的底层解析核心。</p>
      </div>
    </div>
  `
}

function escapeHtml(str) {
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}
