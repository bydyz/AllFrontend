import { defineStore } from 'pinia'

export const useEntryAStore = defineStore('entry-a', {
  state: () => ({
    message: '来自入口A 的 Store',
    counter: 0,
  }),
  actions: {
    increment() {
      this.counter++
    },
    setMessage(msg: string) {
      this.message = msg
    },
  },
})
