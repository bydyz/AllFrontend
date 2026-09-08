import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAppStore = defineStore('app', () => {
  const isCollapse = ref(false)

  function toggleCollapse() {
    isCollapse.value = !isCollapse.value
  }

  return { isCollapse, toggleCollapse }
})

export const useTabStore = defineStore('tab', () => {
  const tabs = ref([
    { path: '/dashboard', title: '总览', icon: 'DataBoard', closable: false }
  ])

  function addTab(tab) {
    if (!tabs.value.some(t => t.path === tab.path)) {
      tabs.value.push({ ...tab, closable: tab.path !== '/dashboard' })
    }
  }

  function removeTab(path) {
    const index = tabs.value.findIndex(t => t.path === path)
    if (index !== -1 && tabs.value[index].closable) {
      tabs.value.splice(index, 1)
      return tabs.value[index] || tabs.value[index - 1]
    }
    return null
  }

  function removeOtherTabs(path) {
    tabs.value = tabs.value.filter(t => !t.closable || t.path === path)
  }

  function removeRightTabs(path) {
    const index = tabs.value.findIndex(t => t.path === path)
    if (index !== -1) {
      tabs.value = tabs.value.filter((t, i) => i <= index || !t.closable)
    }
  }

  function removeAllTabs() {
    tabs.value = tabs.value.filter(t => !t.closable)
  }

  return { tabs, addTab, removeTab, removeOtherTabs, removeRightTabs, removeAllTabs }
})