<template>
  <div class="page">
    <h2>z.date() - 日期类型</h2>
    <pre>{{ code }}</pre>
    <button @click="run">验证</button>
    <div v-if="result" class="result">结果: {{ result }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import * as z from 'zod'

const code = `const dateSchema = z.date()
dateSchema.parse(new Date()) // OK
dateSchema.parse("2024-01-01") // 失败`

const schema = z.date()
const result = ref('')

const run = () => {
  try {
    result.value = JSON.stringify(schema.parse(new Date('2024-01-01')))
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