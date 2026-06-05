<template>
  <button class="base-button" :class="type">
    <slot>基础按钮</slot>
  </button>
</template>

<script setup>
defineOptions({
  name: 'BaseButton'
})

defineProps({
  type: {
    type: String,
    default: 'primary'
  }
})
</script>

<style scoped>
.base-button {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.primary {
  background: #409eff;
  color: white;
}
.success {
  background: #67c23a;
  color: white;
}
.danger {
  background: #f56c6c;
  color: white;
}
</style>