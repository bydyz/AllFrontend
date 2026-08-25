<script setup>
/**
 * Playwright 测试示例应用
 * 包含多个组件用于演示端到端测试
 */
import Navigation from './components/Navigation.vue'
import HomePage from './components/HomePage.vue'
import FormPage from './components/FormPage.vue'
import ListPage from './components/ListPage.vue'
import { ref } from 'vue'

// 当前页面路由
const currentPage = ref('home')
</script>

<template>
  <div id="app">
    <!-- 导航组件 -->
    <Navigation 
      :current-page="currentPage" 
      @navigate="currentPage = $event" 
    />
    
    <!-- 页面内容 -->
    <main class="main-content">
      <HomePage v-if="currentPage === 'home'" />
      <FormPage v-else-if="currentPage === 'form'" />
      <ListPage v-else-if="currentPage === 'list'" />
    </main>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
}

#app {
  min-height: 100vh;
  background: #f5f5f5;
}

.main-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}
</style>
