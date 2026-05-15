<template>
  <div class="page">
    <h2>z.intersection() - 交叉类型</h2>
    <pre>{{ code }}</pre>
    <button @click="run">验证</button>
    <div v-if="result" class="result">结果: {{ result }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import * as z from 'zod'

const code = `const A = z.object({ name: z.string() })
const B = z.object({ age: z.number() })
const AB = z.intersection(A, B)
// { name: string; age: number }`

const A = z.object({ name: z.string() })
const B = z.object({ age: z.number() })
const schema = z.intersection(A, B)
const result = ref('')

const run = () => {
  try {
    result.value = JSON.stringify(schema.parse({ name: '张三', age: 20 }))
  } catch (e: any) {
    result.value = e.message
  }
}
</script>

<style scoped>
.page { padding: 20px; }
pre { background: #f5f5f5; padding: 10px; margin: 10px 0; }
result { margin-top: 10px; color: green; }
</style>