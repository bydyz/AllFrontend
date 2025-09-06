<script setup>
import Use1 from "./Use1.vue";
import Use2 from "./Use2.vue";
import Example1 from "./Example1.vue";
import { ref, shallowRef, markRaw } from "vue";

let componentsArray = ref([
  {
    name: '基本使用1',
    component: markRaw(Use1)
  },
  {
    name: '基本使用2',
    component: markRaw(Use2)
  },
  {
    name: '示例1',
    component: markRaw(Example1)
  },
])
let componentId = shallowRef(Use1);
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
