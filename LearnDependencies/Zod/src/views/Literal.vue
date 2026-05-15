<template>
  <div class="page">
    <h2>z.literal() - 字面量类型</h2>
    <pre>{{ code }}</pre>
    <button @click="run">验证</button>
    <div v-if="result" class="result">结果: {{ result }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import * as z from 'zod'

const code = `const literal = z.literal('success')
literal.parse('success')  // OK
literal.parse('fail')      // 失败`

const literal = z.literal('success')
const result = ref('')

const run = () => {
  try {
    result.value = JSON.stringify(literal.parse('success'))
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