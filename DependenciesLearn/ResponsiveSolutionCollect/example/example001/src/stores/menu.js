import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useMenuStore = defineStore('menu', () => {
  const isCollapse = ref(false)

  function toggleCollapse() {
    isCollapse.value = !isCollapse.value
  }

  return { isCollapse, toggleCollapse }
})
