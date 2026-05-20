<script setup>
import BackgroundColor from "./BackgroundColor.vue";
import ImageRepeatPosition from "./ImageRepeatPosition.vue";
import BackgroundSize from "./BackgroundSize.vue";
import BackgroundAttachment1 from "./BackgroundAttachment1.vue";
import BackgroundAttachment2 from "./BackgroundAttachment2.vue";
import Background from "./Background.vue";
import { ref, shallowRef, markRaw } from "vue";

let componentsArray = ref([
  {
    name: "BackgroundColor",
    component: markRaw(BackgroundColor),
  },
  {
    name: "ImageRepeatPosition",
    component: markRaw(ImageRepeatPosition),
  },
  {
    name: "BackgroundSize",
    component: markRaw(BackgroundSize),
  },
  {
    name: "BackgroundAttachment1",
    component: markRaw(BackgroundAttachment1),
  },
  {
    name: "BackgroundAttachment2",
    component: markRaw(BackgroundAttachment2),
  },
  {
    name: "Background",
    component: markRaw(Background),
  },
]);
let componentId = shallowRef(BackgroundSize);
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
