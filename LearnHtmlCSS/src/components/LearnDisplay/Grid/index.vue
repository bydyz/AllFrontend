<script setup>
import GridTemplate1 from "./GridTemplate1.vue";
import GridTemplate2 from "./GridTemplate2.vue";
import GridTemplate3 from "./GridTemplate3.vue";
import GridTemplate4 from "./GridTemplate4.vue";
import GridTemplate5 from "./GridTemplate5.vue";
import GridTemplate6 from "./GridTemplate6.vue";
import GridTemplate7 from "./GridTemplate7.vue";
import Masonry1 from "./Masonry1.vue";
import Masonry2 from "./Masonry2.vue";
import Masonry3 from "./Masonry3.vue";
import MasonryOther1 from "./MasonryOther1.vue";
import MasonryOther2 from "./MasonryOther2.vue";
import GridTemplateAreas1 from "./GridTemplateAreas1.vue";
import GridTemplateAreas2 from "./GridTemplateAreas2.vue";
import GridTemplateAreas3 from "./GridTemplateAreas3.vue";
import GridAutoFlow1 from "./GridAutoFlow1.vue";
import { ref, shallowRef, markRaw } from "vue";

let componentsArray = ref([
  {
    name: 'GridTemplate1',
    component: markRaw(GridTemplate1)
  },
  {
    name: 'GridTemplate2',
    component: markRaw(GridTemplate2)
  },
  {
    name: 'GridTemplate3',
    component: markRaw(GridTemplate3)
  },
  {
    name: 'GridTemplate4',
    component: markRaw(GridTemplate4)
  },
  {
    name: 'GridTemplate5',
    component: markRaw(GridTemplate5)
  },
  {
    name: 'GridTemplate6',
    component: markRaw(GridTemplate6)
  },
  {
    name: 'GridTemplate7',
    component: markRaw(GridTemplate7)
  },
  {
    name: 'masonry1',
    component: markRaw(Masonry1)
  },
  {
    name: 'masonry2',
    component: markRaw(Masonry2)
  },
  {
    name: 'masonry3',
    component: markRaw(Masonry3)
  },
  {
    name: 'MasonryOther1',
    component: markRaw(MasonryOther1)
  },
  {
    name: 'MasonryOther2',
    component: markRaw(MasonryOther2)
  },
  {
    name: 'GridTemplateAreas1',
    component: markRaw(GridTemplateAreas1)
  },
  {
    name: 'GridTemplateAreas2',
    component: markRaw(GridTemplateAreas2)
  },
  {
    name: 'GridTemplateAreas3',
    component: markRaw(GridTemplateAreas3)
  },
  {
    name: 'GridAutoFlow1',
    component: markRaw(GridAutoFlow1)
  },
])
let componentId = shallowRef(GridTemplate1);
</script>

<template>
  <div class="ml-[50px] mt-[20px]">
    <div style="display: flex; flex-wrap: wrap;">
      <div id="myDivButton" class="cursor-pointer" :class="componentId === item.component ? 'bg-[pink]' : ''" v-for="(item, index) in componentsArray" :key="index" @click="componentId = item.component">{{ item.name }}</div>
    </div>

    <!-- componentId 不能为 字符串，需要为导入的 组件对象 -->
    <component :is="componentId"></component>
  </div>
</template>

<style scoped></style>
