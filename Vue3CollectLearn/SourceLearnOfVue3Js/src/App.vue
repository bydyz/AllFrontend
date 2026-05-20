<script setup>
import OptionsComponent from './components/options/index.vue'
import CompositionComponent from './components/composition/index.vue'
import { shallowRef } from 'vue'

let isName = shallowRef(OptionsComponent)

const onChange = (param) => {
  isName.value = param === 'OptionsComponent' ? OptionsComponent : CompositionComponent
}
</script>

<template>
  <div>
    <div style="margin-bottom: 20px;">
      <button @click="onChange('OptionsComponent')">ToOptions</button>
      <button @click="onChange('CompositionComponent')">ToComposition</button>
    </div>
    
    <component :is="isName"></component>
  </div>
</template>

<style scoped>
</style>
