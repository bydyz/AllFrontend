<script setup>
import link from "./link.vue";
import visited from "./visited.vue";
import active from "./active.vue";
import hover from "./hover.vue";

import FirstChild from "./FirstChild/index.vue";
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
  {
    name: 'FirstChild',
    component: markRaw(FirstChild)
  },
])
let componentId = shallowRef(link);
</script>

<template>
  <h2 style="margin-bottom: 12px;">PseudoSelector文件夹</h2>
  <div>
    <h3>优先级 :link → :visited → :hover → :active</h3>
    <h3>:hover  鼠标悬停在元素上时生效</h3>
    <h3>:active  元素被激活/点击的瞬间生效（按下不松）</h3>
    <h3>:link  未访问的链接（锚点链接）</h3>
    <h3>:visited  已访问过的链接</h3>
  </div>
  <hr>
  <div>
    <h3>:hover  几乎所有元素都支持</h3>
    <h3>:active  支持点击的元素；button, a, div等</h3>
    <h3>:link  仅限 a元素</h3>
    <h3>:visited  仅限 a元素</h3>
  </div>

  <div class="ml-[50px] mt-[20px]">
    <div style="display: flex">
      <div id="myDivButton" class="cursor-pointer" :class="componentId === item.component ? 'bg-[pink]' : ''" v-for="(item, index) in componentsArray" :key="index" @click="componentId = item.component">{{ item.name }}</div>
    </div>

    <!-- componentId 不能为 字符串，需要为导入的 组件对象 -->
    <component :is="componentId"></component>
  </div>
</template>

<style scoped></style>
