<template>
  <div class="page">
    <h2>.refine() - 自定义验证</h2>
    <pre>{{ code }}</pre>
    <button @click="run">验证</button>
    <div v-if="result" class="result">结果: {{ result }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import * as z from 'zod'

const code = `const schema = z.number().refine(
  (val) => val > 0,
  { message: "必须是正数" }
)`

const schema = z.number().refine((val) => val > 0, { message: '必须是正数' })
const result = ref('')

const run = () => {
  try {
    result.value = JSON.stringify(schema.parse(5))
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