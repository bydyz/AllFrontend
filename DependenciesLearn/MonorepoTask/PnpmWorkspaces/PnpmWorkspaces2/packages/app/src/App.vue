<template>
  <div class="app">
    <h1>App Component</h1>
    <MyButton @click="handleClick">Click Me</MyButton>
  </div>
</template>

<script setup>
import { MyButton } from '@demo/ui'

const handleClick = () => {
  console.log('Button clicked!')
}
</script>

<style scoped>
.app {
  padding: 20px;
}
</style>