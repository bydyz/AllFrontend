<script setup>
import ASimpleWrite from "./components/ASimpleWrite.vue";
import LearnCenter from "./components/LearnCenter.vue";
import LearnTagImg from "./components/LearnTagImg/index.vue";
import CommonTags from "./components/CommonTags.vue";
import LearnHr from "./components/LearnHr.vue";
import SpecificSymbol from "./components/SpecificSymbol.vue";
import LearnOl from "./components/LearnOl.vue";
import LearnUl from "./components/LearnUl.vue";
import CustomList from "./components/CustomList.vue";
import LearnTagA from "./components/LearnTagA/index.vue"
import LearnTable from "./components/LearnTable/index.vue"
import LearnTagForm from "./components/LearnTagForm/index.vue"
import LearnFont from "./components/LearnFont/index.vue"
import LearnDisplay from "./components/LearnDisplay/index.vue"
import LearnSelector from "./components/LearnSelector/index.vue"
import { ref, shallowRef, markRaw } from "vue";

let componentsArray = ref([
  {
    name: '简便写法',
    component: markRaw(ASimpleWrite)
  },
  {
    name: 'center',
    component: markRaw(LearnCenter)
  },
  {
    name: 'img',
    component: markRaw(LearnTagImg)
  },
  {
    name: '常见标签',
    component: markRaw(CommonTags)
  },
  {
    name: 'LearnHr',
    component: markRaw(LearnHr)
  },
  {
    name: '特殊符号',
    component: markRaw(SpecificSymbol)
  },
  {
    name: '有序列表',
    component: markRaw(LearnOl)
  },
  {
    name: '无序列表',
    component: markRaw(LearnUl)
  },
  {
    name: '自定义列表',
    component: markRaw(CustomList)
  },
  {
    name: 'a标签',
    component: markRaw(LearnTagA)
  },
  {
    name: '原生Table',
    component: markRaw(LearnTable)
  },
  {
    name: 'form标签',
    component: markRaw(LearnTagForm)
  },
  {
    name: '字体样式',
    component: markRaw(LearnFont)
  },
  {
    name: 'display',
    component: markRaw(LearnDisplay)
  },
  {
    name: 'CSS选择器',
    component: markRaw(LearnSelector)
  },
])
let componentId = shallowRef(LearnDisplay);
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
