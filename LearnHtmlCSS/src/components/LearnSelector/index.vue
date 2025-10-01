<script setup>
import UniversalSelector from "./UniversalSelector.vue";
import TagSelector from "./TagSelector.vue";
import ClassSelector from "./ClassSelector.vue";
import IdSelector from "./IdSelector.vue";
import GroupSonSelector from "./GroupSonSelector.vue";
import PseudoSelector from "./PseudoSelector/index.vue";
import SelectorWeight from "./SelectorWeight/index.vue";
import ChildCombinator from "./ChildCombinator.vue";
import { ref, shallowRef, markRaw } from "vue";

let componentsArray = ref([
  {
    name: '通配选择器',
    component: markRaw(UniversalSelector)
  },
  {
    name: '标签选择器',
    component: markRaw(TagSelector)
  },
  {
    name: '类选择器',
    component: markRaw(ClassSelector)
  },
  {
    name: 'id选择器',
    component: markRaw(IdSelector)
  },
  {
    name: '群组后代选择器',
    component: markRaw(GroupSonSelector)
  },
  {
    name: '伪类选择器',
    component: markRaw(PseudoSelector)
  },
  {
    name: '选择器权重',
    component: markRaw(SelectorWeight)
  },
  {
    name: '子元素选择器 >',
    component: markRaw(ChildCombinator)
  },
])
let componentId = shallowRef(UniversalSelector);
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
