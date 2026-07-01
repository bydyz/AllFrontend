<template>
  <div class="page">
    <h2>设置 - 页面 B</h2>
    <p>在这里可以配置一些偏好选项。</p>

    <section class="config">
      <h3>偏好设置</h3>
      <label>
        消息：
        <input v-model="store.message" placeholder="输入偏好消息" />
      </label>
      <p>当前消息: "{{ store.message }}"</p>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useAppStore } from '@/stores/app'

const store = useAppStore()
</script>

<style scoped>
.page { line-height: 1.8; }
.config { margin-top: 20px; padding: 16px; border: 1px solid #ddd; border-radius: 8px; }
input { margin-left: 8px; padding: 4px 8px; }
</style>
