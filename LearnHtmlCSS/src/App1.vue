<script setup>
import ASimpleWrite from "./components/ASimpleWrite.vue";

import LearnCenter from "./components/LearnCenter.vue";
import LearnTagImg from "./components/LearnTagImg/index.vue";
import CommonTags from "./components/CommonTags.vue";
import LearnHr from "./components/LearnHr.vue";
import SpecificSymbol from "./components/SpecificSymbol.vue";
import LearnOlUl from "./components/LearnOlUl/index.vue";
import CustomList from "./components/CustomList.vue";
import LearnTagA from "./components/LearnTagA/index.vue";
import LearnTable from "./components/LearnTable/index.vue";
import LearnTagForm from "./components/LearnTagForm/index.vue";
import LearnFont from "./components/LearnFont/index.vue";
import LearnDisplay from "./components/LearnDisplay/index.vue";
import LearnScrollbar from "./components/LearnScrollbar/index.vue";
import LearnSelector from "./components/LearnSelector/index.vue";
import LearnEIFPicture from "./components/LearnEIFPicture/index.vue";
import LearnSpacing from "./components/LearnSpacing/index.vue";

import { ref, shallowRef, markRaw, computed } from "vue";

let componentsArray = ref([
  {
    name: "简便写法",
    value: "ASimpleWrite",
    component: markRaw(ASimpleWrite),
  },
  {
    name: "center",
    value: "LearnCenter",
    component: markRaw(LearnCenter),
  },
  {
    name: "img",
    value: "LearnTagImg",
    component: markRaw(LearnTagImg),
  },
  {
    name: "常见标签",
    value: "CommonTags",
    component: markRaw(CommonTags),
  },
  {
    name: "LearnHr",
    value: "LearnHr",
    component: markRaw(LearnHr),
  },
  {
    name: "特殊符号",
    value: "SpecificSymbol",
    component: markRaw(SpecificSymbol),
  },
  {
    name: "列表",
    value: "LearnOlUl",
    component: markRaw(LearnOlUl),
  },
  {
    name: "自定义列表",
    value: "CustomList",
    component: markRaw(CustomList),
  },
  {
    name: "a标签",
    value: "LearnTagA",
    component: markRaw(LearnTagA),
  },
  {
    name: "原生Table",
    value: "LearnTable",
    component: markRaw(LearnTable),
  },
  {
    name: "form标签",
    value: "LearnTagForm",
    component: markRaw(LearnTagForm),
  },
  {
    name: "字体样式",
    value: "LearnFont",
    component: markRaw(LearnFont),
  },
  {
    name: "display",
    value: "LearnDisplay",
    component: markRaw(LearnDisplay),
  },
  {
    name: "滚动条样式",
    value: "LearnScrollbar",
    component: markRaw(LearnScrollbar),
  },
  {
    name: "CSS选择器",
    value: "LearnSelector",
    component: markRaw(LearnSelector),
  },
  {
    name: "精灵图",
    value: "LearnEIFPicture",
    component: markRaw(LearnEIFPicture),
  },
  {
    name: "间距",
    value: "LearnSpacing",
    component: markRaw(LearnSpacing),
  },
]);
let componentId = shallowRef(LearnSelector);
</script>

<template>
  <div>
    <div style="display: flex; flex-wrap: wrap">
      <div id="myDivButton" class="cursor-pointer" :class="componentId === item.component ? 'bg-[pink]' : ''" v-for="(item, index) in componentsArray" :key="index" @click="componentId = item.component">{{ item.name }}</div>
    </div>

    <!-- componentId 不能为 字符串，需要为导入的 组件对象 -->
    <component :is="componentId"></component>
  </div>
</template>

<style scoped></style>
