function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}

function smoothScrollTo(targetTop, duration = 600) {
  const start = window.pageYOffset || document.documentElement.scrollTop
  const distance = targetTop - start
  let startTime = null

  function step(timestamp) {
    if (!startTime) startTime = timestamp
    const elapsed = timestamp - startTime
    const progress = Math.min(elapsed / duration, 1)
    const eased = easeInOutCubic(progress)
    window.scrollTo(0, start + distance * eased)
    if (progress < 1) {
      requestAnimationFrame(step)
    }
  }

  requestAnimationFrame(step)
}

export function renderScrollTo(el, data) {
  el.innerHTML = `
    <div class="card">
      <h1>window.scrollTo() + 缓动函数</h1>
      <p><span class="tag">JS</span> 手动计算目标位置，使用缓动函数实现自定义动画曲线。本演示使用 easeInOutCubic。</p>
      <p class="demo-info">💡 点击下方按钮，手动计算 offsetTop 并调用 scrollTo 驱动滚动</p>
    </div>
    <div class="card">
      <div class="anchor-nav" id="st-nav">
        ${data.map(ch => `<button class="anchor-link" data-target="${ch.id}">${ch.title}</button>`).join('')}
      </div>
      ${data.map(ch => `
        <section id="st-${ch.id}" class="anchor-section">
          <h3>${ch.title}</h3>
          ${ch.content.map(p => `<p>${p}</p>`).join('')}
        </section>
      `).join('')}
    </div>
  `

  const nav = document.getElementById('st-nav')
  nav.addEventListener('click', (e) => {
    const btn = e.target.closest('.anchor-link')
    if (!btn) return
    const target = document.getElementById('st-' + btn.dataset.target)
    if (target) {
      const rect = target.getBoundingClientRect()
      // 微调 滚动位置，使得页面刚好显示出来
      const top = rect.top + window.pageYOffset - 60
      smoothScrollTo(top, 700)
    }
  })
}
