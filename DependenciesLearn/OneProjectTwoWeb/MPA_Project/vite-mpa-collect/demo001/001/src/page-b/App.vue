<template>
  <Header title="页面 B">
    <template #nav>
      <RouterLink to="/">仪表盘</RouterLink>
      <RouterLink to="/settings">设置</RouterLink>
    </template>
  </Header>
  <main class="main">
    <RouterView />
  </main>
</template>

<script setup lang="ts">
import Header from '@/common/components/Header.vue'
</script>

<style scoped>
.main {
  padding: 24px;
  max-width: 800px;
  margin: 0 auto;
}
</style>
