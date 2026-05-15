<template>
  <div class="page">
    <h2>z.string() - 字符串类型</h2>
    <pre>{{ code }}</pre>
    <button @click="run">验证</button>
    <div v-if="result" class="result">结果: {{ result }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import * as z from 'zod'

const code = `const schema = z.string()
schema.parse("hello")  // 成功
schema.parse(123)      // 失败`

const schema = z.string()
console.log('schema: ', schema)
const result = ref('')

const run = () => {
  try {
    const data = schema.parse(123)
    console.log(data)
    result.value = JSON.stringify(data)
  } catch (e: any) {
    console.log('e: ', e)
    result.value = e.message
  }
}
</script>

<style scoped>
.page { padding: 20px; }
pre { background: #f5f5f5; padding: 10px; margin: 10px 0; }
.result { margin-top: 10px; color: green; }
</style>