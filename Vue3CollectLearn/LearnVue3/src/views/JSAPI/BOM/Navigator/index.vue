<script setup>
import { ref } from "vue";

function run1() {
  // navigator.userAgent：返回用户的agent字符串，可用于识别浏览器类型。
  console.log(navigator.userAgent);

  // 打印浏览器语言设置
  console.log(navigator.language);
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
  <div>navigator 对象包含了有关浏览器的信息。</div>

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
