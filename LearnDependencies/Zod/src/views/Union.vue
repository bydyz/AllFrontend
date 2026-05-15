<template>
  <div class="page">
    <h2>z.union() - 联合类型</h2>
    <pre>{{ code }}</pre>
    <button @click="run">验证</button>
    <div v-if="result" class="result">结果: {{ result }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import * as z from 'zod'

const code = `const schema = z.union([z.string(), z.number()])
schema.parse("hello") // OK
schema.parse(123)      // OK`

const schema = z.union([z.string(), z.number()])
const result = ref('')

const run = () => {
  try {
    result.value = JSON.stringify(schema.parse(123))
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