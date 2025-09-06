<template>
  <div class="add">
    <button @click="btnClick(1)">+1</button>
    <button @click="btnClick(5)">+5</button>
    <button @click="btnClick(10)">+10</button>
  </div>
</template>

<script setup>
  // emit  的用法
  const emit = defineEmits(['add'])

  function btnClick(count) {

    console.log("btnClick:", count)
    // 让子组件发出去一个自定义事件
    // 第一个参数自定义的事件名称
    // 第二个参数是传递的参数
    emit("add", count)
  }
</script>

<style scoped>
</style>


