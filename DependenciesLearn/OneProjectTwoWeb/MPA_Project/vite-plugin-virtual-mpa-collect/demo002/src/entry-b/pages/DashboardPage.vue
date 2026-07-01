<script setup lang="ts">
import { useEntryBStore } from '../stores'
import { formatNumber } from '../../common/utils/format'
import AppHeader from '../../common/components/AppHeader.vue'
import AppFooter from '../../common/components/AppFooter.vue'

const store = useEntryBStore()
</script>

<template>
  <div class="page">
    <AppHeader title="入口B - 仪表盘">
      <router-link to="/profile">个人中心</router-link>
    </AppHeader>

    <main class="content">
      <h2>待办事项 (共 {{ formatNumber(store.todoCount) }} 项)</h2>

      <ul>
        <li v-for="(todo, index) in store.todos" :key="index">
          {{ todo }}
          <button @click="store.removeTodo(index)">✔ 完成</button>
        </li>
      </ul>

      <section>
        <h3>添加新事项</h3>
        <input
          v-model="store.newTodo"
          @keyup.enter="store.addTodo"
          placeholder="输入待办事项"
        />
        <button @click="store.addTodo">添加</button>
      </section>
    </main>

    <AppFooter />
  </div>
</template>

<style scoped>
.page { min-height: 100vh; display: flex; flex-direction: column; }
.content { flex: 1; padding: 2rem; }
li { margin: 0.5rem 0; }
section { margin-top: 1.5rem; }
input { padding: 0.25rem 0.5rem; width: 200px; }
button { margin-left: 0.5rem; padding: 0.25rem 0.75rem; }
</style>
