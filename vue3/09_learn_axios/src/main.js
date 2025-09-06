import { createApp } from 'vue'
import axios from 'axios'
import App from './App.vue'
import hyRequest from './service'
// import '@/01_常见请求演练'
// import '@/02_额外知识补充'
// import '@/03_创建axios实例'
import '@/04_Axios的拦截器'

createApp(App).mount('#app')

// hyRequest.request({
//   url: "/lyric?id=500665346"
// }).then(res => {
//   console.log("res:", res)
// })

// hyRequest.get({
//   url: "/lyric",
//   params: {
//     id: 500665346
//   }
// }).then(res => {
//   console.log("res:", res)
// })
