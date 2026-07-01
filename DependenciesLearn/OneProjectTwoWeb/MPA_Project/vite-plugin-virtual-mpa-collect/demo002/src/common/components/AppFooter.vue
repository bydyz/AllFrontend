<script setup lang="ts">
import { formatDate } from '../utils/format'

const year = formatDate(new Date()).split('-')[0]
</script>

<template>
  <footer class="app-footer">
    <p>&copy; {{ year }} MPA Demo. All rights reserved.</p>
  </footer>
</template>

<style scoped>
.app-footer {
  background: #333;
  color: #aaa;
  text-align: center;
  padding: 1rem;
  font-size: 0.875rem;
}
</style>
