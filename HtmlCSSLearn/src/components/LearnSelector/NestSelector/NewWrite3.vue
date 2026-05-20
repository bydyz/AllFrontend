<template>
  <div class="containerNew">
    <div class="containerNew-first-div">
      <p class="first-p">div 1 中的内容1</p>
      <p class="second-p">div 1 中的内容2</p>
    </div>
  </div>

  <div class="containerNew-first-div">
    <p class="first-p">div 1 中的内容1</p>
    <p class="second-p">div 1 中的内容2</p>
  </div>
</template>

<script setup></script>

<style scoped>
.containerNew-first-div {
  color: lightcoral;
  .containerNew & {
    color: lightblue;
  }
}

/* 上面的等于下面的 */
/* .containerNew-first-div {
  color: lightcoral;
}
.containerNew .containerNew-first-div {
  color: lightblue;
} */
</style>
