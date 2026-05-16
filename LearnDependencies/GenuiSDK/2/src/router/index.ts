import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(''),
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('../views/Home.vue'),
            meta: { title: '首页' },
        },
        {
            path: '/table',
            name: 'table',
            component: () => import('../views/Table.vue'),
            meta: { title: '人员列表' },
        },

    ]
})

export default router