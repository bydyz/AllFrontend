<template>
  <Header title="页面 A">
    <template #nav>
      <RouterLink to="/">首页</RouterLink>
      <RouterLink to="/about">关于</RouterLink>
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
