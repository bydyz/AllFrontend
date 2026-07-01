import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useEntryBStore = defineStore('entry-b', () => {
  const todos = ref<string[]>(['学习 Vue3', '学习 Pinia', '学习 MPA'])
  const newTodo = ref('')

  const todoCount = computed(() => todos.value.length)

  function addTodo() {
    const text = newTodo.value.trim()
    if (text) {
      todos.value.push(text)
      newTodo.value = ''
    }
  }

  function removeTodo(index: number) {
    todos.value.splice(index, 1)
  }

  return { todos, newTodo, todoCount, addTodo, removeTodo }
})
