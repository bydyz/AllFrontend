<script setup>
import link from "./link.vue";
import visited from "./visited.vue";
import active from "./active.vue";
import hover from "./hover.vue";
import { ref, shallowRef, markRaw } from "vue";

let componentsArray = ref([
  {
    name: 'link',
    component: markRaw(link)
  },
  {
    name: 'visited',
    component: markRaw(visited)
  },
  {
    name: 'active',
    component: markRaw(active)
  },
  {
    name: 'hover',
    component: markRaw(hover)
  },
])
let componentId = shallowRef(link);
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
