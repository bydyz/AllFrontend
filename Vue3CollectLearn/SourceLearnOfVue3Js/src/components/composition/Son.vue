<script setup>
import { ref, onBeforeMount, onMounted, onBeforeUpdate, onUpdated, onBeforeUnmount, onUnmounted } from 'vue'

onBeforeMount(() => {
  console.log('ChildComposition onBeforeMount');
})

onMounted(() => {
  console.log('ChildComposition onMounted');
})

onBeforeUpdate(() => {
  console.log('ChildComposition onBeforeUpdate');
})

onUpdated(() => {
  console.log('ChildComposition onUpdated');
})

onBeforeUnmount(() => {
  console.log('ChildComposition onBeforeUnmount');
})

onUnmounted(() => {
  console.log('ChildComposition onUnmounted');
})

let textValue = ref('Composition-Son')
const onChange = () => {
  textValue.value = textValue.value + '-Change'
}
</script>

<template>
  <div>
    <button @click="onChange">ChangeSon</button>
    <div>{{ textValue }}</div>
  </div>
</template>

<style scoped>
</style>
