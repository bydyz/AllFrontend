<template>
  <div class="web2-app">
    <nav class="nav-bar">
      <h1>Web2 应用</h1>
      <div class="nav-links">
        <router-link to="/">仪表盘</router-link>
        <router-link to="/profile">个人资料</router-link>
      </div>
    </nav>
    <main class="main-content">
      <router-view />
    </main>
  </div>
</template>

<script setup>
</script>

<style scoped>
.web2-app {
  font-family: Arial, sans-serif;
}

.nav-bar {
  background-color: #3498db;
  color: white;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-links a {
  color: white;
  margin-left: 1rem;
  text-decoration: none;
  font-weight: bold;
}

.nav-links a:hover {
  text-decoration: underline;
}

.main-content {
  padding: 2rem;
}
</style>
