<template>
  <h2>瀑布流布局效果 (仅在 Firefox 中有效)</h2>

  <div class="masonry-grid">
    <div class="masonry-item">项目 1 (120px)</div>
    <div class="masonry-item">项目 2 (200px)</div>
    <div class="masonry-item">项目 3 (160px)</div>
    <div class="masonry-item">项目 4 (180px)</div>
    <div class="masonry-item">项目 5 (140px)</div>
    <div class="masonry-item">项目 6 (220px)</div>
    <div class="masonry-item">项目 7 (130px)</div>
    <div class="masonry-item">项目 8 (170px)</div>
  </div>
</template>

<script setup></script>

<style scoped lang="scss">
.masonry-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* 4列 */
  grid-template-rows: masonry; /* 关键：瀑布流效果 */
  gap: 16px;
  padding: 20px;
}

.masonry-item {
  background: linear-gradient(45deg, #3498db, #2980b9);
  color: white;
  padding: 20px;
  border-radius: 8px;
  break-inside: avoid; /* 防止项目被分割 */
}

/* 不同高度项目 */
.masonry-item:nth-child(1) { height: 120px; }
.masonry-item:nth-child(2) { height: 200px; }
.masonry-item:nth-child(3) { height: 160px; }
.masonry-item:nth-child(4) { height: 180px; }
.masonry-item:nth-child(5) { height: 140px; }
.masonry-item:nth-child(6) { height: 220px; }
.masonry-item:nth-child(7) { height: 130px; }
.masonry-item:nth-child(8) { height: 170px; }
</style>
