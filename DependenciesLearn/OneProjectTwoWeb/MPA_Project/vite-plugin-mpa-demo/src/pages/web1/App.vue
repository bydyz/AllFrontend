<template>
  <div class="web1-app">
    <nav class="nav-bar">
      <h1>Web1 应用</h1>
      <div class="nav-links">
        <router-link to="/">首页</router-link>
        <router-link to="/about">关于我们</router-link>
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
.web1-app {
  font-family: Arial, sans-serif;
}

.nav-bar {
  background-color: #42b983;
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
