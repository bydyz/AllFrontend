export function renderHello(el) {
  const now = new Date()
  el.innerHTML = `
    <div class="card">
      <h1>Hello World!</h1>
      <p>当前时间：${now.toLocaleTimeString()}</p>
      <button class="btn" onclick="this.textContent = '再点击一次: ' + new Date().toLocaleTimeString()">点击我</button>
    </div>
  `
}