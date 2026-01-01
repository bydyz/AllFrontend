<script setup>
import SimpleWrite1 from "./SimpleWrite1.vue";
import NewWrite1 from "./NewWrite1.vue";
import NewWrite2 from "./NewWrite2.vue";
import NewWrite3 from "./NewWrite3.vue";
import { ref, shallowRef, markRaw } from "vue";

let componentsArray = ref([
  {
    name: "普通写法1",
    component: markRaw(SimpleWrite1),
  },
  {
    name: "新写法1",
    component: markRaw(NewWrite1),
  },
  {
    name: "新写法2",
    component: markRaw(NewWrite2),
  },
  {
    name: "新写法3",
    component: markRaw(NewWrite3),
  },
]);
let componentId = shallowRef(NewWrite3);
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
