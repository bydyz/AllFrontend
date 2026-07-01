<script setup lang="ts">
defineProps<{
  title: string
}>()
</script>

<template>
  <header class="app-header">
    <h1>{{ title }}</h1>
    <nav class="app-nav">
      <slot />
    </nav>
  </header>
</template>

<style scoped>
.app-header {
  background: #42b883;
  color: #fff;
  padding: 1rem 2rem;
  text-align: center;
}
.app-header h1 {
  margin: 0 0 0.5rem;
  font-size: 1.5rem;
}
.app-nav a {
  color: #fff;
  margin: 0 0.5rem;
  text-decoration: none;
}
.app-nav a:hover {
  text-decoration: underline;
}
</style>
