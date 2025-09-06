<template>
  <div class="app">
    <!-- 1.内容是button -->
    <show-message title="哈哈哈">
      <button>我是按钮元素</button>
    </show-message>

    <hr>

    <!-- 2.内容是超链接 -->
    <show-message>
      <a href="#">百度一下</a>
    </show-message>

    <hr>

    <!-- 3.内容没有传递 -->
    <show-message></show-message>
  </div>
</template>

<script setup>
  import ShowMessage from './ShowMessage.vue'
</script>

<style scoped>
</style>

