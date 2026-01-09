<template>
  <div class="box">
    <div>1</div>
    <div>2</div>
    <div>3</div>
    <div>4</div>
    <div>5</div>
    <div>6</div>
    <div>7</div>
    <div>8</div>
    <div>9</div>
  </div>
</template>

<script setup></script>

<style scoped lang="scss">
div.box {
  width: 600px;
  height: 600px;
  overflow: auto;
  display: grid;
  gap: 10px 15px;

  /* 1 固定值 */
  grid-template-rows: 200px 300px 200px;
  grid-template-columns: 200px 200px 200px;

  /* 当所设置的行高值超过了容器的行高值，项目会超出容器范围 */

  div {
    border-radius: 8px;
    background: linear-gradient(135deg, #999999, #999998);
  }
}
</style>
