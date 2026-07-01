<script setup lang="ts">
import { useEntryAStore } from '../stores'
import { useCounter } from '../../common/composables/useCounter'
import AppHeader from '../../common/components/AppHeader.vue'
import AppFooter from '../../common/components/AppFooter.vue'

const store = useEntryAStore()
const { count, increment, decrement, reset } = useCounter(100)
</script>

<template>
  <div class="page">
    <AppHeader title="入口A - 首页">
      <router-link to="/about">关于</router-link>
    </AppHeader>

    <main class="content">
      <h2>欢迎来到入口A</h2>
      <p>{{ store.message }}</p>

      <section>
        <h3>Pinia 计数器</h3>
        <p>值: {{ store.counter }}</p>
        <button @click="store.increment()">+1</button>
      </section>

      <section>
        <h3>组合函数计数器 (useCounter)</h3>
        <p>值: {{ count }}</p>
        <button @click="increment">+</button>
        <button @click="decrement">-</button>
        <button @click="reset">重置</button>
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
