<template>
  <div class="home">
    <h2>欢迎来到 Web1 首页</h2>
    <p>这是第一套 Web 应用的首页</p>
    <div class="counter-section">
      <h3>Pinia 状态管理示例</h3>
      <p>当前计数: {{ counterStore.count }}</p>
      <p>双倍计数: {{ counterStore.doubleCount }}</p>
      <button @click="counterStore.increment">增加</button>
      <button @click="counterStore.decrement">减少</button>
      <button @click="counterStore.reset">重置</button>
    </div>
  </div>
</template>

<script setup>
import { useCounterStore } from '../../../../stores/counter'

const counterStore = useCounterStore()
</script>

<style scoped>
.home {
  padding: 1rem;
}

.counter-section {
  margin-top: 2rem;
  padding: 1rem;
  background-color: #f5f5f5;
  border-radius: 8px;
}

button {
  margin-right: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #3aa876;
}
</style>
