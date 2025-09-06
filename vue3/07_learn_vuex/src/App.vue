<template>
  <div class="app">
    <!-- store中的counter -->
    <h2>App当前计数: {{ $store.state.counter.count }}</h2>

    <h2>message: {{ $store.getters.message }}</h2>

    <!-- home页面 -->
    <hr>
    <home/>
  </div>
</template>

<script setup>

  import Home from './views/Home.vue'

</script>

<style>
</style>
