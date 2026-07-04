import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
    meta: { title: '登录' }
  },
  {
    path: '/',
    component: () => import('../layouts/MainLayout.vue'),
    redirect: '/overview',
    children: [
      {
        path: 'overview',
        name: 'Overview',
        component: () => import('../views/Overview.vue'),
        meta: { title: '总览', icon: 'DataBoard' }
      },
      {
        path: 'menu',
        name: 'Menu',
        component: () => import('../views/Menu.vue'),
        meta: { title: '菜单控制', icon: 'Menu' }
      },
      {
        path: 'role',
        name: 'Role',
        component: () => import('../views/Role.vue'),
        meta: { title: '角色管理', icon: 'UserFilled' }
      },
      {
        path: 'user',
        name: 'User',
        component: () => import('../views/User.vue'),
        meta: { title: '用户管理', icon: 'User' }
      },
      {
        path: 'my-test',
        name: 'MyTest',
        component: () => import('../views/MyTest.vue'),
        meta: { title: 'MyTest', icon: 'Document' }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  if (to.path !== '/login' && !token) {
    next('/login')
  } else {
    next()
  }
})

export default router
