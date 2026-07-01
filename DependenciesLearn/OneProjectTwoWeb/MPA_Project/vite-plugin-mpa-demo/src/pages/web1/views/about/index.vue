<template>
  <div class="about">
    <h2>关于我们</h2>
    <p>这是第一套 Web 应用的关于页面</p>
    <div class="info-section">
      <h3>用户信息</h3>
      <p>用户名: {{ userStore.userName }}</p>
      <p>用户状态: {{ userStore.isLoggedIn ? '已登录' : '未登录' }}</p>
      <button @click="userStore.toggleLogin">
        {{ userStore.isLoggedIn ? '退出登录' : '登录' }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from '../../../../stores/user'

const userStore = useUserStore()
</script>

<style scoped>
.about {
  padding: 1rem;
}

.info-section {
  margin-top: 2rem;
  padding: 1rem;
  background-color: #e8f4f8;
  border-radius: 8px;
}

button {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #3aa876;
}
</style>
