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
  width: 800px;
  height: 800px;
  display: grid;
  gap: 10px;

  /* 1 固定值 */
  grid-template-rows: 100px 100px 100px;
  grid-template-columns: 200px 200px 200px;

  /* 当设置的值要小于容器的属性值，且项目个数也要少于所设定的值时（此时三行三列，设置了9个格子）
  但是，.box中有14个，此时，系统会自动将容器中剩余的空间平分以满足所需盒子个数的要求 */

  div {
    border-radius: 8px;
    background: linear-gradient(135deg, #999999, #999998);
  }
}
</style>
