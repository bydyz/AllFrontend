export function renderHome(el) {
  el.innerHTML = `
    <div class="card">
      <h1>Vite 基础示例</h1>
      <p>这是一个使用纯原生 JavaScript 的 Vite 项目，展示了简单的路由和页面结构。</p>
      <ul>
        <li><a href="#/hello">Hello</a> - 问候页面</li>
        <li><a href="#/counter">计数器</a> - 简单的计数器功能</li>
      </ul>
    </div>
  `
}