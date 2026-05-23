export function renderHome(el, md) {
  el.innerHTML = `
    <div class="card">
      <h1>Markdown 解析工具演示</h1>
      <p>
        本演示项目展示了 JS 生态中主流的 Markdown 解析方式，包含以下 6 种工具：
      </p>
      <ul>
        <li><strong><a href="#/remark">remark</a></strong> — unified 生态，解析为 mdast AST，可遍历/查询/修改/重新输出</li>
        <li><strong><a href="#/gray-matter">gray-matter</a></strong> — 专门提取 YAML/TOML/JSON frontmatter</li>
        <li><strong><a href="#/mdast-util">mdast-util-from-markdown</a></strong> — 底层解析，直接输出 mdast，无需 unified 管道</li>
        <li><strong><a href="#/marked">marked</a></strong> — 老牌解析器，输出 tokens 或 HTML</li>
        <li><strong><a href="#/markdown-it">markdown-it</a></strong> — 插件化解析器，输出 token 流</li>
        <li><strong><a href="#/micromark">micromark</a></strong> — 底层流式解析器，最快的 MD 解析核心</li>
      </ul>
      <p>点击上方导航栏查看每种方式对下方示例文档的解析结果。</p>
    </div>
    <div class="card">
      <h2>示例文档预览</h2>
      <div class="section-title">原始 MD 内容</div>
      <pre><code>${escapeHtml(md)}</code></pre>
    </div>
  ` // 模板字面量结束，innerHTML 赋值完成
}
// ↑ renderHome 函数结束
// 参数说明：
//   el  — DOM 容器元素（#content），用于注入页面 HTML
//   md  — 从 sample.md?raw 导入的原始 Markdown 字符串

/**
 * 转义 HTML 特殊字符，防止 XSS 注入
 *
 * 在将用户输入或原始文本插入 innerHTML 时，
 * 必须将 & < > 等字符转义为 HTML 实体，
 * 否则浏览器会将其解析为 HTML 标签。
 *
 * 转换示例：
 *   "<script>" → "&lt;script&gt;"
 *   "A & B"    → "A &amp; B"
 *
 * @param {string} str - 需要转义的原始字符串
 * @returns {string} 转义后的安全 HTML 字符串
 */
function escapeHtml(str) {
  // 分三步替换：& 必须放在最前面，否则 < 中的 & 会被二次转义
  return str
    .replace(/&/g, '&amp;')  // 将 & 替换为 &amp;（必须先处理）
    .replace(/</g, '&lt;')   // 将 < 替换为 &lt;
    .replace(/>/g, '&gt;')   // 将 > 替换为 &gt;
}
