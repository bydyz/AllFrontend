<template>
  <!-- 旧写法 -->
  <div class="containerOld">
    <div>
      <p>div中的内容1</p>
      <p>div中的内容2</p>
    </div>
    <p>ppp 111</p>
    <p>ppp 222</p>
  </div>
</template>

<script setup></script>

<style scoped>
.containerOld {
  color: pink;
}
.containerOld div {
  color: lightblue;
}
.containerOld:hover {
  color: #000;
}
.containerOld:hover div {
  color: orange;
}
</style>
