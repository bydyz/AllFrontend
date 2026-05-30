export function renderCounter(el) {
  let count = 0

  function update() {
    el.innerHTML = `
      <div class="card">
        <h2>计数器</h2>
        <div class="counter-display">${count}</div>
        <div class="counter-btns">
          <button class="btn" id="dec">-1</button>
          <button class="btn" id="reset">重置</button>
          <button class="btn" id="inc">+1</button>
        </div>
      </div>
    `
    el.querySelector('#dec').onclick = () => { count--; update() }
    el.querySelector('#reset').onclick = () => { count = 0; update() }
    el.querySelector('#inc').onclick = () => { count++; update() }
  }

  update()
}