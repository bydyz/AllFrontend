<script setup>
const props = defineProps({
  name: {
    type: String,
    default: "我是默认name",
  },
});
</script>

<template>
  <div>
    {{ name }}
  </div>
</template>

<style scoped lang="scss">
div {
  color: rgb(163, 163, 226);
}
</style>
