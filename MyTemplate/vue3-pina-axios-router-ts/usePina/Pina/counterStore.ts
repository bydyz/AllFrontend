import { defineStore } from 'pinia'

import userStore from './userStore';

const useCounterStore = defineStore('counterStore', {
  state: () => ({
    counter: 100
  }),
  getters: {
    getCounter(state) {
      return state.counter
    },
    // 一个getter引入另外一个getter
    getDoubleCounter() {
      return this.getCounter * 2
    },
    // getters支持返回一个函数
    returnFunc() {
      return () => {}
    },
    // getters用到别的store
    useOtherStore() {
      // 这里const设置的变量名不要和上面导出的userStore一样
      const useUserStore = userStore()

      useUserStore.setNickName('哈哈')

      return useUserStore.age
    }
  },
  actions: {
    setCounter(newCounter: number) {
      this.counter = newCounter
    }
  }
})

export default useCounterStore
