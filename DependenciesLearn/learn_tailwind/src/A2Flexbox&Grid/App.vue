<script setup>
import A3GridAbout1 from "./components/A3GridAbout1.vue";
import A3GridAbout2 from "./components/A3GridAbout2.vue";
import A3GridAbout3 from "./components/A3GridAbout3.vue";
import A3GridAbout4 from "./components/A3GridAbout4.vue";
import A3GridAbout5 from "./components/A3GridAbout5.vue";
import { ref, shallowRef, markRaw } from "vue";

let componentsArray = ref([
  {
    name: 'grid1',
    component: markRaw(A3GridAbout1)
  },
  {
    name: 'grid2',
    component: markRaw(A3GridAbout2)
  },
  {
    name: 'grid3',
    component: markRaw(A3GridAbout3)
  },
  {
    name: 'grid4',
    component: markRaw(A3GridAbout4)
  },
  {
    name: 'grid5',
    component: markRaw(A3GridAbout5)
  },
])
let componentId = shallowRef(A3GridAbout1);

const divClick = item => {
  componentId.value = item.component
}
</script>

<template>
  <div>
    <div style="display: flex">
      <!-- 这样写不可，有错误；难道是因为那个 item ？？？ -->
      <!-- <div id="myDivButton" class="cursor-pointer" v-for="(item, index) in componentsArray" :key="index" @click="item => componentId = item.component">{{ item.name }}</div> -->


      <div id="myDivButton" class="cursor-pointer" :class="componentId === item.component ? 'bg-[pink]' : ''" v-for="(item, index) in componentsArray" :key="index" @click="() => componentId = item.component">{{ item.name }}</div>

      <!-- <div id="myDivButton" class="cursor-pointer" v-for="(item, index) in componentsArray" :key="index" @click="divClick(item)">{{ item.name }}</div> -->

      <!-- <div id="myDivButton" class="cursor-pointer" v-for="(item, index) in componentsArray" :key="index" @click="componentId = item.component">{{ item.name }}</div> -->
    </div>

    <!-- componentId 不能为 字符串，需要为导入的 组件对象 -->
    <component :is="componentId"></component>
  </div>
</template>

<style scoped></style>
