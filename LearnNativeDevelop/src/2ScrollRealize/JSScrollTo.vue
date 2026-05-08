<template>
  <div class="flex">
    <div id="innerPageButton" class="cursor-pointer" @click="onScroll">Scroll</div>
  </div>

  <div class="w-[600px] h-[600px] bg-[#ac8080] overflow-auto" id="containerDom">
    <div class="w-[300px] h-[500px] bg-[#678a88] m-[16px]" id="containerDom">111</div>
    <div class="w-[300px] h-[500px] bg-[#678a88] m-[16px]" id="innerDomTwo">222</div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";

const onScroll = () => {
  containerDom.scrollTo({
    top: 500, // 垂直位置
    left: 0, // 水平位置
    behavior: "smooth", // 滚动行为
  });
};

let containerDom = null;
let innerDomTwo = null;
onMounted(() => {
  containerDom = document.getElementById("containerDom");
  innerDomTwo = document.getElementById("innerDomTwo");
});
</script>

<style scoped></style>
