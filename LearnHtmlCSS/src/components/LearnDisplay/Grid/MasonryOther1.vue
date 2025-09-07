<template>
  <div class="columns-fallback">
    <div class="item">项目1 (200px)</div>
    <div class="item">项目2 (300px)</div>
    <div class="item">项目3 (250px)</div>
    <!-- 更多项目 -->
  </div>
</template>

<script setup></script>

<style scoped lang="stylus">
.columns-fallback {
  column-count: 4; /* 4列 */
  column-gap: 16px;
  padding: 20px;
}

.item {
  break-inside: avoid; /* 防止项目被分割 */
  margin-bottom: 16px;
  background: #3498db;
  color: white;
  padding: 20px;
  border-radius: 8px;
}

/* 响应式 */
@media (max-width: 1024px) {
  .columns-fallback { column-count: 3; }
}

@media (max-width: 768px) {
  .columns-fallback { column-count: 2; }
}

@media (max-width: 480px) {
  .columns-fallback { column-count: 1; }
}
</style>
