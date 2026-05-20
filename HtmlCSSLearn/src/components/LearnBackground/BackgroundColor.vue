<template>
  <div class="div1">
    大家好

    <div class="div2">i love you</div>
  </div>
</template>

<script setup></script>

<style scoped lang="scss">
.div1 {
  width: 600px;
  height: 600px;

  /* background-color: red; */
  background-color: rgb(237, 191, 191);
}

.div2 {
  width: 300px;
  height: 300px;

  /* background-color: rgba(0, 0, 0, 0.5); */
  background-color: rgb(203, 233, 203);
  /* 没有rgba，默认背景是不透明，即a的取值为1 */
}
</style>
