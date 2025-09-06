<script setup>
import AllInExample from "./AllInExample.vue";
import MarginAuto from "./MarginAuto.vue";
import FlexDirection from "./FlexDirection.vue";
import JustifyContent from "./JustifyContent.vue";
import AlignContent from "./AlignContent.vue";
import AlignItems from "./AlignItems.vue";
import FlexWrap from "./FlexWrap.vue";
import AlignSelf from "./AlignSelf.vue";
import Order from "./Order.vue";
import FlexNum from "./FlexNum.vue";
import { ref, shallowRef, markRaw } from "vue";

let componentsArray = ref([
  {
    name: 'AllInExample',
    component: markRaw(AllInExample)
  },
  {
    name: 'MarginAuto',
    component: markRaw(MarginAuto)
  },
  {
    name: 'flex-direction',
    component: markRaw(FlexDirection)
  },
  {
    name: 'justify-content',
    component: markRaw(JustifyContent)
  },
  {
    name: 'align-content',
    component: markRaw(AlignContent)
  },
  {
    name: 'align-items',
    component: markRaw(AlignItems)
  },
  {
    name: 'flex-wrap',
    component: markRaw(FlexWrap)
  },
  {
    name: 'align-self',
    component: markRaw(AlignSelf)
  },
  {
    name: 'order',
    component: markRaw(Order)
  },
  {
    name: 'flex',
    component: markRaw(FlexNum)
  },
])
let componentId = shallowRef(AllInExample);
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
