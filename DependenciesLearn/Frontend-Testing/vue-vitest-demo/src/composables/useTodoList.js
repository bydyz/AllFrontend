/**
 * useTodoList 组合式函数
 * 提供待办事项列表功能，用于演示复杂组合式函数的测试
 */
import { ref, computed } from 'vue'

/**
 * 待办事项列表组合式函数
 * @returns {Object} 待办事项状态和方法
 */
export function useTodoList() {
  // 待办事项列表
  const todos = ref([])
  
  // 生成唯一ID
  let nextId = 1
  
  // 计算属性：未完成的待办事项
  const pendingTodos = computed(() => 
    todos.value.filter(todo => !todo.completed)
  )
  
  // 计算属性：已完成的待办事项
  const completedTodos = computed(() => 
    todos.value.filter(todo => todo.completed)
  )
  
  // 计算属性：待办事项总数
  const totalCount = computed(() => todos.value.length)
  
  // 计算属性：完成率
  const completionRate = computed(() => {
    if (totalCount.value === 0) return 0
    return (completedTodos.value.length / totalCount.value) * 100
  })
  
  /**
   * 添加待办事项
   * @param {string} title - 待办事项标题
   * @returns {Object} 新创建的待办事项
   */
  function addTodo(title) {
    const todo = {
      id: nextId++,
      title,
      completed: false,
      createdAt: new Date()
    }
    todos.value.push(todo)
    return todo
  }
  
  /**
   * 删除待办事项
   * @param {number} id - 待办事项ID
   * @returns {boolean} 是否删除成功
   */
  function removeTodo(id) {
    const index = todos.value.findIndex(todo => todo.id === id)
    if (index !== -1) {
      todos.value.splice(index, 1)
      return true
    }
    return false
  }
  
  /**
   * 切换待办事项完成状态
   * @param {number} id - 待办事项ID
   * @returns {Object|null} 更新后的待办事项，不存在则返回null
   */
  function toggleTodo(id) {
    const todo = todos.value.find(todo => todo.id === id)
    if (todo) {
      todo.completed = !todo.completed
      return todo
    }
    return null
  }
  
  /**
   * 清除所有已完成的待办事项
   * @returns {number} 清除的数量
   */
  function clearCompleted() {
    const count = completedTodos.value.length
    todos.value = pendingTodos.value
    return count
  }
  
  /**
   * 根据ID获取待办事项
   * @param {number} id - 待办事项ID
   * @returns {Object|null} 待办事项，不存在则返回null
   */
  function getTodoById(id) {
    return todos.value.find(todo => todo.id === id) || null
  }
  
  return {
    todos,
    pendingTodos,
    completedTodos,
    totalCount,
    completionRate,
    addTodo,
    removeTodo,
    toggleTodo,
    clearCompleted,
    getTodoById
  }
}
