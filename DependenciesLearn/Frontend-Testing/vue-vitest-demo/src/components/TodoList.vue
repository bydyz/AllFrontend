<template>
  <div class="todo-list">
    <h2>待办事项</h2>
    
    <!-- 输入框 -->
    <div class="input-group">
      <input
        v-model="newTodo"
        @keyup.enter="addNewTodo"
        placeholder="输入新的待办事项..."
        class="todo-input"
      />
      <button @click="addNewTodo" class="add-btn" :disabled="!newTodo.trim()">
        添加
      </button>
    </div>
    
    <!-- 统计信息 -->
    <div class="stats">
      <span>总计: {{ totalCount }}</span>
      <span>待完成: {{ pendingTodos.length }}</span>
      <span>已完成: {{ completedTodos.length }}</span>
      <span>完成率: {{ completionRate.toFixed(1) }}%</span>
    </div>
    
    <!-- 清除已完成按钮 -->
    <button
      v-if="completedTodos.length > 0"
      @click="handleClearCompleted"
      class="clear-btn"
    >
      清除已完成 ({{ completedTodos.length }})
    </button>
    
    <!-- 待办事项列表 -->
    <ul class="todo-items">
      <li
        v-for="todo in todos"
        :key="todo.id"
        :class="{ completed: todo.completed }"
        class="todo-item"
      >
        <input
          type="checkbox"
          :checked="todo.completed"
          @change="toggleTodo(todo.id)"
          class="checkbox"
        />
        <span class="title">{{ todo.title }}</span>
        <button @click="removeTodo(todo.id)" class="delete-btn">
          删除
        </button>
      </li>
    </ul>
    
    <!-- 空状态 -->
    <p v-if="todos.length === 0" class="empty-message">
      暂无待办事项
    </p>
  </div>
</template>

<script setup>
/**
 * TodoList 组件
 * 演示组件测试：列表渲染、用户交互、事件处理
 */
import { ref } from 'vue'
import { useTodoList } from '../composables/useTodoList'

const emit = defineEmits(['add', 'remove', 'toggle', 'clearCompleted'])

// 新待办事项输入
const newTodo = ref('')

// 使用待办事项组合式函数
const {
  todos,
  pendingTodos,
  completedTodos,
  totalCount,
  completionRate,
  addTodo,
  removeTodo: originalRemoveTodo,
  toggleTodo: originalToggleTodo,
  clearCompleted: originalClearCompleted
} = useTodoList()

/**
 * 添加新的待办事项
 */
function addNewTodo() {
  const title = newTodo.value.trim()
  if (title) {
    const todo = addTodo(title)
    newTodo.value = ''
    emit('add', todo)
  }
}

/**
 * 删除待办事项
 * @param {number} id - 待办事项ID
 */
function removeTodo(id) {
  if (originalRemoveTodo(id)) {
    emit('remove', id)
  }
}

/**
 * 切换待办事项状态
 * @param {number} id - 待办事项ID
 */
function toggleTodo(id) {
  const todo = originalToggleTodo(id)
  if (todo) {
    emit('toggle', todo)
  }
}

/**
 * 清除已完成的待办事项
 */
function handleClearCompleted() {
  const count = originalClearCompleted()
  emit('clearCompleted', count)
}
</script>

<style scoped>
.todo-list {
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  max-width: 500px;
}

.input-group {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.todo-input {
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.add-btn {
  padding: 10px 20px;
  background: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.add-btn:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.stats {
  display: flex;
  gap: 20px;
  margin-bottom: 10px;
  font-size: 14px;
  color: #666;
}

.clear-btn {
  margin-bottom: 10px;
  padding: 8px 16px;
  background: #ff9800;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.todo-items {
  list-style: none;
  padding: 0;
}

.todo-item {
  display: flex;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #eee;
}

.todo-item.completed .title {
  text-decoration: line-through;
  color: #999;
}

.checkbox {
  margin-right: 10px;
}

.title {
  flex: 1;
}

.delete-btn {
  padding: 4px 8px;
  background: #f44336;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.empty-message {
  text-align: center;
  color: #999;
  font-style: italic;
}
</style>
