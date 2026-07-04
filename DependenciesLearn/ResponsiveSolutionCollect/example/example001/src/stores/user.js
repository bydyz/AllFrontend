import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { users } from '../mock/data.js'

export const useUserStore = defineStore('user', () => {
  const token = ref(localStorage.getItem('token') || '')
  const userInfo = ref(JSON.parse(localStorage.getItem('userInfo') || '{}'))

  const isLoggedIn = computed(() => !!token.value)
  const username = computed(() => userInfo.value.username || '')

  function login(loginData) {
    const user = users.find(
      u => u.username === loginData.username && u.password === loginData.password
    )
    if (user) {
      token.value = `mock-token-${Date.now()}`
      userInfo.value = { id: user.id, username: user.username, role: user.role }
      localStorage.setItem('token', token.value)
      localStorage.setItem('userInfo', JSON.stringify(userInfo.value))
      return { success: true, message: '登录成功' }
    }
    return { success: false, message: '用户名或密码错误' }
  }

  function logout() {
    token.value = ''
    userInfo.value = {}
    localStorage.removeItem('token')
    localStorage.removeItem('userInfo')
  }

  return { token, userInfo, isLoggedIn, username, login, logout }
})
