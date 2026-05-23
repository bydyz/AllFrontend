import './style.css'
import { chapters } from './sample-data.js'
import { renderHome } from './pages/home.js'
import { renderScrollBehavior } from './pages/scroll-behavior.js'
import { renderScrollIntoView } from './pages/scroll-into-view.js'
import { renderScrollTo } from './pages/scroll-to.js'
import { renderRafCustom } from './pages/raf-custom.js'
import { renderLenis } from './pages/lenis.js'

const routes = {
  '/': renderHome,
  '/scroll-behavior': renderScrollBehavior,
  '/scroll-into-view': renderScrollIntoView,
  '/scroll-to': renderScrollTo,
  '/raf-custom': renderRafCustom,
  '/lenis': renderLenis,
}

function router() {
  const path = window.location.hash.slice(1) || '/'
  const content = document.getElementById('content')
  const render = routes[path]
  if (render) {
    render(content, chapters)
  }
}

window.addEventListener('hashchange', router)

router()
