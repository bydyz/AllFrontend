<script setup>
import { ref } from "vue";

function run1() {
  // 向后移动一页
  window.history.back();
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
  <div>history 对象提供对浏览器会话历史的访问，即用户在当前标签页中访问过的页面列表。</div>

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
