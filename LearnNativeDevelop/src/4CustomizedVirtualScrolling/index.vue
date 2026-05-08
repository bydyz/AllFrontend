<template>
  <div class="customized-virtual-scrolling">
    <UseTransform1></UseTransform1>

    <UseAbsoluteTop></UseAbsoluteTop>
  </div>
</template>


<script setup>
import UseTransform1 from './FixHeight/01-transform.vue'
import UseAbsoluteTop from './FixHeight/02-absolute-top.vue'
</script>

<style scoped lang="scss">
.customized-virtual-scrolling {
  padding: 20px;
  height: calc(100vh - 74px);
  overflow: auto;
}
</style>