<template>
  <div>
    <h2>ShowInfo: {{ name }} - {{ age }} - {{ height }}</h2>
  </div>
</template>

<script>
  export default {
    props: {
      name: {
        type: String,
        default: ""
      },
      age: {
        type: Number,
        default: 0
      },
      height: {
        type: Number
      }
    }
  }
</script>

<style scoped>
</style>

