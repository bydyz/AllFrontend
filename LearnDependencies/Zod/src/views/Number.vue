<template>
  <div class="page">
    <h2>z.number() - 数字类型</h2>
    <pre>{{ code }}</pre>
    <button @click="run">验证</button>
    <div v-if="result" class="result">结果: {{ result }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import * as z from 'zod'

const code = `// 基础数字
const num = z.number()

// 带约束
const positive = z.number().positive()
const range = z.number().min(0).max(100)`

const schema = z.number().min(0).max(100)
const result = ref('')

const run = () => {
  try {
    const data = schema.parse(50)
    result.value = JSON.stringify(data)
  } catch (e: any) {
    result.value = e.message
  }
}
</script>

<style scoped>
.page { padding: 20px; }
pre { background: #f5f5f5; padding: 10px; margin: 10px 0; }
.result { margin-top: 10px; color: green; }
</style>