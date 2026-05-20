<template>
  <div>
    <div class="box1"></div>
    <div class="box2"></div>
    <div class="box3"></div>
    <div class="box4"></div>
    <div class="box5"></div>
  </div>
</template>

<script setup></script>

<style scoped>
div {
  width: 103px;
  height: 32px;
  float: left;
  margin: 10px;
  background: rgb(196, 196, 162) url(./EIFPic.png);

  /* 此时的div没有设置border，好像和前面不太一样，注意一下 */
}

.box1 {
  background-position: -205px -111px;
}

.box2 {
  background-position: -205px -74px;
}
</style>
