<script setup>
// ========================================
// 标准 Vue 3 SFC 组件示例
// ========================================
import { ref } from 'vue'

defineProps({
  msg: {
    type: String,
    required: true
  }
})

const items = ref(['Vue', 'Vite', 'JSX'])
</script>

<template>
  <div class="hello">
    <h2>{{ msg }}</h2>
    <ul>
      <li v-for="(item, index) in items" :key="index">
        {{ item }}
      </li>
    </ul>
  </div>
</template>

<style scoped>
.hello {
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  margin: 10px 0;
}
</style>
