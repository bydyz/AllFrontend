<script setup>
import A1BasicUsage from "./components/A1BasicUsage.vue";
import A2CellConfig from "./components/A2CellConfig.vue";
import { ref } from "vue";

let componentsArray = ref([
  {
    name: '基础功能',
    component: A1BasicUsage
  },
  {
    name: '单元格配置',
    component: A2CellConfig
  }
])
let componentId = ref(A1BasicUsage);
</script>

<template>
  <div>
    <div style="display: flex">
      <div v-for="(item, index) in componentsArray" :key="index" @click="item => componentId = item.component">{{ item.name }}</div>
    </div>

    <!-- componentId 不能为 字符串，需要为导入的 组件对象 -->
    <component :is="componentId"></component>
  </div>
</template>

<style scoped></style>
