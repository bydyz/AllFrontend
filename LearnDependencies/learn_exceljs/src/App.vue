<script setup>
import Export1 from "./components/export1.vue";
import Export2 from "./components/export2.vue";
import Export3 from "./components/export3.vue";
import Export4 from "./components/export4.vue";
import Export5 from "./components/export5.vue";
import Export6 from "./components/export6.vue";
import Export7 from "./components/export7.vue";
import Export8 from "./components/export8.vue";

import ExportExample1 from "./components/exportExample1.vue";

import Import1 from "./components/import1.vue";
import { ref, shallowRef, markRaw } from "vue";

let componentsArray = ref([
  {
    name: 'Export1',
    component: markRaw(Export1)
  },
  {
    name: 'Export2',
    component: markRaw(Export2)
  },
  {
    name: 'Export3',
    component: markRaw(Export3)
  },
  {
    name: 'Export4',
    component: markRaw(Export4)
  },
  {
    name: 'Export5',
    component: markRaw(Export5)
  },
  {
    name: 'Export6',
    component: markRaw(Export6)
  },
  {
    name: 'Export7',
    component: markRaw(Export7)
  },
  {
    name: 'Export8',
    component: markRaw(Export8)
  },
  {
    name: 'ExportExample1',
    component: markRaw(ExportExample1)
  },
  {
    name: 'Import1',
    component: markRaw(Import1)
  },
])
let componentId = shallowRef(Export1);
</script>

<template>
  <div>
    <div style="display: flex">
      <div id="myDivButton" class="cursor-pointer" :class="componentId === item.component ? 'bg-[pink]' : ''" v-for="(item, index) in componentsArray" :key="index" @click="componentId = item.component">{{ item.name }}</div>
    </div>

    <!-- componentId 不能为 字符串，需要为导入的 组件对象 -->
    <component :is="componentId"></component>
  </div>
</template>

<style scoped></style>
