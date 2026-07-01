import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/home/index.vue'
import About from '../views/about/index.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About
  }
]

const router = createRouter({
  history: createWebHistory('/web1/'),
  routes
})

export default router
