import { defineStore } from 'pinia'

export const useProfileStore = defineStore('profile', {
  state: () => ({
    name: 'Web2 用户',
    email: 'web2@example.com',
    registerDate: '2024-01-01'
  }),
  actions: {
    updateProfile() {
      this.name = '更新后的用户'
      this.email = 'updated@example.com'
    }
  }
})
