<template>
  <div class="child-one-div-class">
    <div>这里是ChildOne</div>

    <div>{{ aaa }}</div>
  </div>
</template>


<script setup>
const props = defineProps({
  aaa: {
    type: String
  }
})
</script>

<style scoped lang="scss"></style>