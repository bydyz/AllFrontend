<script setup>
import { ref } from 'vue'

</script>

<template>
  <nav>
    <RouterLink to="/data/learnReactiveRef">LearnReactiveRef</RouterLink>
    <RouterLink to="/data/exampleReactiveRef">ExampleReactiveRef</RouterLink>
    <RouterLink to="/data/refDom">RefDom</RouterLink>
    <RouterLink to="/data/apiCollect">ApiCollect</RouterLink>
  </nav>

  <RouterView />
</template>

<style scoped lang="scss">
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
  }
}
</style>
