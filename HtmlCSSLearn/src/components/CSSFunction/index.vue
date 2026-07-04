<script setup>
import clampFunc from "./clampFunc.vue";
import { ref, shallowRef, markRaw } from "vue";

let componentsArray = ref([
  {
    name: "clamp()函数",
    component: markRaw(clampFunc),
  },
]);
let componentId = shallowRef(clampFunc);
</script>

<template>
  <div class="ml-[50px] mt-[20px]">
    <div style="display: flex">
      <div id="myDivButton" class="cursor-pointer" :class="componentId === item.component ? 'bg-[pink]' : ''" v-for="(item, index) in componentsArray" :key="index" @click="componentId = item.component">{{ item.name }}</div>
    </div>

    <!-- componentId 不能为 字符串，需要为导入的 组件对象 -->
    <component :is="componentId"></component>
  </div>
</template>

<style scoped></style>
