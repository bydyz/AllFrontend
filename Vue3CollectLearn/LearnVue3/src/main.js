import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import '../public/css/common.scss'
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
