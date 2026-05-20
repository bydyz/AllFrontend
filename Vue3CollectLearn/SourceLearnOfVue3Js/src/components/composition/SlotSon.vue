<script setup>
import { ref, onBeforeMount, onMounted, onBeforeUpdate, onUpdated, onBeforeUnmount, onUnmounted } from 'vue'

onBeforeMount(() => {
  console.log('SlotComposition onBeforeMount');
})

onMounted(() => {
  console.log('SlotComposition onMounted');
})

onBeforeUpdate(() => {
  console.log('SlotComposition onBeforeUpdate');
})

onUpdated(() => {
  console.log('SlotComposition onUpdated');
})

onBeforeUnmount(() => {
  console.log('SlotComposition onBeforeUnmount');
})

onUnmounted(() => {
  console.log('SlotComposition onUnmounted');
})

let textValue = ref('Composition-SlotSon')
const onChange = () => {
  textValue.value = textValue.value + '-Change'
}
</script>

<template>
  <div>
    <button @click="onChange">ChangeSlotSon</button>
    <div>{{ textValue }}</div>
  </div>
</template>

<style scoped>
</style>
