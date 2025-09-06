<template>
  <div class="app">
    <h2>我是写有teleport的父组件</h2>

    <div class="hello">
      <p class="content">
        <teleport to="body">
          <hello-world/>
        </teleport>
        <teleport to="#abc">
          <hello-world/>
        </teleport>
      </p>
    </div>

    <div class="content">
      <teleport to="#abc" disabled>
        <h2>哈哈哈哈哈</h2>
      </teleport>
    </div>
  </div>
</template>

<script setup>

import HelloWorld from "./HelloWorld.vue"

</script>

<style scoped>

</style>

<!-- 希望组件不是挂载在这个组件树上的，可能是移动到Vue app之外的其他位置：
 比如移动到body元素上，或者我们有其他的div#app之外的元素上；
 这个时候我们就可以通过teleport来完成； -->

<!-- 它有两个属性：
➢ to：指定将其中的内容移动到的目标元素，可以使用选择器；
➢ disabled：是否禁用 teleport 的功能；此时，teleport就相当于template -->