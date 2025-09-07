<template>
  <div class="js-masonry" data-masonry='{"itemSelector": ".item", "columnWidth": 200}'>
  <div class="item">项目1</div>
  <div class="item">项目2</div>
  <!-- 更多项目 -->
</div>
</template>

<script setup>
import "https://cdn.jsdelivr.net/npm/masonry-layout@4.2.2/dist/masonry.pkgd.min.js"

</script>

<style scoped lang="stylus">
.js-masonry {
  margin: 0 auto;
}

.item {
  width: 200px;
  margin-bottom: 16px;
  background: #e74c3c;
  color: white;
  padding: 20px;
  border-radius: 8px;
}
</style>
