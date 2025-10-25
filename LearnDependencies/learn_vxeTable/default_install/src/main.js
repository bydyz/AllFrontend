import { createApp } from 'vue'

import App from './App.vue'
import './main.css'

import VxeUIBase from 'vxe-pc-ui'
import 'vxe-pc-ui/es/style.css'

import VxeUITable from 'vxe-table'
import 'vxe-table/es/style.css'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

createApp(App).use(VxeUIBase).use(VxeUITable).use(ElementPlus).mount('#app')
