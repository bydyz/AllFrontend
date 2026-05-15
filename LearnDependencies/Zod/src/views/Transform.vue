<template>
  <div class="page">
    <h2>.transform() - 数据转换</h2>
    <pre>{{ code }}</pre>
    <button @click="run">验证</button>
    <div v-if="result" class="result">结果: {{ result }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import * as z from 'zod'

const code = `const schema = z.string().transform((val) => val.toUpperCase())
schema.parse("hello") // "HELLO"`

const schema = z.string().transform((val) => val.toUpperCase())
const result = ref('')

const run = () => {
  try {
    result.value = JSON.stringify(schema.parse('hello'))
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