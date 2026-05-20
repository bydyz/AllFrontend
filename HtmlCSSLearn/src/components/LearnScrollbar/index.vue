<script setup>
import Use11 from "./1-webkit-scrollbar/Use1.vue";

import Use21 from "./2-webkit-scrollbar-button/Use1.vue";
import Use22 from "./2-webkit-scrollbar-button/Use2.vue";
import Use23 from "./2-webkit-scrollbar-button/Use3.vue";

import Use31 from "./3-webkit-scrollbar-track/Use1.vue";

import Use41 from "./4-webkit-scrollbar-track-piece/Use1.vue";

import Use51 from "./5-webkit-scrollbar-thumb/Use1.vue";

import Use61 from "./6-webkit-scrollbar-corner/Use1.vue";

import Use71 from "./7-webkit-resizer/Use1.vue";

import Example1 from "./Example1.vue";
import Example2 from "./Example2.vue";

import { ref, shallowRef, markRaw } from "vue";

let componentsArray = ref([
  {
    name: '::-webkit-scrollbar 1',
    component: markRaw(Use11)
  },
  {
    name: '::-webkit-scrollbar-button 1',
    component: markRaw(Use21)
  },
  {
    name: '::-webkit-scrollbar-button 2',
    component: markRaw(Use22)
  },
  {
    name: '::-webkit-scrollbar-button 3',
    component: markRaw(Use23)
  },
  {
    name: '::-webkit-scrollbar-track 1',
    component: markRaw(Use31)
  },
  {
    name: '::-webkit-scrollbar-track-piece 1',
    component: markRaw(Use41)
  },
  {
    name: '::-webkit-scrollbar-thumb 1',
    component: markRaw(Use51)
  },
  {
    name: '::-webkit-scrollbar-corner 1',
    component: markRaw(Use61)
  },
  {
    name: '::-webkit-resizer 1',
    component: markRaw(Use71)
  },
  {
    name: '示例一',
    component: markRaw(Example1)
  },
  {
    name: '示例二',
    component: markRaw(Example2)
  }
])
let componentId = shallowRef(Use11);
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
