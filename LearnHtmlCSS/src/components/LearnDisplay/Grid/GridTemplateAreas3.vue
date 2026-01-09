<template>
  <div class="box">
    <img src="./images/a1.png" alt="" />
    <img src="./images/a2.png" alt="" />
    <img src="./images/a3.png" alt="" />
    <img src="./images/a4.png" alt="" />
    <img src="./images/a5.png" alt="" />
    <img src="./images/a6.png" alt="" />
  </div>
</template>

<script setup></script>

<style scoped lang="scss">
.box {
  width: 800px;
  height: 400px;
  display: grid;
  grid-template-rows: repeat(3, 100px);
  grid-template-columns: repeat(6, 100px);

  grid-template-areas:
    "a a a a b b"
    "a a a a . ."
    "d d e f . c";

  grid-gap: 10px 10px;
  /* 行间距是10px，而总共3行，有两个行间距，所以需要在高度的基础上增加20px；
          宽度同理 */
}

.box img {
  width: 100%;
}
.box img:nth-child(1) {
  grid-area: a;
}
.box img:nth-child(2) {
  grid-area: d;
}
.box img:nth-child(3) {
  grid-area: e;
}
.box img:nth-child(4) {
  grid-area: f;
}
.box img:nth-child(5) {
  grid-area: b;
}
.box img:nth-child(6) {
  grid-area: c;
}
</style>
