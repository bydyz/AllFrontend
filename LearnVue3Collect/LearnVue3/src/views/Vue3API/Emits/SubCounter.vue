<template>
  <div class="sub">
    <button @click="btnClick(1)">-1</button>
    <button @click="btnClick(5)">-5</button>
    <button @click="btnClick(10)">-10</button>
  </div>
</template>

<script setup>
  // emit  的用法
  const emit = defineEmits(['sub'])

  function btnClick(count) {

    // 2.将事件和状态传递给父组件
    emit('sub', count)
  }
</script>

<style scoped>
</style>

