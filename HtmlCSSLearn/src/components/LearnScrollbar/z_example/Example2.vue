<template>
  <div class="custom-scrollbar">
    <div class="w-[600px] h-[400px]"></div>
  </div>
</template>

<script setup></script>

<style scoped lang="scss">
/* 基础滚动条样式 - Webkit 浏览器（Chrome, Safari, Edge） */
.custom-scrollbar {
  width: 300px;
  height: 200px;
  overflow: auto;
  border: 1px solid #ccc;
  padding: 10px;
}

::-webkit-scrollbar {
  width: 12px; /* 垂直滚动条宽度 */
  height: 12px; /* 水平滚动条高度 */
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 6px;
}

::-webkit-scrollbar-thumb {
  background: #c1c1ee;
  border-radius: 6px;
  border: 2px solid #f1f1f1;
}
</style>
