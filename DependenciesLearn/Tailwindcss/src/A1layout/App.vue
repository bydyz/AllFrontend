<script setup>
import AspectRatio from "./components/AspectRatio.vue";
import Overflow from "./components/Overflow.vue";
import { ref, shallowRef, markRaw } from "vue";

let componentsArray = ref([
  {
    name: '宽高比',
    component: markRaw(AspectRatio)
  },
  {
    name: 'Overflow',
    component: markRaw(Overflow)
  },
])
let componentId = shallowRef(AspectRatio);
</script>

<template>
  <div>
    <div style="display: flex">
      <div id="myDivButton" class="cursor-pointer" v-for="(item, index) in componentsArray" :key="index" @click="componentId = item.component">{{ item.name }}</div>
    </div>

    <!-- componentId 不能为 字符串，需要为导入的 组件对象 -->
    <component :is="componentId"></component>
  </div>
</template>

<style scoped></style>
