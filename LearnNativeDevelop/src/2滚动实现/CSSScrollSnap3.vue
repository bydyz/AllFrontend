<template>
  <div class="snap-container">
    <div class="slide slide-1">第一屏</div>
    <div class="slide slide-2">第二屏</div>
    <div class="slide slide-3">第三屏</div>
  </div>
</template>

<script setup></script>

<style scoped>
.snap-container {
  scroll-snap-type: y mandatory;
  overflow-y: scroll;
  height: 100vh;
  scroll-behavior: smooth;
}

.slide {
  scroll-snap-align: start;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
}

.slide-1 {
  background: #ac8080;
}
.slide-2 {
  background: #678a88;
}
.slide-3 {
  background: #7a9fa7;
}
</style>
