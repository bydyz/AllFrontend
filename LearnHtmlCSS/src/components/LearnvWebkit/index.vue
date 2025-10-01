<script setup>
import ObjectFit from "./ObjectFit.vue";

import { ref, shallowRef, markRaw } from "vue";

let componentsArray = ref([
  {
    name: '图片object-fit',
    component: markRaw(ObjectFit)
  },
])
let componentId = shallowRef(ObjectFit);
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
