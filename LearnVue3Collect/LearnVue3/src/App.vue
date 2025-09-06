<script setup>
import { ref, computed } from 'vue'
import {useRoute, useRouter} from "vue-router";

const route = useRoute()
const router = useRouter()

let headButtonList = ref(['Vue', 'JS', 'Example'])
let apiType = ref('Vue')
let pathList = ref([])

const allPathList = ref({
  'Vue': ['/data', '/provideInject', '/computed', '/lifeCircle', '/watch', '/props', '/emits', '/pinia', '/useSlot'],
  'JS': ['/bom'],
  'Example': ['/example/1'],
})
function onChangeApiType(type, param) {
  pathList.value = allPathList.value[type]

  // 第一次调用时，因为已有路由重定向，不需要路由跳转
  if(!param) router.push(pathList.value[0])
}

function onRouteChange(path) {
  router.push(path)
}

onChangeApiType('Vue', true)
</script>

<template>
  <div>
    <button v-for="(item, index) in headButtonList" :key="index" @click="onChangeApiType(item)">{{ item }}</button>
  </div>

  <p>
    <strong>当前路由路径:</strong> {{ $route.fullPath }}
  </p>

  <nav>
    <!-- <RouterLink v-for="(item, index) in pathList" :key="index" :to="item">{{ item }}</RouterLink> -->
    <button v-for="(item, index) in pathList" :key="index" @click="onRouteChange(item)">{{ item }}</button>
  </nav>

  <div class="line"></div>

  <main>
    <RouterView />
  </main>
</template>

<style scoped lang="scss">
p {
  margin-top: 12px;
}

nav {
  margin: 16px 0;
  display: flex;
  flex-wrap: wrap;
  /* 主轴方向 项目的排列 */
  justify-content: flex-start;
  /* 侧轴方向 主轴行的排列 */
  /* align-content: flex-end; */

  a {
    padding: 0 6px;

    &:first-child {
      padding: 0 16px;
    }
  }
}

.line {
  margin: 12px 0;
  height: 2px;
  background: pink;
}

main {
  flex: 1;
}
</style>
