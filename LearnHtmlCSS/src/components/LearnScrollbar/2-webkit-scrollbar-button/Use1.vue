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

<style scoped lang="stylus">
/* 滚动条整体  样式设置 */
.custom-scrollbar::-webkit-scrollbar {
  width: 16px;              /* 垂直滚动条宽度 */
  height: 16px;             /* 水平滚动条高度 */
  background-color: #8989ec; /* 滚动条背景色 */
  border-radius: 8px;       /* 圆角 */
  border: 1px solid #ddd;   /* 边框 */
}

// 若不设置上面的，下面的这些设置都无用
/* 单边按钮 */
.custom-scrollbar::-webkit-scrollbar-button:start {
  background: linear-gradient(180deg, #ff6b6b, #ee5a52);
}
.custom-scrollbar::-webkit-scrollbar-button:end {
  background: linear-gradient(180deg, #4ecdc4, #44a08d);
}
</style>