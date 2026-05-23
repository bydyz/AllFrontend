import Lenis from 'lenis'

let lenis = null

export function renderLenis(el, data) {
  el.innerHTML = `
    <div class="card">
      <h1>Lenis 平滑滚动库</h1>
      <p><span class="tag">Library</span> Lenis 是一个轻量级平滑滚动库，提供物理感更强的滚动体验。使用 <code>lenis.scrollTo(target)</code> 实现锚点滚动。</p>
      <p class="demo-info">💡 点击下方按钮，通过 Lenis 驱动平滑滚动（注意页面整体滚动也变为平滑）</p>
    </div>
    <div class="card">
      <div class="anchor-nav" id="lenis-nav">
        ${data.map(ch => `<button class="anchor-link" data-target="${ch.id}">${ch.title}</button>`).join('')}
      </div>
      ${data.map(ch => `
        <section id="lenis-${ch.id}" class="anchor-section">
          <h3>${ch.title}</h3>
          ${ch.content.map(p => `<p>${p}</p>`).join('')}
        </section>
      `).join('')}
    </div>
  `

  // 全局唯一 Lenis 实例：避免重复创建导致滚动事件绑定冲突
  if (!lenis) {
    // Lenis 接管页面滚动行为，用 JS 模拟替代原生滚动
    lenis = new Lenis({
      duration: 1.2,     // 滚动动画持续时长（秒），越大滚动越慢越丝滑
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),  // easeOutExpo：开始时极快，接近终点时极慢，产生"滑停"感
      orientation: 'vertical', // 滚动方向：vertical（垂直）/ horizontal（水平）
      smoothWheel: true,  // 是否将鼠标滚轮的 step 式滚动也平滑化
    })

    // Lenis 需要手动驱动动画循环：每帧调用 lenis.raf(time) 来更新内部状态
    function raf(time) {
      lenis.raf(time)           // 通知 Lenis 当前帧时间戳，让它计算并设置最新滚动位置
      requestAnimationFrame(raf) // 注册下一帧，形成持续动画循环
    }
    requestAnimationFrame(raf)   // 启动动画循环
  }

  // 事件委托：监听导航容器上的点击事件
  const nav = document.getElementById('lenis-nav')
  nav.addEventListener('click', (e) => {
    // .closest 向上查找被点击的按钮元素，如果点到了间隙或子元素则忽略
    const btn = e.target.closest('.anchor-link')
    if (!btn) return
    // 从 data-target 属性读取章节 id，构造对应 section 元素的 id
    const target = document.getElementById('lenis-' + btn.dataset.target)
    if (target && lenis) {
      // lenis.scrollTo 替代原生 scrollIntoView，由 Lenis 接管滚动动画
      lenis.scrollTo(target, {
        offset: -20,    // 目标上方留 20px 间距，避免内容紧贴视口顶部
        duration: 1.2,  // 锚点滚动动画时长（秒），与实例的 duration 保持一致
      })
    }
  })
}
