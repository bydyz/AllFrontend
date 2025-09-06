<template>
  <div class="grid-container">
    <div class="item item1">1</div>
    <div class="item">2</div>
    <div class="item">3</div>
    <div class="item">4</div>
    <div class="item">5</div>
    <div class="item">6</div>

    <!-- 下方设定的是 2行，倘若加了下面这一行，下面的 grid-template-rows 相当于设定了 第二行高度 100 ，一 三 平分 -->
    <div class="item">7</div>
    <div class="item">8</div>
    <div class="item">9</div>
  </div>
</template>

<script setup></script>

<style scoped>
.grid-container {
  display: grid;
  width: 600px;
  height: 600px;
  grid-template-columns: repeat(3, 1fr); /* 等同于 1fr 1fr 1fr */
  grid-template-rows: auto 100px; /* 第一行自动高度，第二行100px */
  gap: 10px; /* 网格间隙 */
}
.item {
  background-color: #ddd;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
}
</style>
