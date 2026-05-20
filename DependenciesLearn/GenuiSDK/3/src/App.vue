<template>
  <div class="app-container">
    <nav class="nav-bar">
      <router-link
        v-for="(btn, index) in navButtons"
        :key="index"
        :to="btn.path"
        class="nav-btn"
        :class="{ active: $route.path === btn.path }"
      >
        {{ btn.label }}
      </router-link>
    </nav>
    <router-view />
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
const $route = useRoute();

const navButtons = [
  { label: '静态Schema演示1', path: '/staticGenuiRenderer1' },
  { label: '静态Schema演示2', path: '/staticGenuiRenderer2' },
  { label: '流式Schema演示', path: '/genui2' }
];
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.app-container {
  min-height: 100vh;
}

.nav-bar {
  display: flex;
  gap: 12px;
  padding: 12px 16px;
  background: #f5f5f5;
  border-bottom: 1px solid #e0e0e0;
}

.nav-btn {
  padding: 8px 16px;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  text-decoration: none;
  color: #333;
  transition: all 0.2s;
}

.nav-btn:hover {
  border-color: #1890ff;
  color: #1890ff;
}

.nav-btn.active {
  background: #1890ff;
  border-color: #1890ff;
  color: #fff;
}
</style>