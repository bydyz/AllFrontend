<template>
  <span class="badge" :class="`badge-${type}`">
    <slot />
  </span>
</template>

<script setup>
defineProps({
  type: {
    type: String,
    default: 'primary'
  }
})
</script>

<style scoped>
.badge {
  display: inline-block;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: bold;
}
.badge-primary {
  background: #1890ff;
  color: white;
}
.badge-success {
  background: #52c41a;
  color: white;
}
.badge-warning {
  background: #faad14;
  color: white;
}
</style>