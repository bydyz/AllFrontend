<template>
  <div class="child-two-div-class">
    <div>这里是ChildTwo</div>

    <div>{{ aaa }}</div>
  </div>
</template>


<script setup>
const props = defineProps({
  aaa: {
    type: String
  }
})
console.log('FatherTwo中的props:', props)
</script>

<style scoped lang="scss"></style>