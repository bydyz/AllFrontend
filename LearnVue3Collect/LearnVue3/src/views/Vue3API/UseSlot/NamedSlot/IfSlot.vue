<template>
  <div class="nav-bar">
    <div class="left" v-if="$slots.left">
      <slot name="left">left</slot>
    </div>

    <!-- 不传 #center 则此dom不会渲染 -->
     <!-- 通过使用 $slots，我们可以实现条件渲染，即只有在父组件传递了特定插槽内容时，才渲染对应的 DOM 结构。这种设计可以避免不必要的 DOM 元素生成，提高性能并保持组件的灵活性。 -->
    <div class="center" v-if="$slots.center">
      <slot name="center">center</slot>
    </div>

    <div class="right">
      <slot name="right">right</slot>
    </div>
  </div>

  <div class="other">
    <slot name="default"></slot>
  </div>
</template>

<script>
  export default {

  }
</script>

<style scoped>
  .nav-bar {
    display: flex;
    height: 44px;
    line-height: 44px;
    text-align: center;
  }

  .left {
    flex: 1;
    background-color: orange;
  }

  .center {
    flex: 1;
    background-color: skyblue;
  }

  .right {
    flex: 1;
    background-color: aquamarine;
  }

  .other {
    background: red;
  }
</style>

