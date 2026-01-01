<template>
  <div class="flex">
    <div id="innerPageButton" class="cursor-pointer" @click="onScroll">Scroll</div>
  </div>

  <div class="container" style="height: 400px; overflow: auto">
    <div class="bg-[#bab8b8]" style="height: 200px">顶部占位</div>
    <div :class="shouldScrollToCenter ? 'target-element' : ''" style="height: 100px; background: lightblue">目标元素 - 会自动滚动到中间</div>
    <div class="bg-[#678a88]" style="height: 500px">底部占位</div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const shouldScrollToCenter = ref(false);
const onScroll = () => {
  shouldScrollToCenter.value = true;
};
</script>

<style scoped>
.container {
  scroll-snap-type: y mandatory;
  /* scroll-snap-type: x mandatory; */
  overflow: auto;
  height: 400px;
}

.target-element {
  scroll-snap-align: center; /* 关键属性：滚动时居中对齐 */
}
</style>
