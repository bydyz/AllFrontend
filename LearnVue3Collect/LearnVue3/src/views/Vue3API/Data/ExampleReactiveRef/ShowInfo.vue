<template>
  <div>
    <h2>ShowInfo: {{ props.name }} - {{ props.age }} - {{ props.height }}</h2>
  </div>
</template>

<script setup>
let props = defineProps({
  name: {
    type: String,
    default: "",
  },
  age: {
    type: Number,
    default: 0,
  },
  height: {
    type: Number,
  },
});
</script>

<style scoped lang="scss"></style>
