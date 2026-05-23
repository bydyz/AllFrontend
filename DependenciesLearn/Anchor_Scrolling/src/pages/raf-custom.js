export function renderRafCustom(el, data) {
  el.innerHTML = `
    <div class="card">
      <h1>requestAnimationFrame 自定义动画</h1>
      <p><span class="tag">JS</span> 使用 rAF 驱动滚动动画循环，完全自定义缓动函数，支持中途打断、目标微调等精细控制。</p>
      <p class="demo-info">💡 点击下方按钮，使用 rAF 驱动自定义弹性缓动动画</p>
    </div>
    <div class="card">
      <div class="anchor-nav" id="raf-nav">
        ${data.map(ch => `<button class="anchor-link" data-target="${ch.id}">${ch.title}</button>`).join('')}
      </div>
      ${data.map(ch => `
        <section id="raf-${ch.id}" class="anchor-section">
          <h3>${ch.title}</h3>
          ${ch.content.map(p => `<p>${p}</p>`).join('')}
        </section>
      `).join('')}
    </div>
  `

  let rafId = null

  // easeOutBack: 三次方贝塞尔缓出 + 回弹效果的数学模型
  // 曲线特点：先超越终点再回弹到位，产生"拉弓释放"的物理感
  // 输入 t ∈ [0, 1]（线性进度），输出 ∈ [0, ~1.7]（overshoot 后回弹到 1）
  function easeOutBack(t) {
    // c1: 回弹系数（overshoot amount），标准值 1.70158，越大回弹越夸张
    const c1 = 1.70158
    // c3 = c1 + 1，用于合并二次项系数
    const c3 = c1 + 1
    // 公式: 1 + c3*(t-1)^3 + c1*(t-1)^2
    // 当 t=0 → 0（起点）; 当 t=1 → 1（终点）; 当 t=0~1 时产生超调
    return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2)
  }

  function rafScrollTo(targetTop, duration = 800) {
    // 如果前一次动画尚未结束，立即取消以避免多个动画循环冲突
    if (rafId) {
      cancelAnimationFrame(rafId)
      rafId = null
    }

    // 当前页面垂直滚动位置（兼容不同浏览器的属性名）
    const start = window.pageYOffset || document.documentElement.scrollTop
    // 需要滚动的总距离 = 目标位置 - 当前位置（可能为负，表示向上滚动）
    const distance = targetTop - start
    // 动画开始时间戳，在 step 第一次执行时由 rAF 传入的 timestamp 赋值
    let startTime = null

    // step 是每一帧的回调函数，由 requestAnimationFrame 驱动
    function step(timestamp) {
      console.log('00000000000000000000000000000000000000000000000000000000', timestamp)
      // timestamp 是 rAF 传入的高精度时间戳（毫秒），首次进入时记录为动画起点
      if (!startTime) startTime = timestamp
      // 从动画开始到现在经过的毫秒数
      const elapsed = timestamp - startTime
      // 动画进度 0~1（Math.min 保证不会超过 1，防止 overshoot）
      const progress = Math.min(elapsed / duration, 1)
      // 将线性进度通过缓动函数映射为非线性值，产生弹性效果（easeOutBack）
      const eased = easeOutBack(progress)
      // 根据缓动后的进度计算当前帧应到达的滚动位置，并立即更新
      window.scrollTo(0, start + distance * eased)

      // 如果进度尚未到达终点，继续申请下一帧；否则动画结束，清理 rafId
      if (progress < 1) {
        rafId = requestAnimationFrame(step)
      } else {
        rafId = null
      }
    }

    // 启动动画：注册 step 为 rAF 回调，浏览器会在下一次重绘前调用它
    rafId = requestAnimationFrame(step)
  }

  const nav = document.getElementById('raf-nav')
  nav.addEventListener('click', (e) => {
    const btn = e.target.closest('.anchor-link')
    if (!btn) return
    const target = document.getElementById('raf-' + btn.dataset.target)
    if (target) {
      const rect = target.getBoundingClientRect()
      const top = rect.top + window.pageYOffset - 20
      rafScrollTo(top, 800)
    }
  })
}
