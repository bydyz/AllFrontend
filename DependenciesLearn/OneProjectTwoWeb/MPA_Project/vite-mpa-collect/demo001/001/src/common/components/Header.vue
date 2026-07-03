<template>
  <header class="common-header">
    <h1>{{ title }}</h1>
    <nav>
      <slot name="nav" />
    </nav>
  </header>
</template>

<script setup lang="ts">
defineProps<{
  title: string
}>()
</script>

<style scoped>
.common-header {
  background: #42b883;
  color: #fff;
  padding: 16px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.common-header h1 {
  margin: 0;
  font-size: 20px;
}
.common-header nav {
  display: flex;
  gap: 12px;
}
.common-header nav a {
  color: #fff;
  text-decoration: none;
  font-weight: 500;
}
.common-header nav a:hover {
  text-decoration: underline;
}
</style>
