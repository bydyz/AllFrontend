<template>
  <div class="dashboard">
    <h2>仪表盘</h2>
    <p>这是第二套 Web 应用的仪表盘页面</p>
    <div class="stats-section">
      <h3>统计数据</h3>
      <p>访问次数: {{ statsStore.visitCount }}</p>
      <p>最后访问时间: {{ statsStore.lastVisitTime }}</p>
      <button @click="statsStore.incrementVisit">记录访问</button>
    </div>
  </div>
</template>

<script setup>
import { useStatsStore } from '../../../../stores/stats'

const statsStore = useStatsStore()
</script>

<style scoped>
.dashboard {
  padding: 1rem;
}

.stats-section {
  margin-top: 2rem;
  padding: 1rem;
  background-color: #f0f8ff;
  border-radius: 8px;
}

button {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #2980b9;
}
</style>
