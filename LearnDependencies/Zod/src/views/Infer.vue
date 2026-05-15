<template>
  <div class="page">
    <h2>z.infer - 类型推断</h2>
    <pre>{{ code }}</pre>
    <button @click="run">验证</button>
    <div v-if="result" class="result">结果: {{ result }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import * as z from 'zod'

const code = `const User = z.object({ name: z.string(), age: z.number() })
type UserType = z.infer<typeof User>
// 等同于: { name: string; age: number }`

const User = z.object({ name: z.string(), age: z.number() })
type UserType = z.infer<typeof User>

const result = ref('')

const run = () => {
  const testUser: UserType = { name: '张三', age: 20 }
  result.value = JSON.stringify(testUser)
}
</script>

<style scoped>
.page { padding: 20px; }
pre { background: #f5f5f5; padding: 10px; margin: 10px 0; }
.result { margin-top: 10px; color: green; }
</style>