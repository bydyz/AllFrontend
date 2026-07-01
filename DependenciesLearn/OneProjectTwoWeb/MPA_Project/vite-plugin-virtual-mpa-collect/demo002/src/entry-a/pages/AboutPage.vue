<script setup lang="ts">
import { useEntryAStore } from '../stores'
import { formatDate } from '../../common/utils/format'
import AppHeader from '../../common/components/AppHeader.vue'
import AppFooter from '../../common/components/AppFooter.vue'

const store = useEntryAStore()
const today = formatDate(new Date())
</script>

<template>
  <div class="page">
    <AppHeader title="入口A - 关于">
      <router-link to="/">返回首页</router-link>
    </AppHeader>

    <main class="content">
      <h2>关于入口A</h2>
      <p>Store message: "{{ store.message }}"</p>
      <p>当前日期: {{ today }}</p>

      <section>
        <h3>修改 Store 消息</h3>
        <input v-model="store.message" placeholder="输入新消息" />
      </section>
    </main>

    <AppFooter />
  </div>
</template>

<style scoped>
.page { min-height: 100vh; display: flex; flex-direction: column; }
.content { flex: 1; padding: 2rem; }
section { margin-top: 1.5rem; }
input { padding: 0.25rem 0.5rem; width: 200px; }
</style>
