<template>
  <div class="grid-container">
    <div class="item item1">1</div>
    <div class="item">2</div>
    <div class="item">3</div>
    <div class="item">4</div>
    <div class="item">5</div>
    <div class="item">6</div>
    <div class="item">7</div>
    <div class="item">8</div>
    <div class="item">9</div>
  </div>
</template>

<script setup></script>

<style scoped>
.grid-container {
  display: grid;
  grid-template-columns: 100px 100px 100px; /* 3列，每列100px */
  grid-template-rows: 100px 100px 100px; /* 3行，每行100px */
  gap: 10px; /* 网格间隙 */
}
.item {
  background-color: #ddd;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
}
.item1 {
  grid-column-start: 1;
  grid-column-end: 3;
}
</style>
