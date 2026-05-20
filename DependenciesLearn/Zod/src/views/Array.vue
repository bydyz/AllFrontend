<template>
  <div class="page">
    <h2>z.array() - 数组类型</h2>
    <pre>{{ code }}</pre>
    <button @click="run">验证</button>
    <div v-if="result" class="result">结果: {{ result }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import * as z from 'zod'

const code = `const strings = z.array(z.string())
const numbers = z.array(z.number()).min(1).max(10)`

const schema = z.array(z.string()).min(1)
const result = ref('')

const run = () => {
  try {
    result.value = JSON.stringify(schema.parse(['a', 'b', 'c']))
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