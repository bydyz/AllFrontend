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

  <div class="mt-[20px] w-[300px] h-[200px] overflow-auto custom-scrollbar custom-scrollbar-button">
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

<script setup></script>

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
/* 单边按钮 */
.custom-scrollbar::-webkit-scrollbar-button:start {
  background: linear-gradient(180deg, #ff6b6b, #ee5a52);
}
.custom-scrollbar::-webkit-scrollbar-button:end {
  background: linear-gradient(180deg, #4ecdc4, #44a08d);
}

/* 轨道基础样式 */
.custom-scrollbar::-webkit-scrollbar-track {
  background: linear-gradient(180deg, #f8f9fa, #e9ecef);
  border-radius: 8px;
  border: 2px solid #dee2e6;
  box-shadow: inset 0 0 6px rgba(0,0,0,0.1);
}

/* 与滑块形成对比 */
.custom-scrollbar::-webkit-scrollbar-track-piece:start {
  background: linear-gradient(180deg, #ff6b6b, #ee5a52);
  border-radius: 6px 6px 0 0;
}
.custom-scrollbar::-webkit-scrollbar-track-piece:end {
  background: linear-gradient(180deg, #4ecdc4, #44a08d);
  border-radius: 0 0 6px 6px;
}

.custom-scrollbar-button::-webkit-scrollbar-thumb {
  background: linear-gradient(180deg, #6c5ce7, #a29bfe);
  border-radius: 8px;
  border: 2px solid #f8f9fa;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
}
</style>
