import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

//！ 若 scss文件 不恰当的放置于 public
// 使用以下方式引入样式，均可能报  `Files in the public directory are served at the root path. Instead of /public/css/common.scss, use /css/common.scss.` 提示。最好在 index.html 中 使用 link 引入
// 不能使用这种方式使用
// import '/css/common.scss'
// 可以使用以下方式
// import '/public/css/common.scss'
// import '../public/css/common.scss'

//！ 正确的应该放置于 src/assets 下
import './assets/css/common.scss'

import pinia from './stores'

//！ 上面的 app.vue 可以用下面的对象替代
// const App = {
//   template: `
//     <h2>当前计数: {{counter}}</h2>
//     <button @click="increment">+1</button>
//     <button @click="decrement">-1</button>
//   `,
//   data: function() {
//     return {
//       counter: 0
//     }
//   },
//   methods: {
//     increment: function() {
//       this.counter++
//     },
//     decrement: function() {
//       this.counter--
//     }
//   }
// }

createApp(App).use(router).use(pinia).mount('#app')
