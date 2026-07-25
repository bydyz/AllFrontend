<template>
  <div class="app">
    <header class="header">
      <h1>vite-plugin-md2vue</h1>
      <p>基础使用示例</p>
    </header>
    
    <main>
      <MarkdownContent />
    </main>
    
    <footer>
      <p>由 vite-plugin-md2vue 驱动</p>
    </footer>
  </div>
</template>

<script setup>
import MarkdownContent from './docs/intro.md'
</script>

<style>
.app {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

header {
  text-align: center;
  margin-bottom: 40px;
  padding-bottom: 20px;
  border-bottom: 1px solid #eee;
}

header h1 {
  color: #42b883;
  margin-bottom: 10px;
}

header p {
  color: #666;
}

footer {
  margin-top: 40px;
  padding-top: 20px;
  border-top: 1px solid #eee;
  text-align: center;
  color: #999;
}
</style>
