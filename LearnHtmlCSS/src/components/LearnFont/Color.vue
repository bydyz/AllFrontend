<template>
  <div>
    <div style="color: red">Lorem</div>

    <div id="div2">Lorem</div>

    <div class="div3">Lorem</div>

    <div class="div4">Lorem</div>

    <div class="div5">Lorem ipsum</div>

    <div>Lorem ipsum dolor sit</div>
  </div>
</template>

<script setup></script>

<style scoped>
#div2 {
  color: rgb(163, 227, 217);
}
/* 每一个取值都是0-255，0最强，255最弱 */

.div3 {
  color: rgb(162, 162, 207);
}

.div4 {
  color: #0012;
}

.div5 {
  color: #b33;
  /* 十六进制 0-9 A-F */
}

div {
  color: #19af28;
}
</style>
