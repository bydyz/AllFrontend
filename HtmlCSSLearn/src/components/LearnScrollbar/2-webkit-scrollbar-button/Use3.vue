<template>
  <div class="w-[300px] h-[200px] overflow-auto custom-scrollbar">
    <div class="w-[600px] h-[400px] flex flex-col justify-between items-start">
      <div class="w-full h-4 flex justify-between bg-[#f5c1c1]">
        <span>start</span>
        <span>end</span>
      </div>

      <div class="w-full h-4 flex justify-between bg-[#c0c0f1]">
        <span>start</span>
        <span>end</span>
      </div>
    </div>
  </div>
</template>


<script setup>
</script>

<style scoped lang="scss">
/* 滚动条整体  样式设置 */
.custom-scrollbar::-webkit-scrollbar {
  width: 16px;              /* 垂直滚动条宽度 */
  height: 16px;             /* 水平滚动条高度 */
  background-color: #8989ec; /* 滚动条背景色 */
  border-radius: 8px;       /* 圆角 */
  border: 1px solid #ddd;   /* 边框 */
}

// 若不设置上面的，下面的这些设置都无用
/* 向上箭头 */
.custom-scrollbar::-webkit-scrollbar-button:single-button:vertical:decrement {
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='8' height='8' fill='white'><polygon points='0,4 8,4 4,0'/></svg>");
}
/* 向下箭头 */
.custom-scrollbar::-webkit-scrollbar-button:single-button:vertical:increment {
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='8' height='8' fill='white'><polygon points='0,0 8,0 4,4'/></svg>");
}
</style>