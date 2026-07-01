<template>
  <div class="profile">
    <h2>个人资料</h2>
    <p>这是第二套 Web 应用的个人资料页面</p>
    <div class="profile-section">
      <h3>用户信息</h3>
      <p>用户名: {{ profileStore.name }}</p>
      <p>邮箱: {{ profileStore.email }}</p>
      <p>注册时间: {{ profileStore.registerDate }}</p>
      <button @click="profileStore.updateProfile">更新资料</button>
    </div>
  </div>
</template>

<script setup>
import { useProfileStore } from '../../../../stores/profile'

const profileStore = useProfileStore()
</script>

<style scoped>
.profile {
  padding: 1rem;
}

.profile-section {
  margin-top: 2rem;
  padding: 1rem;
  background-color: #fff8f0;
  border-radius: 8px;
}

button {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #2980b9;
}
</style>
