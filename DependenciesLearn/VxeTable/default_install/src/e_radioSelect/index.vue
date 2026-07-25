<script setup>
import { ref, shallowRef, markRaw } from "vue";
import RadioSelect from "../a_basicFunction/2KRadioSelect.vue";
import HeightLightSelectRow from "./1BHeightLightSelectRow.vue";
import Disabled from "./1CDisabled.vue";
import IfShowRadio from "./1DIfShowRadio.vue";
import TriggerWay from "./1ETriggerWay.vue";
import CustomHeadAndRadio from "./1FCustomHeadAndRadio.vue";

let componentsArray = ref([
  {
    name: '基础功能中的单选',
    component: markRaw(RadioSelect)
  },
  {
    name: '高亮选择行',
    component: markRaw(HeightLightSelectRow)
  },
  {
    name: '禁用',
    component: markRaw(Disabled)
  },
  {
    name: '显示隐藏',
    component: markRaw(IfShowRadio)
  },
  {
    name: '触发方式',
    component: markRaw(TriggerWay)
  },
  {
    name: '自定义表头按钮和单选框',
    component: markRaw(CustomHeadAndRadio)
  },
])
let componentId = shallowRef(CustomHeadAndRadio);
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
