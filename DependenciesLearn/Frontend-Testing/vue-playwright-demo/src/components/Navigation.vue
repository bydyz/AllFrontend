<template>
  <nav class="navigation" data-testid="navigation">
    <div class="nav-brand">Playwright 测试示例</div>
    <ul class="nav-links">
      <li>
        <button
          :class="{ active: currentPage === 'home' }"
          @click="$emit('navigate', 'home')"
          data-testid="nav-home"
        >
          首页
        </button>
      </li>
      <li>
        <button
          :class="{ active: currentPage === 'form' }"
          @click="$emit('navigate', 'form')"
          data-testid="nav-form"
        >
          表单
        </button>
      </li>
      <li>
        <button
          :class="{ active: currentPage === 'list' }"
          @click="$emit('navigate', 'list')"
          data-testid="nav-list"
        >
          列表
        </button>
      </li>
    </ul>
  </nav>
</template>

<script setup>
/**
 * Navigation 组件
 * 演示导航测试、按钮交互、条件样式
 */
defineProps({
  currentPage: {
    type: String,
    default: 'home'
  }
})

defineEmits(['navigate'])
</script>

<style scoped>
.navigation {
  background: #333;
  color: white;
  padding: 15px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-brand {
  font-size: 20px;
  font-weight: bold;
}

.nav-links {
  display: flex;
  list-style: none;
  gap: 10px;
}

.nav-links button {
  background: transparent;
  color: white;
  border: 1px solid white;
  padding: 8px 16px;
  cursor: pointer;
  border-radius: 4px;
  transition: all 0.3s;
}

.nav-links button:hover {
  background: rgba(255, 255, 255, 0.1);
}

.nav-links button.active {
  background: white;
  color: #333;
}
</style>
