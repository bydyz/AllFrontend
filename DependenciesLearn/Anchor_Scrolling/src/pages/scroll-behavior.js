export function renderScrollBehavior(el, data) {
  el.innerHTML = `
    <div class="card">
      <h1>CSS scroll-behavior</h1>
      <p><span class="tag">CSS</span> 最简方案，一行 CSS 启用平滑滚动。使用 <code>html { scroll-behavior: smooth; }</code> + <code>&lt;a href="#id"&gt;</code> 即可。</p>
      <p class="demo-info">💡 点击下方按钮滚动到对应章节</p>
    </div>
    <div class="card">
      <div class="anchor-nav">
        ${data.map(ch => `<a href="#sb-${ch.id}" class="anchor-link">${ch.title}</a>`).join('')}
      </div>
      ${data.map(ch => `
        <section id="sb-${ch.id}" class="anchor-section">
          <h3>${ch.title}</h3>
          ${ch.content.map(p => `<p>${p}</p>`).join('')}
        </section>
      `).join('')}
    </div>
  `
}
