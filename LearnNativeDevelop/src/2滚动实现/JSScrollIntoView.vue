<template>
  <div class="flex">
    <div id="innerPageButton" class="cursor-pointer" @click="onScroll">Scroll</div>
  </div>

  <div class="w-[600px] h-[600px] bg-[#ac8080] overflow-auto">
    <div class="w-[300px] h-[1200px] bg-[#678a88] m-[16px]" id="innerDomOne">111</div>
    <div class="w-[300px] h-[300px] bg-[#678a88] m-[16px]" id="innerDomTwo">222</div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";

const onScroll = () => {
  innerDomTwo.scrollIntoView({
    behavior: "smooth", // 'auto' 或 'smooth'
    block: "center", // 'start', 'center', 'end', 'nearest'
    inline: "center", // 'start', 'center', 'end', 'nearest'
  });
};

let innerDomOne = null;
let innerDomTwo = null;
onMounted(() => {
  innerDomOne = document.getElementById("innerDomOne");
  innerDomTwo = document.getElementById("innerDomTwo");
});
</script>

<style scoped></style>
