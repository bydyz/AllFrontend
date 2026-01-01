<script setup>
import { ref, shallowRef, markRaw } from "vue";
import CSSScrollBehavior from "./CSSScrollBehavior.vue";
import CSSScrollSnap1 from "./CSSScrollSnap1.vue";
import CSSScrollSnap2 from "./CSSScrollSnap2.vue";
import JSScrollIntoView from "./JSScrollIntoView.vue";
import JSScrollTo from "./JSScrollTo.vue";

let componentsArray = ref([
  {
    name: '使用scroll-behavior',
    component: markRaw(CSSScrollBehavior)
  },
  {
    name: '使用scroll-snap 1',
    component: markRaw(CSSScrollSnap1)
  },
  {
    name: '使用scroll-snap 2',
    component: markRaw(CSSScrollSnap2)
  },
  {
    name: '使用scrollIntoView',
    component: markRaw(JSScrollIntoView)
  },
  {
    name: '使用scrollTo',
    component: markRaw(JSScrollTo)
  },
])
let componentId = shallowRef(JSScrollTo);
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
