import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAppStore = defineStore('app', () => {
  const count = ref(0)
  const message = ref('')

  const doubleCount = computed(() => count.value * 2)

  function increment() {
    count.value++
  }

  function setMessage(msg: string) {
    message.value = msg
  }

  function reset() {
    count.value = 0
    message.value = ''
  }

  return { count, message, doubleCount, increment, setMessage, reset }
})
