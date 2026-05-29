<template>
  <div class="app">
    <h1>App Component</h1>
    <MyButton @click="handleClick">Click Me</MyButton>
    <br><br>
    <Badge type="success">New Badge</Badge>
  </div>
</template>

<script setup>
import { MyButton, Badge } from '@demo/ui'

const handleClick = () => {
  console.log('Button clicked!')
}
</script>

<style scoped>
.app {
  padding: 20px;
}
</style>