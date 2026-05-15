import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

const modules = import.meta.glob('../views/*.vue', { eager: true })
type Module = { default: unknown }

const routes = Object.entries(modules).map(([path, mod]) => {
  const name = path.replace('../views/', '').replace('.vue', '')
  return { path: `/${name.toLowerCase()}`, name, component: (mod as Module).default }
}) as RouteRecordRaw[]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [{ path: '/', redirect: '/string' }, ...routes],
})

export default router
