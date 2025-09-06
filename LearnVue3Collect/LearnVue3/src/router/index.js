import {createRouter, createWebHistory} from 'vue-router'
import vue3Routes from './vue3Routes'
import JSRoutes from './JSRoutes'
import ExampleRoutes from './ExampleRoutes'

const router = createRouter({
    // history: createWebHistory(import.meta.env.VITE_APP_BASE_PATH),
    history: createWebHistory(),
    // routes: vue3Routes
    routes: [
        ...vue3Routes,
        ...JSRoutes,
        ...ExampleRoutes
    ],
})

export default router;
