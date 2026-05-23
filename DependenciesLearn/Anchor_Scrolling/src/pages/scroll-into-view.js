export function renderScrollIntoView(el, data) {
  el.innerHTML = `
    <div class="card">
      <h1>Element.scrollIntoView()</h1>
      <p><span class="tag">DOM API</span> 原生 JS 方法，调用 <code>element.scrollIntoView({ behavior: 'smooth' })</code> 将元素滚动到可视区域。</p>
      <p class="demo-info">💡 点击下方按钮，JS 获取目标元素并调用 scrollIntoView</p>
    </div>
    <div class="card">
      <div class="anchor-nav" id="siv-nav">
        ${data.map(ch => `<button class="anchor-link" data-target="${ch.id}">${ch.title}</button>`).join('')}
      </div>
      ${data.map(ch => `
        <section id="siv-${ch.id}" class="anchor-section">
          <h3>${ch.title}</h3>
          ${ch.content.map(p => `<p>${p}</p>`).join('')}
        </section>
      `).join('')}
    </div>
  `

  const nav = document.getElementById('siv-nav')
  nav.addEventListener('click', (e) => {
    const btn = e.target.closest('.anchor-link')
    if (!btn) return
    const target = document.getElementById('siv-' + btn.dataset.target)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  })
}
