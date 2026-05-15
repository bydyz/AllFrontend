<template>
  <div class="page">
    <h2>z.object() - 对象类型</h2>
    <pre>{{ code }}</pre>
    <button @click="run">验证</button>
    <div v-if="result" class="result">结果: {{ result }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import * as z from 'zod'

const code = `const User = z.object({
  name: z.string(),
  age: z.number(),
})

User.parse({ name: "张三", age: 20 })`

const User = z.object({
  name: z.string(),
  age: z.number(),
})
console.log('User: ', User)

const result = ref('')

const run = () => {
  try {
    result.value = JSON.stringify(User.parse({ name: '张三', age: 20 }))
    console.log('result.value: ', result.value)
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