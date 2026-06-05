<template>
  <JSSlotComponent>
    <p>slot default</p>

    <template #slot1>
      <p>slot1</p>
    </template>

    <template #slot2="slotData">
      <p>slot2：{{ slotData.msg }}</p>
    </template>
  </JSSlotComponent>
</template>


<script setup>
// 等效于 创建一个 含有插槽的 vue文件
import JSSlotComponent from './JSSlotComponent.js'
</script>

<style scoped lang="scss"></style>