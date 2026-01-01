<script setup>
import JustCSSAndJs from "./1拖曳修改div尺寸/index.vue";
import RealizeScroll from "./2滚动实现/index.vue";
import { ref } from "vue";

let componentsArray = ref([
  {
    name: '拖曳',
    component: JustCSSAndJs
  },
  {
    name: '滚动',
    component: RealizeScroll
  },
])
let componentId = ref(RealizeScroll);
</script>

<template>
  <div>
    <div style="display: flex; flex-wrap: wrap">
      <div id="myDivButton" class="cursor-pointer" :class="componentId === item.component ? 'bg-[pink]' : ''" v-for="(item, index) in componentsArray" :key="index" @click="componentId = item.component">{{ item.name }}</div>
    </div>

    <!-- componentId 不能为 字符串，需要为导入的 组件对象 -->
    <component :is="componentId"></component>
  </div>
</template>

<style scoped></style>
