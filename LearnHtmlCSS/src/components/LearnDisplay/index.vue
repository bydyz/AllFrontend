<script setup>
import Flex from "./Flex/index.vue";
import Grid from "./Grid/index.vue";
import { ref, shallowRef, markRaw } from "vue";

let componentsArray = ref([
  {
    name: 'Flex',
    component: markRaw(Flex)
  },
  {
    name: 'Grid',
    component: markRaw(Grid)
  }
])
let componentId = shallowRef(Grid);
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
