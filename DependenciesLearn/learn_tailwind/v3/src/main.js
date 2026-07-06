// 引入 Vue 的 createApp 方法
import { createApp } from 'vue'
// 引入根组件
import App from './App.vue'
// 引入路由配置
import router from './router'
// 引入全局样式（包含 Tailwind CSS 指令）
import './style.css'

// 创建 Vue 应用实例并挂载到 #app 元素
createApp(App).use(router).mount('#app')
