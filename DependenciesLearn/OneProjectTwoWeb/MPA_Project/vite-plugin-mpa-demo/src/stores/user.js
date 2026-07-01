import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    userName: 'Web1 用户',
    isLoggedIn: false
  }),
  actions: {
    toggleLogin() {
      this.isLoggedIn = !this.isLoggedIn
    },
    setUserName(name) {
      this.userName = name
    }
  }
})
