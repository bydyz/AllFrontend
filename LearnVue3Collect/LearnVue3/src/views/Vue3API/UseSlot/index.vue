<script setup>
import { ref } from 'vue'

</script>

<template>
  <nav>
    <RouterLink to="/useSlot/defaultSlot">DefaultSlot</RouterLink>
    <RouterLink to="/useSlot/namedSlot">NamedSlot</RouterLink>
    <RouterLink to="/useSlot/scopeSlot">ScopeSlot</RouterLink>
  </nav>
  <p>通常情况下：父组件模板中的表达式只能访问父组件的作用域；子组件模板中的表达式只能访问子组件的作用域。</p>

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
