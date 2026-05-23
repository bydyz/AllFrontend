export function renderHome(el, data) {
  el.innerHTML = `
    <div class="card">
      <h1>锚点滚动方案演示</h1>
      <p>本演示展示前端中 5 种主流的锚点滚动实现方式：</p>
      <ul>
        <li><strong><a href="#/scroll-behavior">CSS scroll-behavior</a></strong> — 一行 CSS，零依赖</li>
        <li><strong><a href="#/scroll-into-view">scrollIntoView</a></strong> — 原生 DOM API，简单直接</li>
        <li><strong><a href="#/scroll-to">scrollTo + Easing</a></strong> — 手动缓动，灵活可控</li>
        <li><strong><a href="#/raf-custom">requestAnimationFrame</a></strong> — 自定义动画循环</li>
        <li><strong><a href="#/lenis">Lenis</a></strong> — 专业平滑滚动库</li>
      </ul>
      <p>点击上方导航栏或下方链接查看每种方案的实现与演示效果。</p>
    </div>
    <div class="card">
      <h2>方案对比总览</h2>
      <table>
        <thead>
          <tr>
            <th>方案</th>
            <th>代码量</th>
            <th>控制力</th>
            <th>依赖</th>
            <th>适用场景</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>CSS scroll-behavior</td><td>1 行</td><td>低</td><td>无</td><td>简单页面锚点</td></tr>
          <tr><td>scrollIntoView</td><td>~5 行</td><td>中</td><td>无</td><td>动态目标滚动</td></tr>
          <tr><td>scrollTo + Easing</td><td>~20 行</td><td>高</td><td>无</td><td>自定义动画曲线</td></tr>
          <tr><td>rAF 自定义</td><td>~30 行</td><td>最高</td><td>无</td><td>特殊交互/游戏</td></tr>
          <tr><td>Lenis 库</td><td>~3 行</td><td>极高</td><td>lenis</td><td>产品级滚动体验</td></tr>
        </tbody>
      </table>
    </div>
  `
}
