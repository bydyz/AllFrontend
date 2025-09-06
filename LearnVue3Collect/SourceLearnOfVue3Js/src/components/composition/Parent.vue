<script setup>
import SlotSon from './SlotSon.vue';
import Son from './Son.vue';
import { ref, onBeforeMount, onMounted, onBeforeUpdate, onUpdated, onBeforeUnmount, onUnmounted } from 'vue'

onBeforeMount(() => {
  console.log('ParentComposition onBeforeMount');
})

onMounted(() => {
  console.log('ParentComposition onMounted');
})

onBeforeUpdate(() => {
  console.log('ParentComposition onBeforeUpdate');
})

onUpdated(() => {
  console.log('ParentComposition onUpdated');
})

onBeforeUnmount(() => {
  console.log('ParentComposition onBeforeUnmount');
})

onUnmounted(() => {
  console.log('ParentComposition onUnmounted');
})

let textValue = ref('Composition-Parent')
const onChange = () => {
  textValue.value = textValue.value + '-Change'
}
</script>

<template>
  <div>
    <button @click="onChange">ChangeParent</button>
    <div>{{ textValue }}</div>

    <slot>
      <SlotSon></SlotSon>
    </slot>

    <Son></Son>
  </div>
</template>

<style scoped>
</style>
