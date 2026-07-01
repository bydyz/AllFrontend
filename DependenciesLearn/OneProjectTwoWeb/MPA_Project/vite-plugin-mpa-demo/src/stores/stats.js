import { defineStore } from 'pinia'

export const useStatsStore = defineStore('stats', {
  state: () => ({
    visitCount: 0,
    lastVisitTime: ''
  }),
  actions: {
    incrementVisit() {
      this.visitCount++
      this.lastVisitTime = new Date().toLocaleString()
    }
  }
})
