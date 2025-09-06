<script setup>
import { ref } from "vue";

function run1() {
  // screen.width 和 screen.height：获取屏幕分辨率的宽度和高度。
  console.log(`Screen width: ${screen.width}, Screen height: ${screen.height}`);

  // screen.availWidth 和 screen.availHeight：获取可用的屏幕宽度和高度（除去任务栏等）。
  console.log(`Available screen width: ${screen.availWidth}, Available screen height: ${screen.availHeight}`);
}

function run2() {
  // 向前移动一页
  window.history.forward();
}

function run3() {
  // history.go(n)：前进或后退n页。
  window.history.go(-2);
}

function run4() {

}


</script>

<template>
  <div>screen 对象包含有关用户屏幕的信息。</div>

  <button @click="run1">run1</button>
  <button @click="run2">run2</button>
  <button @click="run3">run3</button>
  <button @click="run4">run4</button>
</template>

<style scoped lang="scss">
button {
  padding: 0 8px;
}
</style>
