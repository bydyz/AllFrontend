const routes = {
  '/': () => import('./pages/home.js').then(m => m.renderHome),
  '/hello': () => import('./pages/hello.js').then(m => m.renderHello),
  '/counter': () => import('./pages/counter.js').then(m => m.renderCounter),
}

async function router() {
  const path = window.location.hash.slice(1) || '/'
  const content = document.getElementById('content')
  const loadPage = routes[path]

  if (loadPage) {
    const render = await loadPage()
    render(content)
  } else {
    content.innerHTML = '<div class="card"><h1>404</h1><p>页面未找到</p></div>'
  }
}

window.addEventListener('hashchange', router)
router()