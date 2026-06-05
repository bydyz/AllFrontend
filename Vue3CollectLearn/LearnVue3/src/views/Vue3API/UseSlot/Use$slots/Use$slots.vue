<template>
  <div>{{ $slots }}</div>
  <br>

  <div>{{ Object.keys($slots) }}</div>
  <br>

  <div v-for="(item, index) in $slots" :key="index">
    <div>{{ item }}</div>
    <br />
  </div>
</template>


<script setup>
</script>

<style scoped lang="scss"></style>