<template>
  <div class="child-two-container-class">
    <ChildTwo v-bind="props"></ChildTwo>
    <!-- <ChildOne v-bind="props" v-on="emits"></ChildOne> -->

    <!-- <div>{{ $attrs }}</div> -->
  </div>
</template>


<script setup>
import { useAttrs } from 'vue'
import ChildTwo from './ChildTwo.vue'

const props = defineProps({})
console.log('FatherTwo中的props:', props)

// $attrs 只能在 template 中使用，不可直接在 script 中使用
console.log('FatherTwo中的$attrs:', useAttrs())

// const emits = defineEmits()
</script>

<style scoped lang="scss"></style>