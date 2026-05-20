<script setup>
import { ref } from "vue";

function run1() {
  // location.href：获取或设置当前页面的完整URL。
  console.log(window.location.href);
  console.log(location.href);

  // location.protocol, location.host, location.pathname 等：分别获取URL的不同部分。
  console.log(location.protocol, location.host, location.pathname)
}

function run2() {
  // location.assign(url)：加载新的文档。
  // 跳转到新页面
  window.location.assign('https://www.example.com');
}

function run3() {
  // 重新加载当前页面
  window.location.reload();
}

function run4() {

}


</script>

<template>
  <div>location 对象包含了当前文档的URL信息，并提供了导航到其他URL的方法。</div>

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
