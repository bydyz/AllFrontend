<template>
  <button class="my-button">
    <slot>默认按钮</slot>
  </button>
</template>

<script setup>
defineOptions({
  name: 'MyButton'
})
</script>

<style scoped>
.my-button {
  padding: 8px 16px;
  background: #409eff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>