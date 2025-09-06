import { createMemoryHistory, createRouter } from '../lib/vue-router.mjs'

import HomeView from '@/components/HomeView.vue'
import AboutView from '@/components/AboutView.vue'

const routes = [
  { path: '/', component: HomeView },
  { path: '/about', component: AboutView },
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

export default router