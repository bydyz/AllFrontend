<template>
  <main>
    <div>ShowInfo子组件</div>
    <div>{{ noReactiveData }}</div>
    <div>{{ reactiveData }}</div>
  </main>
</template>

<script setup>
import { ref } from "vue";

const data1 = 666;
const noReactiveData = "this is no reactive data";
const reactiveData = ref("this is reactive data");
function showInfoFoo() {
  console.log("showInfo foo function");
}

// 必须要如此才可用 ref 访问使用
defineExpose({
  data1,
  noReactiveData,
  reactiveData,
  showInfoFoo
})
</script>

<style scoped>
main {
  background: rgb(168, 165, 165);
}
div {
  margin: 20px 0;
}
</style>
