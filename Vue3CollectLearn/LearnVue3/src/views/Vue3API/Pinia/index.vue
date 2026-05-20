<script setup>
import { ref } from 'vue'

</script>

<template>
  <nav>
    <RouterLink to="/pinia/1Basic">1Basic</RouterLink>
    <RouterLink to="/pinia/2State">2State</RouterLink>
    <RouterLink to="/pinia/3Getters">3Getters</RouterLink>
    <RouterLink to="/pinia/4Actions">4Actions</RouterLink>
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
