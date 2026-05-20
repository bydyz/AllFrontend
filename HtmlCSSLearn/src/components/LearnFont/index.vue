<script setup>
import FontSize from "./FontSize.vue";
import Color from "./Color.vue";
import WeightStyle from "./WeightStyle.vue";
import TextAlign from "./TextAlign.vue";
import { ref, shallowRef, markRaw } from "vue";

let componentsArray = ref([
  {
    name: 'font-size',
    component: markRaw(FontSize)
  },
  {
    name: 'color',
    component: markRaw(Color)
  },
  {
    name: 'WeightStyle',
    component: markRaw(WeightStyle)
  },
  {
    name: 'text-align',
    component: markRaw(TextAlign)
  },
])
let componentId = shallowRef(FontSize);
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
