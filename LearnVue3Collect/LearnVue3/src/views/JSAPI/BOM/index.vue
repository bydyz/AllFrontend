<script setup>
import { ref } from 'vue'

</script>

<template>
  <nav>
    <RouterLink to="/bom/window">Window</RouterLink>
    <RouterLink to="/bom/location">Location</RouterLink>
    <RouterLink to="/bom/history">history</RouterLink>
    <RouterLink to="/bom/navigator">navigator</RouterLink>
    <RouterLink to="/bom/screen">screen</RouterLink>
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
