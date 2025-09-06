<template>
  <div class="app">
    <h2>当前计数: {{ counter }}</h2>

    <!-- 1.自定义add-counter, 并且监听内部的add事件 -->
    <add-counter @add="addBtnClick"></add-counter>
    <add-counter @add="addBtnClick"></add-counter>

    <!-- 2.自定义sub-counter, 并且监听内部的sub事件 -->
    <sub-counter @sub="subBtnClick"></sub-counter>
  </div>
</template>

<script setup>
  import AddCounter from './AddCounter.vue'
  import SubCounter from './SubCounter.vue'
  import { ref } from 'vue'

  let counter = ref(0)

  function addBtnClick(count) {
    counter.value += count
  }

  function subBtnClick(count) {
    counter.value -= count
  }
</script>

<style scoped>
</style>

