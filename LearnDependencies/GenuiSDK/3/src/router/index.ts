import { createRouter, createWebHistory } from 'vue-router'
import GenuiRendererLearn1 from '../views/GenuiRendererLearn1.vue'
import GenuiRendererLearn2 from '../views/GenuiRendererLearn2.vue'
import GenuiRendererLearnFetch1 from '../views/GenuiRendererLearnFetch1.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/staticGenuiRenderer1'
    },
    {
      path: '/staticGenuiRenderer1',
      name: 'StaticGenuiRenderer1',
      component: GenuiRendererLearn1
    },
    {
      path: '/staticGenuiRenderer2',
      name: 'StaticGenuiRenderer2',
      component: GenuiRendererLearn2
    },
    {
      path: '/genui2',
      name: 'genui2',
      component: GenuiRendererLearnFetch1
    }
  ],
})

export default router
