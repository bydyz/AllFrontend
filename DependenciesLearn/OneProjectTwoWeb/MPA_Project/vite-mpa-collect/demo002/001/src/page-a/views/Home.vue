<template>
  <div class="page">
    <h2>首页 - 页面 A</h2>
    <p>{{ greeting }}</p>

    <section class="counter">
      <h3>Pinia 计数器</h3>
      <p>count: {{ store.count }}</p>
      <p>doubleCount: {{ store.doubleCount }}</p>
      <button @click="store.increment()">+1</button>
      <button @click="localCount.decrement()">本地 -1</button>
      <p>本地 count: {{ localCount.count.value }}</p>
    </section>

    <section class="message">
      <h3>消息</h3>
      <input v-model="inputMsg" placeholder="输入消息" />
      <button @click="store.setMessage(inputMsg)">保存</button>
      <p>store 消息: {{ store.message }}</p>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAppStore } from '@/stores/app'
import { useCounter } from '@/common/composables/useCounter'
import { greet, formatDate } from '@/common/utils/format'

const store = useAppStore()
const localCount = useCounter(100)
const inputMsg = ref('')

const greeting = greet('MPA 用户') + ' 今天是 ' + formatDate(new Date())
</script>

<style scoped>
.page { line-height: 1.8; }
.counter, .message { margin-top: 20px; padding: 16px; border: 1px solid #ddd; border-radius: 8px; }
button { margin-right: 8px; padding: 4px 12px; cursor: pointer; }
input { margin-right: 8px; padding: 4px 8px; }
</style>
