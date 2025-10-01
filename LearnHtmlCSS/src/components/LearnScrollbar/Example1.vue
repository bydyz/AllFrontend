<template>
  <div class="custom-scrollbar">
    <div class="w-[600px] h-[400px]"></div>
  </div>
</template>


<script setup>
</script>

<style scoped lang="stylus">
/* 基础滚动条样式 - Webkit 浏览器（Chrome, Safari, Edge） */
.custom-scrollbar {
  width: 300px;
  height: 200px;
  overflow: auto;
  border: 1px solid #ccc;
  padding: 10px;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 12px; /* 垂直滚动条宽度 */
  height: 12px; /* 水平滚动条高度 */
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 6px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 6px;
  border: 2px solid #f1f1f1;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}

.custom-scrollbar::-webkit-scrollbar-thumb:active {
  background: #888;
}

.custom-scrollbar::-webkit-scrollbar-corner {
  background: #f1f1f1;
}
</style>