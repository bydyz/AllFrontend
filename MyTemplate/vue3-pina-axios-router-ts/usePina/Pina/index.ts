import { createPinia } from 'pinia'

import type { App } from 'vue'

import useLoginStore from './login/login'

const pinia = createPinia()

function registerStore(app: App<Element>) {
  // 1.use的pinia
  app.use(pinia)


  // 2.加载本地的数据
  const loginStore = useLoginStore()
  loginStore.loadLocalCacheAction()
}

// 此处传给 main.ts 的是一个函数，在main.ts中使用app.use(registerStore)后即会执行该函数且会传入参数app
export default registerStore



// App<Element> 是 TypeScript 中的一种类型声明，用于指定一个变量或参数的类型。

// 在 Vue.js 中，App 类型通常用于表示一个 Vue 应用程序实例。App 类型是一个泛型类型，接受一个参数，该参数表示 Vue 应用程序实例的根元素的类型。通常情况下，根元素的类型可以是 HTMLElement 或 Element。

// 因此，App<Element> 表示一个 Vue 应用程序实例，其根元素的类型是 Element 或 HTMLElement。这种类型声明的作用是确保传递给函数 registerStore 的参数 app 必须是一个 Vue 应用程序实例，且其根元素的类型为 Element 或 HTMLElement，以便在函数内部正确使用该参数。
