<script setup>
import { ref, shallowRef, markRaw } from "vue";
import Basic from "./1ABasic.vue";
import Size from "./1BSize.vue";
import DataType from "./1CDataType.vue";

import ColumnWidth from "./1JColumnWidth.vue";

import DynamicStyles from "./1QDynamicStyles.vue";

import HeightLightRow from "./1THeightLightRow.vue";

import GroupHeader from "./2EGroupHeader.vue";
import SetSort from "./2FSetSort.vue";

import SetSeq from "./2JSetSeq.vue";
import RadioSelect from "./2KRadioSelect.vue";
import CheckboxSelect from "./2LCheckboxSelect.vue";

let componentsArray = ref([
  {
    name: '基础',
    component: markRaw(Basic)
  },
  {
    name: '尺寸',
    component: markRaw(Size)
  },
  {
    name: '数据类型',
    component: markRaw(DataType)
  },
  {
    name: '设置列宽',
    component: markRaw(ColumnWidth)
  },
  {
    name: '动态样式',
    component: markRaw(DynamicStyles)
  },
  {
    name: '高亮行',
    component: markRaw(HeightLightRow)
  },
  {
    name: '分组表头',
    component: markRaw(GroupHeader)
  },
  {
    name: '排序',
    component: markRaw(SetSort)
  },
  {
    name: '序号',
    component: markRaw(SetSeq)
  },
  {
    name: '单选框',
    component: markRaw(RadioSelect)
  },
  {
    name: '复选框',
    component: markRaw(CheckboxSelect)
  },
])
let componentId = shallowRef(CheckboxSelect);
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
