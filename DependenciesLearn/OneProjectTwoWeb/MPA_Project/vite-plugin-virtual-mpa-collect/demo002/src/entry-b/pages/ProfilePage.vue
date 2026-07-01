<script setup lang="ts">
import { useEntryBStore } from '../stores'
import { useCounter } from '../../common/composables/useCounter'
import { formatDate } from '../../common/utils/format'
import AppHeader from '../../common/components/AppHeader.vue'
import AppFooter from '../../common/components/AppFooter.vue'

const store = useEntryBStore()
const { count, increment, decrement } = useCounter(0)
const today = formatDate(new Date())
</script>

<template>
  <div class="page">
    <AppHeader title="入口B - 个人中心">
      <router-link to="/">返回仪表盘</router-link>
    </AppHeader>

    <main class="content">
      <h2>个人中心</h2>
      <p>当前日期: {{ today }}</p>
      <p>待办事项数量: {{ store.todoCount }}</p>

      <section>
        <h3>自定义计数器 (useCounter)</h3>
        <p>值: {{ count }}</p>
        <button @click="increment">+</button>
        <button @click="decrement">-</button>
      </section>
    </main>

    <AppFooter />
  </div>
</template>

<style scoped>
.page { min-height: 100vh; display: flex; flex-direction: column; }
.content { flex: 1; padding: 2rem; }
section { margin-top: 1.5rem; }
button { margin-right: 0.5rem; padding: 0.25rem 0.75rem; }
</style>
