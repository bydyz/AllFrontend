<script setup>
import LearnOl from "./LearnOl.vue";
import LearnUl from "./LearnUl.vue";
import { ref, shallowRef, markRaw } from "vue";

let componentsArray = ref([
  {
    name: '有序列表',
    component: markRaw(LearnOl)
  },
  {
    name: '无序列表',
    component: markRaw(LearnUl)
  },
])
let componentId = shallowRef(LearnUl);
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
