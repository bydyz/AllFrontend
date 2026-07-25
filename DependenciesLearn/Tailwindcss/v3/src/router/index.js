// Vue Router 配置文件
import { createRouter, createWebHistory } from 'vue-router'

// 路由配置数组
const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../pages/Home.vue')
  },
  {
    path: '/spacing',
    name: 'Spacing',
    component: () => import('../pages/Spacing.vue')
  },
  {
    path: '/sizing',
    name: 'Sizing',
    component: () => import('../pages/Sizing.vue')
  },
  {
    path: '/typography',
    name: 'Typography',
    component: () => import('../pages/Typography.vue')
  },
  {
    path: '/colors',
    name: 'Colors',
    component: () => import('../pages/Colors.vue')
  },
  {
    path: '/backgrounds',
    name: 'Backgrounds',
    component: () => import('../pages/Backgrounds.vue')
  },
  {
    path: '/borders',
    name: 'Borders',
    component: () => import('../pages/Borders.vue')
  },
  {
    path: '/effects',
    name: 'Effects',
    component: () => import('../pages/Effects.vue')
  },
  {
    path: '/layout',
    name: 'Layout',
    component: () => import('../pages/Layout.vue')
  },
  {
    path: '/flexbox',
    name: 'Flexbox',
    component: () => import('../pages/Flexbox.vue')
  },
  {
    path: '/grid',
    name: 'Grid',
    component: () => import('../pages/Grid.vue')
  },
  {
    path: '/responsive',
    name: 'Responsive',
    component: () => import('../pages/Responsive.vue')
  },
  {
    path: '/dark-mode',
    name: 'DarkMode',
    component: () => import('../pages/DarkMode.vue')
  },
  {
    path: '/states',
    name: 'States',
    component: () => import('../pages/States.vue')
  },
  {
    path: '/transitions',
    name: 'Transitions',
    component: () => import('../pages/Transitions.vue')
  },
  {
    path: '/custom-config',
    name: 'CustomConfig',
    component: () => import('../pages/CustomConfig.vue')
  },
  {
    path: '/utilities',
    name: 'Utilities',
    component: () => import('../pages/Utilities.vue')
  },
  {
    path: '/arbitrary',
    name: 'Arbitrary',
    component: () => import('../pages/Arbitrary.vue')
  },
  {
    path: '/pseudo-elements',
    name: 'PseudoElements',
    component: () => import('../pages/PseudoElements.vue')
  },
  {
    path: '/advanced-utils',
    name: 'AdvancedUtils',
    component: () => import('../pages/AdvancedUtils.vue')
  },
  {
    path: '/architecture',
    name: 'Architecture',
    component: () => import('../pages/Architecture.vue')
  },
]

// 创建路由实例
const router = createRouter({
  // 使用 HTML5 History 模式
  history: createWebHistory(),
  routes,
})

export default router
