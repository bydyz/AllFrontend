<template>
  <span v-if="ele">
    <i class="dot" :class="`bg-${ele.status}`"></i>
    <span class="text-6">{{ ele.name }}</span>
  </span>
</template>

<script>
export default {
  name: 'EleDot',
  props: {
    id: {
      required: true
    },
    type: {
      type: String,
      default: 'enabled'
    }
  },
  computed: {
    ele() {
      let fItem = this.$store.getters[`common/${this.type}`].find(item => item.id === this.id)
      if (!fItem) return false
      return {
        ...fItem,
        // status: fItem.id ? 'success' : 'error'
      }
    }
  }
}
</script>

<style scoped>

</style>