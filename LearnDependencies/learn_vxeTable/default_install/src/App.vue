<script setup>
import BasicFunction from "./a_basicFunction";
import RadioSelect from "./e_radioSelect";

import { ref, shallowRef, markRaw } from "vue";

let componentsArray = ref([
  {
    name: '基础功能',
    component: markRaw(BasicFunction)
  },
  {
    name: '单选框',
    component: markRaw(RadioSelect)
  }
])
let componentId = shallowRef(RadioSelect);
</script>

<template>
  <div>
    <div style="display: flex; flex-wrap: wrap;">
      <div id="myDivButton" class="cursor-pointer" :class="componentId === item.component ? 'bg-[pink]' : ''" v-for="(item, index) in componentsArray" :key="index" @click="componentId = item.component">{{ item.name }}</div>
    </div>

    <!-- componentId 不能为 字符串，需要为导入的 组件对象 -->
    <component :is="componentId"></component>
  </div>
</template>

<style scoped></style>
