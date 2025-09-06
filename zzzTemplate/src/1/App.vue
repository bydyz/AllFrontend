<script setup>
import LearnUniversalSelector from "./components/1.vue";
import { ref } from "vue";

let componentsArray = ref([
  {
    name: '基础功能',
    component: LearnUniversalSelector
  }
])
let componentId = ref(LearnUniversalSelector);
</script>

<template>
  <div>
    <div style="display: flex">
      <div id="myDivButton" v-for="(item, index) in componentsArray" :key="index" @click="item => componentId = item.component">{{ item.name }}</div>
    </div>

    <!-- componentId 不能为 字符串，需要为导入的 组件对象 -->
    <component :is="componentId"></component>
  </div>
</template>

<style scoped></style>
