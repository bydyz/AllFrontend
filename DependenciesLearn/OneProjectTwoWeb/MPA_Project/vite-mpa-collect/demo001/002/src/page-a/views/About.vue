<template>
  <div class="page">
    <h2>关于 - 页面 A</h2>
    <p>这是 Vite + Vue 3 MPA 架构的页面 A 的关于页。</p>
    <p>当前时间戳: {{ now }}</p>
    <p>格式化的时间: {{ formatTimestamp(now) }}</p>
  </div>
</template>

<script setup lang="ts">
import { formatTimestamp } from '@/common/utils/format'

const now = Date.now()
</script>

<style scoped>
.page { line-height: 1.8; }
</style>
