<template>
  <div>AppContent</div>
</template>

<script setup>
import { onMounted, onUpdated, onUnmounted } from "vue";

// 在执行setup函数的过程中, 你需要注册别的生命周期函数    onBeforeCreate、onCreated是没有的
onMounted(() => {
  console.log("onmounted");
});
</script>

<style scoped></style>
