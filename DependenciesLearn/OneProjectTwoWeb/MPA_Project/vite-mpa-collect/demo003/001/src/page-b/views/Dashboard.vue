<template>
  <div class="page">
    <h2>仪表盘 - 页面 B</h2>
    <p>{{ greeting }}</p>

    <section class="stats">
      <h3>统计</h3>
      <p>Pinia count: {{ store.count }}</p>
      <p>双倍值: {{ store.doubleCount }}</p>
      <button @click="store.increment()">增加</button>
      <button @click="store.reset()">重置</button>
    </section>

    <section class="local">
      <h3>本地计数器 (composable)</h3>
      <p>{{ localCount.count.value }}</p>
      <button @click="localCount.increment()">+</button>
      <button @click="localCount.decrement()">-</button>
      <button @click="localCount.reset()">重置</button>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useAppStore } from '@/stores/app'
import { useCounter } from '@/common/composables/useCounter'
import { greet } from '@/common/utils/format'

const store = useAppStore()
const localCount = useCounter(50)
const greeting = greet('页面 B 用户')
</script>

<style scoped>
.page { line-height: 1.8; }
.stats, .local { margin-top: 20px; padding: 16px; border: 1px solid #ddd; border-radius: 8px; }
button { margin-right: 8px; padding: 4px 12px; cursor: pointer; }
</style>
