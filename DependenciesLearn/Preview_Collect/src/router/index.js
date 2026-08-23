import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/file-preview'
    },
    {
      path: '/file-preview',
      name: 'file-preview',
      component: () => import('@/views/FilePreview.vue')
    }
  ],
})

export default router
