<template>
  <div class="photo-gallery">
    <div class="photo large">1</div>
    <div class="photo">2</div>
    <div class="photo">3</div>
    <div class="photo">4</div>
    <div class="photo large">5</div>
    <div class="photo">6</div>
    <div class="photo">7</div>
    <div class="photo">8</div>
  </div>
</template>

<script setup></script>

<style scoped lang="stylus">
.photo-gallery {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-template-rows: masonry; /* 瀑布流效果 */
  gap: 15px;
  padding: 20px;
}

.photo {
  background: #3498db;
  color: white;
  padding: 30px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  font-weight: bold;
}

.large {
  grid-row: span 2;       /* 占两行 */
  grid-column: span 2;    /* 占两列 */
  background: #e74c3c;
}

/* 不同尺寸的图片 */
.photo:nth-child(2) { height: 120px; }
.photo:nth-child(3) { height: 180px; }
.photo:nth-child(4) { height: 150px; }
.photo:nth-child(6) { height: 200px; }
.photo:nth-child(7) { height: 130px; }
.photo:nth-child(8) { height: 170px; }
</style>
