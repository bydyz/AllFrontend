<template>
  <div class="child-one-container-class">
    <ChildOne v-bind="$attrs"></ChildOne>
    <!-- <ChildOne v-bind="props" v-on="emits"></ChildOne> -->

    <div>{{ props }}</div>
    <div>{{ $attrs }}</div>
  </div>
</template>


<script setup>
import { useAttrs } from 'vue'
import ChildOne from './ChildOne.vue'

const props = defineProps({
  aaa: {
    type: String
  }
})
console.log('FatherOne中的props:', props)

// $attrs 只能在 template 中使用，不可直接在 script 中使用
console.log('FatherOne中的$attrs:', useAttrs())

// const emits = defineEmits()
</script>

<style scoped lang="scss"></style>